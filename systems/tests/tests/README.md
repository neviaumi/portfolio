# Tests

This directory contains the testing infrastructure and configurations for the project. The focus is to ensure quality, reliability, and consistency of the codebase through automated testing and linting.

---

## Contents

- [`playwright.config.ts`](#playwrightconfigts)
- [`eslint-configs`](#eslint-configs)
- [`test-examples`](#test-examples)
- [`test-results`](#test-results)
- [`scripts`](#scripts)
- [Dependencies](#dependencies)
- [Usage](#usage)

---

## `playwright.config.ts`

This is the configuration file for [Playwright](https://playwright.dev). It provides all the necessary options for running browser-based tests. This includes definitions of test directories, browser settings, test retries, and reports.

Key Features:
- Cross-browser testing (Chromium, Firefox, WebKit).
- Configurable test retries to improve stability.
- Generates detailed reports (`playwright-report`).

---

## `eslint-configs`

This directory holds custom ESLint configurations for maintaining code quality and consistency across the project.

Highlights:
- Ensures the code follows pre-written lint rules.
- Compatible with TypeScript and Playwright-related specifics.
- Can extend or modify rules for the `tests` directory.

---

## `test-examples`

This folder provides example tests that showcase Playwright's testing capabilities. These are useful for:
- New developers to learn the testing setup.
- Testing Playwright configurations in local setups.
- Providing starting points for creating new test cases.

---

## `test-results`

This directory stores the test results from Playwright runs. The contents include:
- Logs of test executions.
- Screenshots, videos, and traces (useful for debugging failed tests, based on Playwright setup).
- JSON files for programmatically analyzing test outcomes.

---

## `scripts`

This directory contains utility scripts for managing the testing toolchain. Key scripts include:

- **Setup the environment:**
  To install all dependencies and fully set up the testing environment, run:
  ```bash
  bash ./scripts/dev/setup.sh
  ```

- **Start the Playwright UI:**
  To launch the Playwright Test Runner UI, use:
  ```bash
  bash ./scripts/dev/start.sh
  ```

- **Run tests without UI:**
  To directly execute tests (e.g., for CI/CD), use:
  ```bash
  bash ./scripts/ci/test.sh
  ```

These scripts simplify local development and CI/CD testing workflows.

---

## Dependencies

The `systems/tests` directory relies on the following tools and libraries:
- **[Playwright](https://playwright.dev):** For browser automation and end-to-end testing.
- **[ESLint](https://eslint.org):** For linting and ensuring consistent code style.
- **[TypeScript](https://www.typescriptlang.org):** Provides type safety in tests and configurations.
- **[Docker](https://www.docker.com):** Used for containerized testing environments (as per `Dockerfile`).

### Key Files
Here are some important files in this directory:
- `package.json` – Manages project dependencies specific to testing.
- `Dockerfile` – Configures a Docker image tailored for running Playwright tests.
- `.prettierrc.mjs` – Ensures consistent code formatting for test files.
- `.npmrc` – Configures npm settings specific to this submodule.

---

## Usage

### Setting Up

To set up the environment, navigate to the `systems/tests` directory and run the setup script:
```bash
bash ./scripts/dev/setup.sh
```

### Running Tests Locally

- **Start Playwright UI:**
  ```bash
  bash ./scripts/dev/start.sh
  ```

- **Execute Tests Without UI:**
  ```bash
  bash ./scripts/ci/test.sh
  ```

Both methods will run Playwright tests with configurations provided in `playwright.config.ts`. All test results will be stored in the `test-results` and `playwright-report` directories.

---

## Reporting
Generate an HTML report after running tests:
```bash
npx playwright show-report
```
This will open the Playwright report in your default browser.

---

## Cleaning Up
Use helper scripts to clean up test artifacts (logs, screenshots, videos, etc.):
```bash
npm run clean
```

---

## Contribution Guidelines

1. **Write Tests:** Ensure all new features are covered with proper tests.
2. **Follow Code Style:** Adhere to the ESLint and Prettier configurations defined in this submodule.
3. **Push with Confidence:** Run tests and linting scripts before submitting any changes.

---

## CI/CD Integration

Playwright is integrated into the CI/CD pipeline defined in the project. All tests are executed in a containerized environment (via Docker) using `docker-compose.test.yml`.

### Running Tests with Docker
To run tests inside Docker:
```bash
docker-compose -f docker-compose.test.yml up --build
```

---

## Support

If you encounter any issues with the testing setup:
- Check the [official Playwright docs](https://playwright.dev).
- Refer to the logs or artifacts located in the `test-results` directory.
- Reach out to the team by opening an issue in the repository.

---

## License

This project is licensed under the terms of the [LICENSE](../../LICENSE).