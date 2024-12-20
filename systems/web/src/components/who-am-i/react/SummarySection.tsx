import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function SummarySection({
  summary,
}: {
  summary: {
    careerOverview: string;
    name: string;
    position: string;
    profilePicture: string;
  };
}) {
  const { careerOverview, name, position, profilePicture } = summary;
  return (
    <Card
      component={'section'}
      sx={{
        marginBottom: 1,
        marginTop: 0.5,
      }}
      title={'Summary'}
    >
      <CardHeader
        avatar={<Avatar alt={name} src={profilePicture} />}
        component={'header'}
        subheader={position}
        subheaderTypographyProps={{
          variant: 'body2',
        }}
        title={name}
        titleTypographyProps={{
          variant: 'h5',
        }}
      />
      <CardContent>
        <Typography component={'p'} variant="body1">
          {careerOverview}
        </Typography>
      </CardContent>
    </Card>
  );
}
