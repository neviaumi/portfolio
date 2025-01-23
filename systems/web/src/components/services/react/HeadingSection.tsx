import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function HeadingSection() {
  return (
    <Paper
      sx={{
        paddingX: 4,
        paddingY: 1,
      }}
    >
      <Typography component="p" variant="body1">
        {`While I prefer long-term team-based projects, I also accept short-term projects. Below is my approach to working on short-term engagements:"`}
      </Typography>
      <ul>
        <Typography component="li" variant="body1">
          Introduction Call: Book an initial consultation via Calendly.
        </Typography>
        <Typography component="li" variant="body1">
          Requirement Analysis: I will analyze your requirements, estimate
          timelines, and confirm implementation details.
        </Typography>
        <Typography component="li" variant="body1">
          Upfront Payment: Payment is required upfront, ranging from 1 to 4
          working days, depending on the project scope.
        </Typography>
        <Typography component="li" variant="body1">
          Progress Updates: I will aim to provide updates and discussions every
          1–2 weeks until the project is complete.
        </Typography>
      </ul>
      <Typography component="p" gutterBottom variant="body1">
        {`When booking a call, please include a brief introduction with key details about your project. Clear descriptions help streamline the process and ensure effective collaboration.`}
      </Typography>
      <Typography component="h1" variant="h5">
        {`Examples of Project Descriptions`}
      </Typography>
      <Typography component="h2" variant="h6">
        {`Bad Example:`}
      </Typography>
      <Typography component="p" variant="body1">
        {`"Hi David, I want to build a website to sell my goods. Let’s discuss."`}
      </Typography>
      <Typography component="h2" variant="h6">
        {`Good Example:`}
      </Typography>
      <Typography component="p" gutterBottom variant="body1">
        {`"Hi David, I want to build an online shop with features like product listing, stock control, order management, payment integration, and an insight dashboard. My store currently has 16 products. Let’s discuss further."`}
      </Typography>
      <Typography component="p" variant="body1">
        To help refine your project description, you can use the following
        ChatGPT prompt template: <br />
        &#34;You are writing a description for an outsourced developer about the
        software you need. Here is the current description: <br />
        ```text
        <br />
        {'{{your description here}}'}
        <br />
        ``` <br />
        Please summarize it in 512 words or less to make it clear and concise
        for the developer.&#34;
      </Typography>
    </Paper>
  );
}
