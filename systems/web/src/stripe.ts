import Stripe from 'stripe';

export const STRIPE_PUBLISHABLE_KEY = process.env['WEB_STRIPE_PUBLISHABLE_KEY'];
export const STRIPE_SECRET_KEY = process.env['WEB_STRIPE_SECRET_KEY'];

export function listProductWithPrice() {
  if (!STRIPE_SECRET_KEY) {
    return [];
  }
  const stripe = new Stripe(STRIPE_SECRET_KEY);
  return stripe.products
    .list({
      active: true,
    })
    .then(async ({ data: products }) => {
      return Promise.all(
        products.map(async product => {
          return {
            ...product,
            prices: await stripe.prices.retrieve(
              product.default_price as string,
            ),
          };
        }),
      );
    });
}
