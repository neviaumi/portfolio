import Fastify from 'fastify';

import * as openAI from './open-ai.js';

const PORT = process.env['PROMPT_API_PORT'];
if (!PORT) throw new Error(`PROMPT_API_PORT is undefined`);

const fastify = Fastify();

/**
 * API route to handle prompt requests.
 * This builds the prompts using the OpenAI functions and sends the results back to the client.
 */
fastify.post('/api/ai-assistant/prompt', async (request, reply) => {
  try {
    // Create custom prompts from user input
    const { prompts } = request.body;

    if (!prompts) {
      return reply.status(400).send({ error: 'prompts is required' });
    }

    const basePrompts =
      await openAI.withPromptThatInstructOnlyResponseToQuestion(
        openAI.loadPortfolioIntoPrompts,
      )();
    const newPrompts = basePrompts.concat(prompts);

    // Send the prompt
    const aiResponsePrompts = await openAI.prompt(newPrompts);
    const userPromptStartedAt = newPrompts.findIndex(p => p.meta !== undefined);
    return reply
      .status(200)
      .send({ prompts: aiResponsePrompts.slice(userPromptStartedAt) });
  } catch (error) {
    console.error('Error generating home summary:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
});

await fastify.listen({ host: '0.0.0.0', port: PORT });
console.log(`Server running at http://localhost:${PORT}`);
