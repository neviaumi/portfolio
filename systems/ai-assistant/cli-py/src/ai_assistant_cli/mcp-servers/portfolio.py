import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("portfolio")

# Constants
PORTFOLIO_BASE = "https://neviaumi.github.io/portfolio"
http_client = httpx.AsyncClient()


@mcp.tool()
async def get_working_experiences_from_portfolio() -> str:
    """Expose experiences from portfolio website.

    Returns:
        Semantic HTML of my working experiences.
    """
    response = await http_client.get(
        f"{PORTFOLIO_BASE}/experiences", follow_redirects=True
    )
    response.raise_for_status()
    return response.text


@mcp.tool()
async def get_skill_sets_from_portfolio() -> str:
    """Expose skills from portfolio website.

    Returns:
        Semantic HTML of my skill sets.
    """
    response = await http_client.get(f"{PORTFOLIO_BASE}/skills", follow_redirects=True)
    response.raise_for_status()
    return response.text


@mcp.tool()
async def get_core_values_from_portfolio() -> str:
    """Expose core values from portfolio website.

    Returns:
        Semantic HTML of my core values.
    """
    response = await http_client.get(
        f"{PORTFOLIO_BASE}/core-values", follow_redirects=True
    )
    response.raise_for_status()
    return response.text


@mcp.tool()
async def get_overview_from_portfolio() -> str:
    """Expose overview from portfolio website.

    Returns:
        Semantic HTML of my professional overview.
    """
    response = await http_client.get(f"{PORTFOLIO_BASE}", follow_redirects=True)
    response.raise_for_status()
    return response.text


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport="stdio")
    # import asyncio

    # asyncio.run(get_working_experiences_from_portfolio())
