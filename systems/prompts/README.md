# `systems/prompts`

The `systems/prompts` directory is part of the overall `portfolio` project and is designed to manage or centralize prompt-related configurations, logic, or utilities. This README explains the structure and purpose of the directory.

---

## Purpose

The `systems/prompts` folder serves functionalities related to handling "prompts" within the larger project. It includes:

- Managing prompt templates or related configurations.
- Utilities or scripts to process prompts dynamically.
- Supporting reusable and scalable prompt-handling logic.

This directory likely integrates with other modules within the `systems` layer for a modular and maintainable project structure.

---

## Directory Structure

Below is an overview of the directory's structure with descriptions of key components:

```plaintext
systems/prompts
├── node_modules            # Dependencies specific to this subpackage.
├── scripts                 # Utility scripts for prompt handling.
├── src                     # Source code for the prompt system.
├── .gitignore              # Git ignore rules specific to this package.
├── .npmrc                  # NPM configuration specific to this package.
├── .prettierrc.mjs         # Prettier configuration for code formatting.
├── Dockerfile              # Dockerfile to containerize prompt functionality.
├── eslint.config.mjs       # ESLint configuration for linting this system.
├── package.json            # Package metadata and npm scripts.
├── package-lock.json       # Lockfile for reproducible npm installs.
```

---

## Prerequisites

Ensure the following are installed and configured before working with this directory:

1. **Node.js**: Use the version specified in `.nvmrc` (use `nvm` to manage Node versions).

   ```bash
   nvm use
   ```

2. **NPM**: Install dependencies using the included `package-lock.json`.

   ```bash
   npm install
   ```

3. **Docker**: If you need to containerize this module, ensure Docker is installed and running.

---

## Installation

To set up the system:

1. Navigate to the `prompts` directory:

   ```bash
   cd systems/prompts
   ```

2. Run the setup script to install dependencies and configure the environment:

   ```bash
   bash ./scripts/dev/setup.sh
   ```

---

## Starting the API Server

To start the API server, use the following script:

```bash
bash ./scripts/dev/start.sh
```

This will spin up the necessary services and the prompt API server.

---

## Usage

### Scripts

Run available scripts from the `scripts` folder or use defined npm commands in the `package.json`:

```bash
npm run <command>
```

### Source Code

The main files and logic for managing prompts can be found in the `src` directory. If applicable, refer to the entry points or modules exported by this folder.

### Docker

To containerize the prompt system, use the included `Dockerfile`. For example:

```bash
docker build -t prompts-service .
```

---

## Configuration

### Prettier

A `.prettierrc.mjs` file is included for consistent formatting of the code base. Use this configuration to match the project’s formatting expectations.

### ESLint

Linting is configured through the `eslint.config.mjs` file. Ensure all code passes linting checks before committing.

---

## Contributing

Follow these guidelines when contributing:

1. Write clear and meaningful commit messages.
2. Run all linting and formatting checks prior to creating a pull request.
3. Test any changes, especially if new integrations involve other systems or modules.

---

## License

This directory is part of the overall `portfolio` project and adheres to the repository's [LICENSE](../../LICENSE).

---

## Support

If you encounter any issues or have questions regarding this module, feel free to open an issue or contribute via pull requests.