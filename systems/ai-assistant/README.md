# `ai-assistant` System

The `ai-assistant` system is a modular subsystem of the larger project, combining CLI tools, web components, and Cloudflare workers to deliver OpenAI-powered functionality. It supports various AI-based utilities such as content creation, chatbot interaction, resume summarization, and integration with APIs.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [File Structure](#file-structure)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
    - [CLI](#cli)
    - [Web Components](#web-components)
    - [Worker](#worker)
- [Development](#development)
- [License](#license)

---

## Overview

The `ai-assistant` system consists of three primary components:
1. **CLI**: A set of command-line tools for tasks such as CMS management, document summarization, and resume analysis.
2. **Web Components**: A collection of reusable frontend components for integrating OpenAI-powered chatbots into web applications.
3. **Worker**: A Cloudflare worker implementation that wraps OpenAI's API, providing a robust and scalable backend service.

Each module plays a distinct role while being interoperable within the overarching system.

---

## Features

### CLI
- Modular commands for:
    - Chat-based assistance.
    - Resume summarization and keyword extraction.
    - CMS content automation.
    - Web scraping and interactive automation.

### Web Components
- Pre-built components to embed chat interfaces in web applications.
- Seamless OpenAI-powered chatbot integration.
- Built with modern web technologies using tools like Vite and TypeScript.

### Worker
- Cloudflare worker-based service to interact with OpenAI APIs.
- Requires manual creation of a Cloudflare AI Gateway resource for proper functionality.
- Scalable backend for handling requests from the chatbot interface and CLI tools.

---

## File Structure

Below is the structure of the `ai-assistant` system:

```plaintext
systems/ai-assistant
├── cli
│   ├── assets
│   ├── commands
│   ├── eslint-configs
│   ├── node_modules
│   ├── .gitignore
│   ├── .npmrc
│   ├── .prettierrc.mjs
│   ├── eslint.config.mjs
│   ├── package.json
│   ├── package-lock.json
│
├── web-components
│   ├── .wrangler
│   ├── dist
│   ├── node_modules
│   ├── scripts
│   ├── src
│   ├── .gitignore
│   ├── .npmrc
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── wrangler.json
│
├── worker
│   ├── .venv
│   ├── .wrangler
│   ├── node_modules
│   ├── scripts
│   ├── src
│   ├── .dev.vars
│   ├── .gitignore
│   ├── .pdm-python
│   ├── .python-version
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── pdm.lock
│   ├── pyproject.toml
│   ├── wrangler.toml
```

---

## Installation and Setup

To install and set up the `ai-assistant` system, use the provided development script:

1. **Run the setup script**:
   ```bash
   bash ./scripts/dev/setup.sh
   ```

This will install the necessary dependencies and prepare the system for use.

---

## Usage

You can utilize the `ai-assistant` system for various purposes, including running CLI commands, developing web components, and deploying the Cloudflare worker.

### CLI

1. **Navigate to the `cli` directory**:
   ```bash
   cd systems/ai-assistant/cli
   ```

2. **Run commands**:
    - To access OpenAI-powered chat:
      ```bash
      node cli/commands/chat.js
      ```
    - To summarize resumes:
      ```bash
      node cli/commands/resume-summary.js
      ```
    - To manage a CMS:
      ```bash
      node cli/commands/cms.js
      ```

Refer to specific command scripts in the `cli/commands` directory for more examples.

### Web Components

1. **Run the development server**:
   Start the web components for local development by running:
   ```bash
   bash ./scripts/dev/start.sh
   ```
2**Integrate**:
   Use the generated components from the `dist` folder and embed them into your frontend application.

### Worker

1. **Manual Requirement**:
    - **Set up Cloudflare AI Gateway**:
      Cloudflare does not currently offer an API to automate the resource creation process for AI Gateway. As a result, you must manually create the Cloudflare AI Gateway for the worker to function correctly.
      Follow these steps:
        - Sign into your Cloudflare account.
        - Navigate to **Workers & KV** > **AI Gateway**.
        - Create a new AI Gateway resource and configure it with the necessary OpenAI API details.

2. **Deploy the worker**:
   Use the deployment script to deploy the Cloudflare worker:
   ```bash
   bash ./scripts/ci/deploy.sh
   ```

3. **Test the worker**:
   You can run the worker locally with Cloudflare's Wrangler CLI:
   ```bash
   bash ./scripts/dev/start.sh
   ```

4. **Use the Worker**:
   The worker will handle requests from web components, acting as a backend service to interface with OpenAI APIs.

---

## Development

Follow these steps to start development:

1. **Start the development environment**:
   Run the provided start script to spin up the development environment:
   ```bash
   bash ./scripts/dev/start.sh
   ```

2. **Testing**:
   To run the test suite, use:
   ```bash
   bash ./scripts/ci/test.sh
   ```

---

## License

This project is licensed under the [MIT License](./LICENSE).

---