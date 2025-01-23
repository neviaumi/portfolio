# Shop Backend

## Context and Problem Statement

I decided to create a service page on my portfolio website as a demo site for my own e-commerce platform.

I also intend to use this as the starting point for running some short-term projects for income generation.

I need a shopping backend to handle tasks such as product listing, order management, payment processing, etc.

Since this project is hosted on GitHub Pages, I want the integration to be frontend-only.

Additionally, I prefer a shopping backend with pay-per-transaction billing, so there are no costs incurred if there is no usage.

## Decision Drivers <!-- optional -->

- The billing method should follow a pay-per-transaction model.
- Integration with Astro should be easy.
- Integration should be achievable using only the frontend.
- Minimizing integration complexity is important.

## Considered Options

- Shopify
- Stripe

## Decision Outcome

I chose Stripe because it covers most of my requirements, such as product listing, order management, and payment processing.

Most importantly, Stripe allows running the solution in production without any monthly subscription fees.

## Pros and Cons of the Options <!-- optional -->

### Shopify

The [experimental repo here](https://github.com/neviaumi/experimental-shopify-theme/) demonstrated that integrating Shopify with Astro was quite easy and feature-rich. Shopify provides a shopping cart and a GraphQL API endpoint ready for use.

This makes the integration faster and easier as I would not need to handle cart-related logic or how to fetch API data manually.

- **Pros**:
  - Comes with an SDK and is easy to use.
  - Includes built-in analytics features.
  - Enables a shopping cart without needing to host your own backend.

- **Cons**:
  - Requires a monthly subscription fee.

### Stripe

The [experimental repo here](https://github.com/neviaumi/experimental-stripe/) showed that integrating Stripe with Astro was relatively straightforward, especially because I only have a very limited number of products (currently, only one).

I was able to use the built-in "Buy Button" for quick integration and customization.

- **Pros**:
  - Pay-per-transaction billing.
  - While limited in features, it is sufficient for my current requirements.

- **Cons**:
  - In the future, if a shopping cart is required, I will need to manage my own backend.
  - The analytics dashboard seems less comprehensive compared to Shopify.
