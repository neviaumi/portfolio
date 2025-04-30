from agents.mcp import MCPServerStdio
from agents import Agent, Runner, trace
from utils.read_lines import read_lines
import asyncio
import sys


async def main():
    role_id = sys.argv[1]
    async with MCPServerStdio(
        params={
            "command": "pdm",
            "args": ["run", "src/ai_assistant_cli/mcp-servers/portfolio.py"],
        }
    ) as portfolio_mcp_server, MCPServerStdio(
        params={
            "command": "pdm",
            "args": ["run", "src/ai_assistant_cli/mcp-servers/jd.py"],
        }
    ) as jd_mcp_server:
        agent = Agent(
            model="gpt-4.1-nano",
            name="Application Form Assistant",
            instructions=f"""You are an expert assistant helping to fill in job application forms.
Your goal is to create compelling, tailored responses to application questions by matching the applicant's qualifications with the job requirements.

AVAILABLE INFORMATION:
1. Portfolio information - Access the applicant's professional background using these tools:
   - get_overview_from_portfolio(): General professional overview
   - get_working_experiences_from_portfolio(): Detailed work history
   - get_skill_sets_from_portfolio(): Technical and soft skills
   - get_core_values_from_portfolio(): Professional values and principles

2. Job Description - Access the job requirements using:
   - get_jd({role_id}): Complete job description including required skills and responsibilities

INSTRUCTIONS FOR ANSWERING QUESTIONS:
1. For each application question, analyze both the portfolio information and job description
2. Identify the most relevant experiences, skills, and qualifications that match the job requirements
3. Craft a response that:
   - Directly addresses the specific question asked
   - Highlights the most relevant qualifications for that particular question
   - Provides concrete examples and achievements when possible
   - Uses a professional, confident tone
   - Is concise yet comprehensive (typically 150-300 words unless specified otherwise)
   - Is tailored to the specific company and role

4. For different question types:
   - Experience questions: Focus on relevant work history with measurable achievements
   - Skills questions: Emphasize technical abilities with examples of application
   - Behavioral questions: Use the STAR method (Situation, Task, Action, Result)
   - Motivation questions: Connect personal values with company mission
   - Salary/logistics questions: Provide reasonable ranges based on experience level and market

Always maintain a professional tone and focus on creating a compelling match between the applicant's qualifications and the job requirements.
""",
            mcp_servers=[portfolio_mcp_server, jd_mcp_server],
        )
        with trace(workflow_name="Application Form Assistant"):
            conversations = []
            while True:
                question = read_lines("Question: ")
                conversations.append({"role": "user", "content": question})
                result = await Runner.run(
                    agent,
                    conversations,
                )
                print(result.final_output)
                conversations.extend(result.to_input_list())


asyncio.run(main())
