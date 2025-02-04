import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

export default function SkillSection({
  section,
}: {
  section: { description: any; section: string; tags: string[] };
}) {
  return (
    <Card component={'article'} id={section.section} title={section.section}>
      <CardHeader
        slotProps={{
          title: {
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
        <Box component={TinaMarkdown} content={section.description} />
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
          {section.tags.map(tag => (
            <Chip component={'li'} key={tag} label={tag} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
