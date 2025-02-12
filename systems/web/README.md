# Web System

This directory contains the codebase for the **Web System** of the project.

---

## **Overview**

This system is responsible for handling the front-end of the application. It includes configurations, scripts, and source code specifically for web-based functionality. Built using [Astro](https://astro.build/) and **React**, it ensures a modern and efficient front-end interface.

---

## **File Structure**

```plaintext
systems/web
├── .astro              # Astro framework configurations and files
├── dist                # Compiled output (production-ready)
├── eslint-configs      # Custom ESLint configurations
├── public              # Static assets (e.g., images, icons, etc.)
├── scripts             # System-level scripts for development, testing, and setup
│   ├── dev             # Development setup and start scripts
│   ├── ci              # Continuous integration and testing scripts
│   └── other-scripts   # Additional scripts (if any)
├── src                 # Actual source code for the application
│   ├── components      # React components
│   ├── pages           # Astro pages
│   ├── styles          # Styling (CSS/SCSS modules or libraries)
│   ├── utils           # Utility scripts/helpers
│   └── index.tsx       # Main entry point for the web application
├── astro.config.mjs    # Astro's project configuration
├── Dockerfile          # Docker setup for containerizing this web system
├── package.json        # Node.js dependencies and project metadata
├── README.md           # Documentation for the web system
├── tsconfig.json       # TypeScript configurations
└── .gitignore          # Git ignore rules specific to this system
```

---

## **Development**

### Prerequisites

Ensure the following are installed on your machine:

- **Node.js**: Refer to the `.nvmrc` file in the root directory for the required Node.js version.
- **npm**: Package manager for installing dependencies.
- **Bash**: Required to run key scripts.

### Setting Up Development Environment

To set up the environment for local development, use:

```bash
bash scripts/dev/setup.sh
```

This script installs all necessary dependencies and prepares the environment.

### Starting the Development Server

Once the system is set up, start the development server using:

```bash
bash scripts/dev/start.sh
```

The script will display the application URL in the console when it starts successfully.

---

## **Testing**

### **Type Checking and Style Validation**

The `bash scripts/ci/test.sh` script runs:

1. **TypeScript Compiler (`tsc`)**:
    - Ensures the TypeScript source files are type-checked.
2. **ESLint**:
    - Validates the code style against the configured ESLint rules.

Run the tests using:

```bash
bash scripts/ci/test.sh
```

This ensures your code is both type-safe and adheres to the project's coding standards.

### **End-to-End (E2E) Tests**

E2E tests for the entire project are located in the `../tests` folder at the root of the repository. To execute these tests, refer to the E2E testing guidelines in the root `README.md`, or navigate to `../tests` and check the associated scripts.

---

## **Building for Production**

To build the application for production, execute:

```bash
npm run build
```

The compiled output will be placed in the `dist/` directory, ready for deployment.

---

## **Key Technologies**

- **Astro**: Front-end framework for building ultra-fast web applications.
- **React**: Library for building reusable, component-based user interfaces.
- **TypeScript**: Strongly typed programming language for JavaScript.
- **ESLint**: For code linting and maintaining code quality.
- **Prettier**: To enforce consistent code formatting.

---

## **Docker Support**

This system comes with a `Dockerfile` to simplify deployment.

To build a Docker image:

```bash
docker build -t web-system .
```

Run the built container with:

```bash
docker run -p [local_port]:[container_port] web-system
```

---

## **Scripts Reference**

### **Development Scripts**

- **Setup**: Prepares the development environment.

  ```bash
  bash scripts/dev/setup.sh
  ```

- **Start**: Launches the development server.

  ```bash
  bash scripts/dev/start.sh
  ```

### **Testing Scripts**

- **Type Check and Lint**: Verifies type safety and code style.

  ```bash
  bash scripts/ci/test.sh
  ```

---

## **Contributing**

Please adhere to the coding standards and guidelines outlined in the root repository `README.md`.

To contribute to this system:

1. Ensure your code satisfies the ESLint rules defined in `.eslint.config.mjs`.
2. Use Prettier for consistent code formatting (`.prettierrc.mjs`).
3. Test all changes thoroughly using `bash scripts/ci/test.sh`.

When making changes, always submit a pull request with a clear and detailed description.

---

## **License**

This project is licensed under the [MIT License](../../LICENSE).

---
