import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { STRIPE_PUBLISHABLE_KEY } from '../_stripe.ts';

function CheckoutButton({ buyButtonId }: { buyButtonId: string }) {
  return (
    // @ts-expect-error No typing for Web component
    <stripe-buy-button
      buy-button-id={buyButtonId}
      publishable-key={STRIPE_PUBLISHABLE_KEY}
    >
      {/*@ts-expect-error No typing for Web component*/}
    </stripe-buy-button>
  );
}

export default function ServiceListingSection({
  products,
}: {
  products: Array<{
    description: string;
    id: string;
    images: string[];
    metadata: {
      BUY_BUTTON_ID: string;
    };
    name: string;
    prices: {
      currency: string;
      unit_amount: number;
    };
  }>;
}) {
  return (
    <Grid
      component={'ul'}
      container
      spacing={2}
      sx={{
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
      }}
    >
      {products.map(product => {
        const price = new Intl.NumberFormat('en-gb', {
          currency: product.prices.currency,
          style: 'currency',
        }).format(product.prices.unit_amount / 100);
        return (
          <Grid component={'li'} key={product.id} size={{ md: 6, xs: 12 }}>
            <Paper
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                justifyContent: 'center',
                paddingX: 2,
                paddingY: 1,
              }}
            >
              <Box
                alt={product.name}
                component={'img'}
                src={product.images[0]}
                sx={{
                  height: 320,
                  objectFit: 'cover',
                  width: 320,
                }}
              />
              <Typography component={'h1'} variant={'h5'}>
                {product.name}
              </Typography>
              <Typography
                color={'action.active'}
                component={'p'}
                variant={'body2'}
              >
                {price}
              </Typography>
              <CheckoutButton buyButtonId={product.metadata.BUY_BUTTON_ID} />
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
