from typing import Any
import httpx
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("portfolio")

# Constants
PORTFOLIO_BASE = "https://neviaumi.github.io/portfolio/"


@mcp.tool()
async def get_portfolio() -> str:
    pass


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport="stdio")
