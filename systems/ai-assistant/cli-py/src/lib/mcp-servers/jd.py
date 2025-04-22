from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("JD")


@mcp.tool()
async def get_jd() -> str:
    """Expose job description

    Returns:
        Job description in free text
    """
    with open("assets/jd.txt", "r") as jd:
        return jd.read()


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport="stdio")
