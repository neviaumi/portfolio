# AI Assistant Infrastructure Selection

- **Status**: Proposed
- **Decider**: [Your Name]
- **Date**: [YYYY-MM-DD] <!-- Replace with the actual date -->

## Context and Problem Statement

I am planning to implement an AI assistant to help readers summarize my portfolio website and assist hiring managers in better understanding my experiences and working style by enabling them to ask questions to the assistant.

To support this, I need to implement:
- A **Backend API** that processes user-inputted questions from the ChatRoom Frontend.
- A **ChatRoom Frontend** that utilizes the API for communication.
- **CD** (Continuous Deployment) to keep the AI model updated with the latest portfolio content.
- **Hosting** for the API and ChatRoom.

In this document, I will focus on the infrastructure and the tools used to set it up.

## Decision Drivers

- **Pay by Request**: The hosting platform should follow a pay-per-use model with a free tier, meaning no costs are incurred if no one is using it.
- **Feature Rich**: The hosting platform should offer various features like AI processing, serverless functions, static site hosting, etc.
- **Minimal Configuration**: I prefer platforms that allow me to focus on implementation rather than extensive configuration.

## Considered Options

1. **GCP**: Cloud Run + Storage, with infrastructure managed using Terraform.
2. **Cloudflare**: Workers + Pages, with infrastructure managed using Wrangler.

## Decision Outcome

I decided to choose **Cloudflare** because of its simplicity and speed.

## Pros and Cons of the Options

### GCP

- **Pros**:
  - Cloud Run supports Dockerfile-based implementation, which allows complete control over the environment using Docker.
  - Logging is robust, capturing all `stdout` and offering extensive formatting options through metadata.

- **Cons**:
  - Deployment is slow due to the overhead of Docker builds, often taking several minutes to complete.
  - Configuration is complex, requiring Infrastructure-as-Code (IaC) tools like Terraform for proper management.
  - The default deployment features are limited compared to Cloudflare.

### Cloudflare

- **Pros**:
  - Resources can be quickly provisioned using Wrangler commands, which handle tasks like checking for existing resources before creating new ones.
  - Rich feature set, including previews for both Frontend and Backend.
  - Generous free tier with nearly zero costs, and credit card details are not required.
  - Developer-friendly platform with official IaC support, allowing upgrades to deployment processes if necessary.

- **Cons**:
  - Vendor lock-in due to specific backend implementations, environmental variable configurations, etc.
  - Debugging backend issues is challenging due to the lack of `stdout` logging support.

## Links

<!-- Add relevant links here -->