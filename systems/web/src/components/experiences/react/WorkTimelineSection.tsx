import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import type { Work } from '../query.graphql.ts';

export default function WorkTimelineSection({ works }: { works: Array<Work> }) {
  return (
    <Paper component={'section'} title={'Work Timeline'}>
      <Timeline>
        {works.map((work: Work, index: number) => {
          if (index < 4) {
            return (
              <TimelineItem key={work.name}>
                <TimelineOppositeContent color="text.secondary">
                  <Typography variant={'body2'}>{work.period}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Link
                    href={`#${work.name}`}
                    title={`${work.role} at ${work.name}`}
                    underline={'hover'}
                  >
                    <Typography
                      sx={{
                        color: 'text.primary',
                      }}
                      variant={'body1'}
                    >
                      {work.role} at {work.name}
                    </Typography>
                  </Link>
                </TimelineContent>
              </TimelineItem>
            );
          }
          return (
            <TimelineItem key={work.name}>
              <TimelineOppositeContent color="text.secondary">
                <Typography variant={'body2'}>{work.period}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent title={`${work.role} at ${work.name}`}>
                <Typography
                  sx={{
                    color: 'text.primary',
                  }}
                  variant={'body1'}
                >
                  {work.role} at {work.name}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Paper>
  );
}
