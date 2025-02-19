import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RichTextMarkdown } from '../../../cms.ts';

export default function SummarySection({
  summary,
}: {
  summary: {
    careerOverview: any;
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
        action={
          <a href={'/portfolio/resume'}>
            <IconButton aria-label="resume">
              <WorkHistoryOutlinedIcon fontSize={'large'} />
            </IconButton>
          </a>
        }
        aria-description={careerOverview}
        avatar={<Avatar alt={name} src={profilePicture} />}
        component={'header'}
        slotProps={{
          subheader: {
            variant: 'body2',
          },
          title: {
            variant: 'h5',
          },
        }}
        slots={{
          subheader: Typography,
          title: Typography,
        }}
        subheader={position}
        title={name}
      />
      <CardContent
        sx={{
          paddingTop: 0,
        }}
      >
        <RichTextMarkdown content={careerOverview} />
        {/*<Typography component={'p'} variant="body1">*/}
        {/*  {careerOverview}*/}
        {/*</Typography>*/}
      </CardContent>
    </Card>
  );
}
