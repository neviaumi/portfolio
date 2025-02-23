import Paper from '@mui/material/Paper';

import { RichTextMarkdown } from '../../../../cms.ts';

export default function HeadingSection({ overview }: { overview: any }) {
  return (
    <Paper
      sx={{
        paddingX: 4,
        paddingY: 1,
      }}
    >
      <RichTextMarkdown content={overview} />
    </Paper>
  );
}
