from cloud.object_storage import persist_jd
from agents import Agent, Runner
import asyncio
from typing import TypedDict


def get_local_jd():
    with open("assets/jd.txt", "r") as jd:
        return jd.read()


class JDMeta(TypedDict):
    company_name: str | None
    role_name: str | None
    ref_number: str | None


def format_role_id_from_jd_meta(jd_meta: JDMeta) -> str:
    if jd_meta["company_name"] is None or jd_meta["role_name"] is None:
        raise ValueError("Failed to extract company name or role name from jd")
    company_name = jd_meta["company_name"].replace(" ", "-")
    role_name = jd_meta["role_name"].replace(" ", "-")
    if jd_meta["ref_number"]:
        role_id = f"{company_name}_{role_name}_{jd_meta['ref_number']}"
    else:
        role_id = f"{company_name}_{role_name}"
    role_id = role_id.lower()
    return role_id


async def main():
    jd = get_local_jd()
    agent = Agent(
        model="gpt-4.1-nano",
        name="Processing Job Description",
        instructions="""You are an expert in processing job descriptions.

**Objective**:
Extract key metadata from job descriptions to create a standardized identifier for storage and retrieval.

**Required Information to Extract**:
1. Company Name: The organization offering the position
2. Role Name: The specific job title or position
3. Reference Number: Any unique identifier or requisition number (if available)

**Instructions**:
- Carefully analyze the provided job description text
- Extract the company name and role name with high accuracy
- If a reference number is present (e.g., "Req #12345", "Job ID: ABC-123"), extract it
- If any information cannot be determined with confidence, use None to represent undefined values
- Ensure extracted data is clean and properly formatted (no trailing spaces, consistent capitalization)

**Output Format**:
- company_name: The name of the hiring company
- role_name: The specific job title
- ref_number: The reference number (if available, otherwise None)
""",
        output_type=JDMeta,
    )
    result = await Runner.run(
        agent,
        jd,
    )
    jd_meta = result.final_output
    role_id = format_role_id_from_jd_meta(jd_meta)
    persist_jd(role_id)
    print(f"Persisted JD with role id: {role_id}")
    print(f"Company: {jd_meta['company_name']}")
    print(f"Role: {jd_meta['role_name']}")
    if jd_meta['ref_number']:
        print(f"Reference Number: {jd_meta['ref_number']}")


if __name__ == "__main__":
    asyncio.run(main())
