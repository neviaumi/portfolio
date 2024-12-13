# SSG Frontend Selection

## Context and Problem Statement

I want my portfolio site hosted on GitHub Pages and to fetch content from a CMS directly on the page.  
GitHub Pages should be the only infrastructure required to deploy my portfolio.

## Decision Drivers

- Seamless React component integration; specifically, I want to use MUI (Material-UI).
- Smooth integration with Google Tag Manager (GTM).

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

All the example implementations included the following integrations:

- TinaCMS GraphQL endpoint
- MUI
- GTM

### Gatsby

[Example implementation](https://github.com/neviaumi/portfolio/tree/8e586e18ec0ddd5998d3a2f2a4509a9d5cb72d4b/systems/web/src)

- **Pros**:
  - Plenty of plugins ready to use.
  - Code uses pure React syntax.
- **Cons**:
  - Nearly everything requires a plugin to implement (e.g., endpoint fetching, header scripts, etc.).
  - Poor development experience with GTM as it wasn't available in development mode, and the build mode lacked hot reloading support.
  - The final build resulted in a client-side rendered website.

### Astro

[Example implementation](https://github.com/neviaumi/portfolio/tree/01a13b5474975d993d23a6511cadd20fdf0c47cf/systems/web)

- **Pros**:
  - Easy and straightforward to implement. Data fetching and tracker injection were simple.
  - By default, no JavaScript was delivered to the client.
  - Great developer experience during development.
- **Cons**:
  - Requires learning some Astro-specific component syntax.

### [Option 3]

[Example | Description | Pointer to more information | …] <!-- optional -->

- **Pros**:
  - [Argument A]
  - [Argument B]
- **Cons**:
  - [Argument C]
- … <!-- Numbers of pros and cons can vary -->

## Links <!-- optional -->

<!-- Example: Refined by [ADR-0005](0005-example.md) -->

- … <!-- Numbers of links can vary -->
