import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { STRIPE_PUBLISHABLE_KEY } from '../../../stripe.ts';
import consulateIcon from './consulate.webp';

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
        listStyle: 'none',
        padding: 0,
      }}
    >
      <Grid component={'li'} size={12}>
        <Paper
          component={'a'}
          href={
            'https://calendly.com/david-ng-dev/45min?preview_source=portfolio'
          }
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            justifyContent: 'center',
            paddingX: 2,
            paddingY: 1,
            textDecoration: 'none',
          }}
          target={'_blank'}
        >
          <Box
            alt={'calendly'}
            component={'img'}
            src={consulateIcon.src}
            sx={{
              height: 320,
              objectFit: 'cover',
              width: 320,
            }}
          />
          <Button
            sx={{
              width: '304px',
            }}
            variant="contained"
          >
            Book an initial consultation
          </Button>
        </Paper>
      </Grid>
      {products.map(product => {
        const price = new Intl.NumberFormat('en-gb', {
          currency: product.prices.currency,
          style: 'currency',
        }).format(product.prices.unit_amount / 100);
        return (
          <Grid component={'li'} key={product.id} size={12}>
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
                  // transform: 'scale(1.25)',
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
