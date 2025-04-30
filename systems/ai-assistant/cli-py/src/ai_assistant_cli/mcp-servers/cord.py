import httpx
from mcp.server.fastmcp import FastMCP
from bs4 import BeautifulSoup

# Initialize FastMCP server
mcp = FastMCP("cord")

# Constants
http_client = httpx.AsyncClient()


@mcp.tool()
async def get_cord_message_best_practice() -> str:
    """Expose the best practice of core message.

    Returns:
        Semantic HTML of cord message best practice.
    """
    response = await http_client.get(
        f"https://people.cord.co/tips--tricks/mRjbXm1RLHnc4rWLTKkuRS/how-to-write-an-effective-intro-message-/tuu7mnVo6jnAgstvdkmP4A#examples-of-good-and-bad-messages-on-cord",
        follow_redirects=True,
    )
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    return str(soup.find("h1").parent)


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport="stdio")
