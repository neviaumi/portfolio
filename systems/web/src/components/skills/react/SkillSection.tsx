import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import { RichTextMarkdown } from '../../../cms.ts';

export default function SkillSection({
  section,
}: {
  section: { description: any; keywords: { name: string }[]; section: string };
}) {
  return (
    <Card component={'article'} id={section.section} title={section.section}>
      <CardHeader
        slotProps={{
          title: {
            component: 'h2',
            variant: 'h5',
          },
        }}
        slots={{
          title: Typography,
        }}
        title={section.section}
      />
      <CardContent
        sx={{
          paddingTop: 0,
        }}
      >
        <Box component={RichTextMarkdown} content={section.description} />
        <Divider />
        <Stack
          component={'ul'}
          direction="row"
          sx={{
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            margin: 0,
            marginTop: 2,
            padding: 0,
          }}
        >
          {section.keywords.map(({ name }) => (
            <Chip component={'li'} key={name} label={name} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
