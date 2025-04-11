from agents.mcp import MCPServerStdio
from agents import Agent, Runner
import asyncio


async def main():
    async with MCPServerStdio(
        params={
            "command": "pdm",
            "args": ["run", "src/lib/mcp-servers/portfolio.py"],
        }
    ) as portfolio_mcp_server:
        agent = Agent(
            name="Assistant",
            instructions="You are a helpful assistant",
            mcp_servers=[portfolio_mcp_server],
        )

        result = await Runner.run(
            agent, "Write a haiku about recursion in programming."
        )
        print(result.final_output)
        print(tools)


asyncio.run(main())
