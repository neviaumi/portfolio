from js import Response, fetch, JSON, Object, Headers
from urllib.parse import urljoin
from html.parser import HTMLParser
import asyncio
import uuid
import json
from pyodide.ffi import to_js as _to_js


def to_js(obj):
    return _to_js(obj, dict_converter=Object.fromEntries)


def sanitize_html(html):

    class HTMLCleaner(HTMLParser):
        ignored_tags = ["script", "style", "iframe"]
        ignored_attrs = ["class", "style"]

        def __init__(self):
            super().__init__()
            self.result = []  # Store cleaned HTML here
            self.inside_ignored_tag = False

        def handle_starttag(self, tag, attrs):
            if tag in self.ignored_tags:
                self.inside_ignored_tag = True
            else:
                attrs_string = " ".join(
                    f'{key}="{value}"'
                    for key, value in attrs
                    if key not in self.ignored_attrs
                )
                self.result.append(
                    f"<{tag} {attrs_string}>" if attrs_string else f"<{tag}>"
                )

        def handle_data(self, data):
            if not self.inside_ignored_tag:
                self.result.append(data)

        def handle_endtag(self, tag):
            if tag in self.ignored_tags:
                self.inside_ignored_tag = False
            else:
                self.result.append(f"</{tag}>")

        def get_cleaned_html(self):
            return "".join(self.result)

    cleaner = HTMLCleaner()
    cleaner.feed(html)
    return cleaner.get_cleaned_html()


async def construct_embedded_message_from_portfolio():

    base_url = "https://neviaumi.github.io/portfolio/"

    async def fetch_html(pathname):
        return sanitize_html(
            await (
                await fetch(
                    urljoin(base_url, pathname),
                )
            ).text()
        )

    (
        home_page,
        core_values_page,
        experiences_page,
        skills_page,
        faq_page,
    ) = await asyncio.gather(
        fetch_html(""),
        fetch_html("core-values"),
        fetch_html("experiences"),
        fetch_html("skills"),
        fetch_html("faq"),
    )
    return [
        {
            "content": """You will receive HTML content from a portfolio website. 
Process the HTML to understand its structure and details. 
Use the processed information to answer questions accurately.""",
            "role": "system",
        },
        {
            "content": f"""HTML content from home page:
```html
{home_page}
```
    """,
            "role": "user",
        },
        {
            "content": f"""HTML content from core values page:
```html
{core_values_page}
```
    """,
            "role": "user",
        },
        {
            "content": f"""HTML content from experiences page:
```html
{experiences_page}
```
    """,
            "role": "user",
        },
        {
            "content": f"""HTML content from skills page:
```html
{skills_page}
```
    """,
            "role": "user",
        },
        {
            "content": f"""HTML content from FAQ page:
```html
{faq_page}
```
    """,
            "role": "user",
        },
        {
            "content": """"You now have all the HTML content from the portfolio website. 
    Make sure you understand all the provided content. 
    Let me know when you're ready to answer my questions.""",
            "role": "user",
        },
    ]


async def request_openai(messages, env):
    account_id = env.CF_ACCOUNT_ID
    gateway_id = env.CF_AI_GATEWAY_ID
    open_ai_key = env.OPENAI_API_KEY
    resp = await fetch(
        f"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions",
        to_js(
            {
                "method": "POST",
                "headers": {
                    "Authorization": f"Bearer {open_ai_key}",
                    "Content-Type": "application/json",
                },
                "body": json.dumps(
                    {
                        "model": "gpt-4o-mini",
                        "messages": messages,
                    }
                ),
            }
        ),
    )
    return (await resp.json()).to_py()


def generate_cors_headers(request):
    origin_header = request.headers.get("Origin", "")
    # The Origin of the request
    origin = "" if origin_header is None else origin_header

    # Define allowed origins
    allowed_origins = [
        "http://localhost",
        "https://ai-assistant-web-components.pages.dev",
    ]

    # Check if the request's Origin is allowed
    if origin in allowed_origins or origin.endswith(
        ".ai-assistant-web-components.pages.dev"
    ):
        return {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    else:
        return {}


async def parse_request_body(request):
    """
    Parses and validates the JSON body of a request.
    Returns the parsed data if valid, or raises a ValueError.
    """
    body = (await request.json()).to_py()
    if "messages" not in body:
        raise ValueError("Invalid JSON payload")
    return body


async def on_fetch(request, env):
    if request.method == "OPTIONS":
        return Response.new(headers=generate_cors_headers(request))
    if not request.method == "POST":
        return Response.new("Bad Request", status=400)
    messages = (await parse_request_body(request))["messages"]
    request_ai_messages = [
        *(await construct_embedded_message_from_portfolio()),
        {
            "role": "user",
            "content": """From now on, I will forward user questions directly to you. Only respond to questions that are related to the HTML content you received.

If you don't know the answer, respond with "I don't know" and include the reason why you don't know. If the reason is due to missing information like a job description (JD), you may request that they upload the JD and try again.

"I don't know" responses will be logged to improve the model's capabilities. Focus on providing clear and accurate answers for the given content.
""",
        },
        *messages[0:-1],
        {**messages[-1], "id": str(uuid.uuid4())},
    ]
    ai_response = await request_openai(
        request_ai_messages,
        env,
    )
    response_message = ai_response["choices"][0]["message"]
    user_prompt_started_at = next(
        (i for i, message in enumerate(request_ai_messages) if "id" in message),
        None,
    )

    return Response.new(
        json.dumps([*request_ai_messages[user_prompt_started_at:], response_message]),
        headers=Headers.new(
            {
                **generate_cors_headers(request),
                "Content-Type": "application/json",
            }.items()
        ),
    )
