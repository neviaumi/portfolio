import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function HeadingSection({
  whatIsCoreValues,
}: {
  whatIsCoreValues: string;
}) {
  return (
    <Card
      component={'section'}
      sx={{
        marginBottom: 1,
        marginTop: 0.5,
      }}
      title={'Heading'}
    >
      <CardHeader
        component={'header'}
        title={'What Are Core Values and Why?'}
        titleTypographyProps={{
          variant: 'h5',
        }}
      />
      <CardContent>
        <Typography component={'p'} variant="body1">
          {whatIsCoreValues}
        </Typography>
      </CardContent>
    </Card>
  );
}
