import Paper from '@mui/material/Paper';
import React from 'react';

export default function ResumeLoader() {
  return (
    <Paper>
      {/*@ts-expect-error No typing for web component*/}
      <json-resume></json-resume>
    </Paper>
  );
}
