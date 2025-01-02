import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useState } from 'react';

export default function ResumeLoader() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(
    function loadWebComponents() {
      const resumeBaseUrl = 'https://neviaumi.github.io/resume.json/';
      if (isLoading) {
        fetch(`${resumeBaseUrl}.vite/manifest.json`)
          .then(response => response.json())
          .then(json => {
            const script = document.createElement('script');
            script.setAttribute('crossorigin', '');
            script.setAttribute('type', 'module');
            script.setAttribute(
              'src',
              `${resumeBaseUrl}${json['index.html'].file}`,
            );
            document.head.appendChild(script);
            setIsLoading(false);
          });
      }
    },
    [isLoading, setIsLoading],
  );
  return (
    <Paper>
      {isLoading && (
        <Skeleton
          sx={{
            height: '32rem',
          }}
        />
      )}
      {/*@ts-expect-error No typing for web component*/}
      <json-resume></json-resume>
    </Paper>
  );
}
