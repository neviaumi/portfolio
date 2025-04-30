from mcp.server.fastmcp import FastMCP
import ai_assistant_cli.cloud.object_storage as object_storage
import logging

# # Initialize FastMCP server
mcp = FastMCP("JD")
logger = logging.getLogger(__name__)


@mcp.tool()
async def get_jd(role_id: str) -> str:
    """Expose job description
    Args:
        role_id: str, role id of the job description
    Returns:
        Job description in free text
    """
    logger.info(f"Extracting job description for role id: {role_id}")
    return object_storage.extract_jd(role_id)


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport="stdio")
