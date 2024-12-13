# SSG Frontend Selection

## Context and Problem Statement

I want my portfolio site to be hosted on GitHub Pages and fetch content from a CMS directly on the page.  
GitHub Pages should be the only infrastructure required to deploy my portfolio.

## Decision Drivers

- Seamless integration with React components, specifically MUI (Material-UI).
- Smooth integration with Google Tag Manager (GTM).

## Considered Options

- Astro
- Gatsby
- Next.js

## Decision Outcome

Astro was selected due to its excellent developer experience (DX) and ease of implementation while maintaining the required features.

## Pros and Cons of the Options <!-- optional -->

All example implementations included the following integrations:

- TinaCMS GraphQL endpoint
- MUI
- GTM

### Gatsby

[Example implementation](https://github.com/neviaumi/portfolio/tree/8e586e18ec0ddd5998d3a2f2a4509a9d5cb72d4b/systems/web/src)

- **Pros**:
  - Numerous plugins readily available.
  - The code adheres to pure React syntax.
- **Cons**:
  - Almost everything requires a plugin to implement (e.g., endpoint fetching, header scripts, etc.).
  - Poor development experience with GTM: It wasn’t available during development mode, and the build mode lacked hot reloading support.
  - The final build resulted in a client-side rendered website.

### Astro

[Example implementation](https://github.com/neviaumi/portfolio/tree/01a13b5474975d993d23a6511cadd20fdf0c47cf/systems/web)

- **Pros**:
  - Simple and straightforward to implement, including data fetching and tracker injection.
  - By default, no JavaScript is delivered to the client.
  - Excellent developer experience during development.
- **Cons**:
  - Requires learning some Astro-specific component syntax.

### Next.js

- **Pros**:
  - Feature-rich and popular.
  - Dynamic rendering can be implemented relatively easily if needed.
- **Cons**:
  - Complex to set up.
  - Many features are not relevant for this project.

## Links <!-- optional -->

<!-- Example: Refined by [ADR-0005](0005-example.md) -->

- … <!-- Number of links can vary -->
