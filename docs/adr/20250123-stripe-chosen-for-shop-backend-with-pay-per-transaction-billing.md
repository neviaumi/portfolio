# Stripe Chosen for Shop Backend with Pay-Per-Transaction Billing

- **Status**: Accepted
- **Deciders**: Developer (self)
- **Date**: 2025-01-23

---

## Context and Problem Statement

- **Business goal**: Create a demo e-commerce site on my portfolio website to serve as a starting point for income-generating projects.
- **Technical problem**: Identify a shopping backend solution to handle tasks such as product listing, order management, and payment processing.
- **Scope**: The solution must integrate with the frontend-only architecture of a GitHub Pages-hosted project and be cost-effective with a pay-per-transaction billing model.

---

## Decision Drivers

1. **Billing model**: Must follow a pay-per-transaction model to avoid fixed costs when there is no activity.
2. **Integration simplicity**: Solution should integrate easily with Astro.
3. **Frontend-only approach**: Backend management is not feasible due to the hosting constraints of GitHub Pages.
4. **Minimal complexity**: Solution should have minimal setup requirements.

---

## Considered Options

1. **Shopify**  
   Shopify provides a feature-rich system with a shopping cart, GraphQL API, and SDK for easier integration.

2. **Stripe**  
   Stripe has straightforward integration through its "Buy Button" and supports essential features for product listing and order management.

---

## Decision Outcome

- **Chosen Option**: **Stripe**
  - **Reasoning**: Stripe fulfills all key requirements, particularly the pay-per-transaction billing model, which ensures no fixed costs. It also integrates easily with Astro and requires minimal complexity for initial setup, making it suitable for frontend-only projects.

### Positive Consequences

- Zero upfront or fixed monthly costs ensure cost-effectiveness.
- Simple integration allows for quick deployment on a GitHub Pages-hosted site.

### Negative Consequences

- Limited features compared to Shopify, particularly with regard to shopping cart capabilities.
- Managing a shopping cart would require building a custom backend in the future.

---

## Risks and Mitigations

- **Risk**: A shopping cart may be required in the future.
  - **Mitigation**: Explore third-party frontend-only shopping cart solutions or migrate to a backend-supported platform if the need arises.
- **Risk**: Less comprehensive analytics compared to Shopify.
  - **Mitigation**: Rely on third-party web analytics tools or Stripe extensions if detailed analytics are needed.

---

## Analysis of the Options

### **Option 1: Shopify**

- **Pros**:
  - Feature-rich, with tools like SDK, shopping cart, and GraphQL API.
  - Includes built-in analytics for sales and tracking.
  - Rapid integration due to its robust ecosystem.

- **Cons**:
  - Requires a monthly subscription fee, incurring fixed costs even without usage.
  - Overkill for a solution requiring only basic shopping functionality.

---

### **Option 2: Stripe**

- **Pros**:
  - Offers pay-per-transaction billing with no fixed monthly fees.
  - Straightforward integration using "Buy Button" and APIs.
  - Sufficient for basic requirements like listing a limited number of products and processing payments.

- **Cons**:
  - Lacks built-in shopping cart functionality, requiring custom implementation for advanced use cases.
  - Analytics dashboard is less comprehensive than Shopify's.

---

## Future Considerations

- If the project scales up and requires shopping cart functionality or more advanced features, consider upgrading to a more feature-complete platform or building a custom backend.
- Monitor new updates or features added to Stripe to ensure it continues to meet growing needs.

---

## Links

- [Stripe Experimental Integration Repo](https://github.com/neviaumi/experimental-stripe/)
- [Shopify Experimental Integration Repo](https://github.com/neviaumi/experimental-shopify-theme/)
- [GitHub Pages Documentation](https://pages.github.com/)