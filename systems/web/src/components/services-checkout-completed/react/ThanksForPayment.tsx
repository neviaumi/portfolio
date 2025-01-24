import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import ThanksForPaymentImage from './thanks-for-payment.png';

export default function ThanksForPayment() {
  return (
    <Card
      component="section"
      sx={{
        paddingTop: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CardMedia
          alt="Thanks for payment"
          component="img"
          image={ThanksForPaymentImage.src}
          sx={{
            height: '320px',
            width: '320px',
          }}
        />
      </Box>

      <CardHeader
        sx={{
          paddingTop: 4,
          textAlign: 'center',
        }}
        title="Thanks for your payment"
        titleTypographyProps={{
          variant: 'h4',
        }}
      />
      <CardContent
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography component="p" variant="h5">
          We truly appreciate your payment! Looking forward to completing this
          project successfully and collaborating
        </Typography>
      </CardContent>
    </Card>
  );
}
