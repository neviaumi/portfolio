from agents.mcp import MCPServerStdio
from agents import Agent, Runner
from lib.read_lines import read_lines
import asyncio


async def main():
    hiring_manager_message = read_lines("Message prompt from hiring manager: ")
    async with MCPServerStdio(
        params={
            "command": "pdm",
            "args": ["run", "src/lib/mcp-servers/portfolio.py"],
        }
    ) as portfolio_mcp_server, MCPServerStdio(
        params={
            "command": "pdm",
            "args": ["run", "src/lib/mcp-servers/jd.py"],
        }
    ) as jd_mcp_server, MCPServerStdio(
        params={
            "command": "pdm",
            "args": ["run", "src/lib/mcp-servers/cord.py"],
        }
    ) as cord_mcp_server:
        agent = Agent(
            model="gpt-4.1-nano",
            name="Core Intro Message Assistant",
            instructions="""You are assisting in crafting a professional introduction message for a job application listed on Cord. 

**Objective**:
Write a concise yet impactful message tailored for the hiring manager, leveraging information from:
- The portfolio website.
- The job description provided by the hiring manager.

**Key points to include**:
1. Briefly highlight the portfolio, available at: [https://neviaumi.github.io/portfolio?utm_source=cord]. Explain what can be explored, such as key projects or relevant experiences.
2. Politely suggest checking my availability at: [https://calendly.com/david-ng-dev/open-role-discussion?utm_source=cord] for scheduling a discussion. Offer to accommodate their preferred process if needed.
3. If a message has been left by the hiring manager, tailor the response accordingly, ensuring it addresses their comments or queries.

Follow best practices recommended by the Cord team in tone and structure.
""",
            mcp_servers=[portfolio_mcp_server, jd_mcp_server, cord_mcp_server],
        )
        result = await Runner.run(
            agent,
            f"""
Use the portfolio and job description information to draft a professional and engaging introduction message for the hiring manager.

Ensure the message includes:
- A mention of the portfolio link and highlights of what they can explore.
- A suggestion to check availability for discussing the role or an offer to sync with their preferred scheduling.

{f"Hiring manager's message: {hiring_manager_message}" if len(hiring_manager_message) > 0 else ""}
""",
        )
        print(result.final_output)


asyncio.run(main())
