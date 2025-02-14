from js import Response

async def on_fetch(request, env):
  origin_header = request.headers.get("Origin", "")
  # The Origin of the request
  origin = "" if origin_header is None else origin_header

  # Define allowed origins
  allowed_origins = ["http://localhost", "https://<subdomain>.ai-assistant-web-components.pages.dev"]

  # Check if the request's Origin is allowed
  if origin in allowed_origins or origin.endswith(".ai-assistant-web-components.pages.dev"):
    headers = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  else:
    headers = {}

  return Response.new(
    "Hello Python worker!",
    headers=headers
  )
