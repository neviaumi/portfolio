# SSG Frontend Selection

## Context and Problem Statement

I want my portfolio site hosted on GitHub Pages and to fetch content from a CMS directly onto the page.  
GitHub Pages should be the only infrastructure needed to deploy my portfolio.

## Decision Drivers

- Seamless React component integration. Specifically, I want to use MUI.
- Seamless integration with Google Tag Manager (GTM).

## Considered Options

- Astro
- Gatsby
- Next.js

## Decision Outcome

...

### Positive Consequences

- ...

### Negative Consequences <!-- optional -->

- ...

## Pros and Cons of the Options <!-- optional -->

### Gatsby

[Example implementation](https://github.com/neviaumi/portfolio/tree/8e586e18ec0ddd5998d3a2f2a4509a9d5cb72d4b/systems/web/src)

The proof of concept (POC) included the following integrations:

- TinaCMS GraphQL endpoint
- MUI
- GTM

- **Good**: Plenty of plugins ready to use.
- **Good**: Code uses pure React syntax.
- **Bad**: Nearly everything requires a plugin to implement (e.g., endpoint fetching, header scripts, etc.).
- **Bad**: The development experience of GTM was poor because it wasn't available in development mode, and the build mode did not support hot reloading.
- **Bad**: The resulting build was a client-side rendered website.

### [Option 2]

[Example | Description | Pointer to more information | …] <!-- optional -->

- **Good**: [Argument A]
- **Good**: [Argument B]
- **Bad**: [Argument C]
- … <!-- Numbers of pros and cons can vary -->

### [Option 3]

[Example | Description | Pointer to more information | …] <!-- optional -->

- **Good**: [Argument A]
- **Good**: [Argument B]
- **Bad**: [Argument C]
- … <!-- Numbers of pros and cons can vary -->

## Links <!-- optional -->

<!-- Example: Refined by [ADR-0005](0005-example.md) -->

- … <!-- Numbers of links can vary -->
