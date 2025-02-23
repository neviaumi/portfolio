# Portfolio

This repository powers a **portfolio platform** designed to showcase personal and professional achievements, provide development services, and articulate expertise in software development. It focuses on presenting working experiences, software-related skills, references, answers to common behavioral questions, and supports e-commerce features such as service payments.

---

## Table of Contents

1. [Design Mock-up](#design-mock-up)
2. [Project Overview](#project-overview)
  - [Purpose](#purpose)
3. [Core Capabilities](#core-capabilities)
  - [Monorepo Architecture](#monorepo-architecture)
  - [Functionality Overview](#functionality-overview)
4. [Key Technologies Used](#key-technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Payment and Monetization](#payment-and-monetization)
  - [DevOps and Toolchain](#devops-and-toolchain)
5. [Spin-up Development Environment](#spin-up-development-environment)
6. [Highlights](#highlights)
7. [Acknowledgment](#acknowledgment)
8. [AI Assistant](#ai-assistant)

---

## Design Mock-up

To refer to the design, please see the mock-up in Figma:

[Figma Design Mock-up](https://www.figma.com/design/opnaMAqRjMXTi9SlCi78yi/Portfolio?node-id=0-1&t=eQXhUV60mTQBuuLD-1)

---

## Project Overview

### Purpose

The portfolio includes:
- A comprehensive showcase of **working experiences**.
- Detailed **software development skills** and **areas of expertise**.
- **References** and endorsements from collaborators or employers.
- Answers to **common behavioral questions**, offering insights into problem-solving approaches, communication style, and workflow preferences.
- A platform for offering **development services** with integrated **payment functionality**.

This portfolio is built with robust modern technologies and best development practices, enabling a seamless, responsive, and engaging user experience.

---

## Core Capabilities

### Monorepo Architecture
This repository uses a **monorepository** to manage multiple systems and services effectively:
- **`web`**: The frontend service, built with Astro.js and React for dynamic and static UI components.
- **`cms`**: A content management system, likely for managing portfolio-related data (skills, references, etc.).
- **`tests`**: Handles automated testing for storage, integration, and UI feedback.
- **`ai-assistant`**: A modular sub-system that provides OpenAI-powered tools and features for integration, including CLI tools, a chatbot web component, and a Cloudflare worker backend.

### Functionality Overview
1. **Portfolio Showcase**:
  - Highly optimized content rendering powered by **Astro.js**.
  - Features **React.js** dynamic components for interactive elements such as behavioral question answers or services listings.

2. **Personal Branding**:
  - Emphasizes your **skills**, **experience**, and **ways to collaborate**.
  - Supports **references and reviews** to strengthen trustworthiness.

3. **Service Monetization**:
  - Allows visitors to **request development services**.
  - **Stripe** integration handles secure payment processing.

4. **AI-Powered Chatbot**:
  - A chatbot is seamlessly integrated into all portfolio HTML files.
  - Hiring managers or recruiters can directly ask questions to the chatbot, enabling on-the-spot inquiries about your skills, experience, and availability.

5. **Question Handling**:
  - Answers **common behavioral questions** to facilitate a better understanding of your working and communication style.

6. **High Performance**:
  - Lightweight and fast builds through Astro.js for SEO-friendly and high-performance static website generation.

---

## Key Technologies Used

### Frontend
- **Astro.js**: For fast, lightweight static site generation, ideal for personal portfolios.
- **React.js**: For dynamic UI elements, user interactions, and reusable modular components.
- **Material-UI (MUI)**: To ensure a polished design and professional feel.

### Backend
- **AI Assistant Worker**: Cloudflare worker service for wrapping OpenAI APIs and serving requests from the web and CLI.
- **CMS Integration**: Manages the portfolio data and makes it configurable for potential real-time updates.
- **Docker**: Ensures portable and consistent local and production environments.

### Payment and Monetization
- **Stripe Integration**: Facilitates payments for services directly through the portfolio.

### DevOps and Toolchain
- **CI/CD**:
  - Uses **GitHub Actions** for deployments and PR quality checks.
  - **Docker Compose**: Configures different stages (development, test, production) for seamless container setups.

---

## Spin-up Development Environment

To set up the development environment for this repository, you can use the following commands:

1. **Install Dependencies**:
   ```bash
   bash ./scripts/dev/setup.sh
   ```

2. **Start Development**:
   ```bash
   bash ./scripts/dev/start.sh
   ```

---

## Highlights

- **Monorepo Architecture**: Centralizes multiple systems in a single repository for better manageability and collaboration.
- **AI-Driven**: Provides AI-powered utilities like chatbots and automated content generation.
- **Service Monetization**: Adds real-world e-commerce functionality with Stripe integration.
- **Responsive Design**: Built on modern frameworks to ensure great performance across devices.

---

## AI Assistant

The **AI Assistant** is a sub-system located in `systems/ai-assistant` that adds OpenAI-powered capabilities to this portfolio. It is composed of the following components:

### CLI
The CLI provides modular commands for:
- Managing CMS tasks.
- Summarizing resumes and extracting keywords.
- Providing chatbot-powered assistance.

### Web Components
A set of reusable web components enabling seamless integration of OpenAI-based chatbot interfaces for interacting with website visitors.

### Integrated Chatbot
The portfolio includes an **AI chatbot**, embedded into all portfolio HTML files, designed to:
- Answer hiring managers' or recruiters' questions in real-time.
- Provide details about expertise, skills, working style, and availability.

### Cloudflare Worker
The **worker** acts as a backend service wrapping OpenAI API requests, providing scalability, speed, and cost efficiency.

#### Cloudflare Worker Setup
The worker requires manual creation of a **Cloudflare AI Gateway** resource. This step currently cannot be automated. To complete setup:
1. Sign into your Cloudflare account.
2. Go to **Workers & KV > AI Gateway**.
3. Create a new resource and configure it with the necessary OpenAI API details.

Once the AI Gateway is created, use the deployment script to deploy the worker:
```bash
bash ./scripts/ci/deploy.sh
```

---

## Acknowledgment

This document was generated with the assistance of an AI tool to structure and outline the features, systems, and components of this repository. Thank you for checking out this portfolio platform. We welcome feedback, contributions, and suggestions to help improve its functionality, performance, and usability.