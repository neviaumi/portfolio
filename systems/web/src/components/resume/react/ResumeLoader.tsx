import Paper from '@mui/material/Paper';
import React from 'react';

export default function ResumeLoader() {
  return (
    <Paper>
      {/*@ts-expect-error No typing for web component*/}
      <json-resume
        src={'https://neviaumi.github.io/resume.json/resume.base.json'}
      >
        {/*@ts-expect-error No typing for web component*/}
      </json-resume>
    </Paper>
  );
}
