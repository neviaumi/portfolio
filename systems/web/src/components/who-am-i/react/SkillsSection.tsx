import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Chart,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);
export default function SkillsSection({
  skills,
}: {
  skills: {
    level: number;
    section: string;
  }[];
}) {
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef && canvasRef.current && isLoading) {
      new Chart(canvasRef.current.getContext('2d')!, {
        data: {
          datasets: [
            {
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              data: skills.map(skill => skill.level),
              fill: true,
              label: 'Skill level',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
          ],
          labels: skills.map(skill => skill.section.split(' ')),
        },
        options: {
          font: { family: 'Roboto', lineHeight: 1.5, size: 16 },
          plugins: {
            legend: { display: false },
          },
          scales: {
            r: {
              pointLabels: {
                font: {
                  family: 'Roboto',
                  lineHeight: 1.5,
                  size: 16,
                },
              },
              suggestedMax: 10,
              suggestedMin: 0,
              ticks: {
                font: {
                  family: 'Roboto',
                  lineHeight: 1.66,
                  size: 12,
                },
              },
            },
          },
        },
        type: 'radar',
      });
      setIsLoading(false);
    }
    return;
  }, [isLoading, skills]);
  return (
    <section title={'Skills'}>
      <Typography
        component={'header'}
        sx={{
          textAlign: 'center',
        }}
        variant={'h4'}
      >
        Skills
      </Typography>
      <Paper
        sx={{
          aspectRatio: 1,
          display: 'flex',
          height: {
            md: '50rem',
          },
          justifyContent: 'center',
          marginBottom: 1,
          marginTop: 0.5,
          marginX: 'auto',
          maxWidth: {
            lg: '1200px',
            xs: '100vw',
          },
          position: 'relative',
        }}
      >
        {isLoading && (
          <Box
            sx={{
              height: `38rem`,
              width: '100vw',
            }}
          >
            Loading...
          </Box>
        )}
        <Box component={'canvas'} ref={canvasRef} />
      </Paper>
    </section>
  );
}
