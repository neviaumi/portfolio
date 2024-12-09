# CMS Backend Selection

## Context and Problem Statement

When building my portfolio site, I want the content to be managed by a block-based CMS instead of being hardcoded into
the site so I can change the content easily.

Because the portfolio sites would contain a lot of content, using local JSON to manage content would be difficult.

Ideally, it would have a system that supports persistence over JSON files, and I can just commit the JSON file into
GitHub.

## Decision Drivers

- Ability to run locally
- Ability to commit content to GitHub
- Ability to access content through API (a.k.a Headless CMS)
- Valuable showcase for other job opportunities that require the CMS

## Considered Options

- Contentful
- WordPress
- PayloadCMS
- TinaCMS

## Decision Outcome

### Positive Consequences <!-- optional -->

- …

### Negative Consequences <!-- optional -->

- [e.g., compromising quality attribute, follow-up decisions required, …]
- …

## Pros and Cons of the Options <!-- optional -->

### Contentful

[example | description | pointer to more information | …] <!-- optional -->

- Good, because data is managed through the cloud
- Good, because it is feature-rich
- Bad, because it requires payment to access all features
- Bad, because it requires extra effort to handle authentication
- … <!-- numbers of pros and cons can vary -->

### WordPress

[Example implementation of custom content type on WP](https://github.com/neviaumi/portfolio/blob/556a7aabbb1e978cab26c6767dee30d3b34528ad/systems/cms/wordpress/wp-content/plugins/portfolio/portfolio.php#L1)

That implementation includes setting up a custom content type and incorporating the custom fields within the content
type. It also exposes the custom content type content on the REST API.

That experimental implementation is nearly all I want for this portfolio project.

- Good, because it is a popular CMS (62.2% as written)
- Good, because there are millions of results on the Internet for troubleshooting.
- Bad, because the implementation is complicated, as it requires a lot of custom code to implement just a custom content
  type.
- Bad, because it is not a headless CMS natively. That means I have to write a lot of custom code in plugins to expose
  the custom content type, including the form on the admin and public-facing API.

### PayloadCMS

[example | description | pointer to more information | …] <!-- optional -->

- Good, because [argument a]
- Good, because [argument b]
- Bad, because [argument c]
- … <!-- numbers of pros and cons can vary -->

### TinaCMS

[Example repo](https://github.com/neviaumi/portfolio/tree/be3f34007ed319d0c0be571fec760c40881360dc/systems/cms)

That implementation contain custom models

- Good, because it is dead simple to implement custom models.
- Good, because it is tailor-made for SSG CMS. All the content is saved over local files.
- Good, it provides visual editing features. I could edit on the production site directly.
- Bad, the visual editing feature requires extra configuration to get it to work, and it would couple the frontend and
  CMS.

## Links <!-- optional -->

- [Contentful](https://www.contentful.com/)
- [WordPress market share](https://w3techs.com/technologies/overview/content_management)

<!-- example: Refined by [ADR-0005](0005-example.md) -->

- … <!-- numbers of links can vary -->
