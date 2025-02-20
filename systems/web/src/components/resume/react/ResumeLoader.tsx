import Paper from '@mui/material/Paper';
import React from 'react';

export default function ResumeLoader({
  resumeJsonUrl,
}: {
  resumeJsonUrl: string;
}) {
  return (
    <Paper>
      {/*@ts-expect-error No typing for web component*/}
      <json-resume src={resumeJsonUrl}>
        {/*@ts-expect-error No typing for web component*/}
      </json-resume>
    </Paper>
  );
}
