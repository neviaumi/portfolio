import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

import { calculateIdFromQuestion } from './utils.ts';

function QuestionAnswerSection({
  question: { answer, question },
}: {
  question: {
    answer: any;
    question: string;
  };
}) {
  return (
    <Card
      component={'article'}
      id={calculateIdFromQuestion(question)}
      title={question}
    >
      <CardHeader
        slotProps={{
          title: {
            variant: 'h5',
          },
        }}
        slots={{
          title: Typography,
        }}
        title={question}
      />
      <CardContent>
        <Box component={TinaMarkdown} content={answer} />
      </CardContent>
    </Card>
  );
}

export default function QuestionAnswerListingSection({
  questions,
}: {
  questions: {
    answer: string;
    question: string;
  }[];
}) {
  return (
    <Stack spacing={1}>
      {questions.map(question => {
        return (
          <QuestionAnswerSection
            key={calculateIdFromQuestion(question.question)}
            question={question}
          />
        );
      })}
    </Stack>
  );
}
