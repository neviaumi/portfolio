import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';

import { calculateIdFromQuestion } from './utils.ts';

export default function TableOfContentSection({
  questions,
}: {
  questions: {
    group: string;
    question: string;
  }[];
}) {
  const indexes = Array.from(
    Object.entries(
      questions
        .map(({ group, question }) => [group, question])
        .reduce<Record<string, string[]>>((acc, [key, question]) => {
          if (acc[key]) {
            return Object.assign(acc, {
              [key]: [...acc[key], question],
            });
          }
          return Object.assign(acc, {
            [key]: [question],
          });
        }, {}),
    ),
  );
  return (
    <Paper
      component={'section'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      title={'Table of content'}
    >
      <List>
        {indexes.map(([group, groupQuestions]) => {
          return (
            <ListItem key={group} title={group}>
              <Box component={'section'}>
                <Typography component={'header'} variant={'h5'}>
                  {group}
                </Typography>
                <List
                  sx={{
                    paddingY: 0,
                  }}
                >
                  {groupQuestions.map(groupQuestion => {
                    return (
                      <ListItem
                        key={calculateIdFromQuestion(groupQuestion)}
                        sx={{ pl: 6 }}
                      >
                        <Link
                          href={`#${calculateIdFromQuestion(groupQuestion)}`}
                          title={groupQuestion}
                        >
                          <ListItemText>
                            <Typography
                              sx={{
                                color: 'text.primary',
                              }}
                              variant={'body1'}
                            >
                              {groupQuestion}
                            </Typography>
                          </ListItemText>
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
