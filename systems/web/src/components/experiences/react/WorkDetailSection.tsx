import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React from 'react';

import type { Work } from '../query.graphql.ts';

function WorkReference({
  references,
}: {
  references: Array<Work['workReferences'][0]['references']>;
}) {
  return (
    <Box component={'article'}>
      <Divider />
      {references.map(reference => {
        return (
          <Box component={'section'} key={reference.id} title={reference.name}>
            <CardHeader
              avatar={
                <Avatar alt={reference.name} src={reference.profilePicture} />
              }
              component={'header'}
              slotProps={{
                subheader: {
                  variant: 'body2',
                },
                title: {
                  variant: 'h5',
                },
              }}
              subheader={reference.relationship}
              title={reference.name}
            />
            <CardContent>
              <Typography component={'p'} variant={'body1'}>
                {reference.comments}
              </Typography>
            </CardContent>
          </Box>
        );
      })}
    </Box>
  );
}

export default function WorkDetailsSection({ works }: { works: Array<Work> }) {
  return (
    <Box
      component={'article'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
      title={'Work Details'}
    >
      {works.slice(0, 4).map((work: Work) => {
        return (
          <Card
            aria-description={work.description}
            component={'section'}
            id={work.name}
            key={work.name}
            title={work.name}
          >
            <CardHeader
              slotProps={{
                subheader: {
                  component: 'h3',
                  variant: 'body2',
                },
                title: {
                  component: 'h2',
                  variant: 'h5',
                },
              }}
              slots={{
                subheader: Typography,
                title: Typography,
              }}
              subheader={`${work.period}, ${work.location}`}
              title={`${work.role} at ${work.name}`}
            />
            <CardContent>
              <Typography variant={'body1'}>{work.description}</Typography>
            </CardContent>
            {work.workReferences && (
              <WorkReference
                references={work.workReferences.map(ref => ref.references)}
              />
            )}
          </Card>
        );
      })}
    </Box>
  );
}
