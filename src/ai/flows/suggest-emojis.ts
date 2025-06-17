'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant emojis based on message content.
 *
 * The flow uses a prompt to analyze the message and suggest a set of emojis that would be appropriate reactions.
 * It exports:
 *   - suggestEmojis: The main function to call to get emoji suggestions.
 *   - SuggestEmojisInput: The type definition for the input to suggestEmojis.
 *   - SuggestEmojisOutput: The type definition for the output of suggestEmojis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEmojisInputSchema = z.object({
  message: z.string().describe('The content of the message to suggest emojis for.'),
});
export type SuggestEmojisInput = z.infer<typeof SuggestEmojisInputSchema>;

const SuggestEmojisOutputSchema = z.object({
  emojis: z.array(z.string()).describe('An array of suggested emojis for the message.'),
});
export type SuggestEmojisOutput = z.infer<typeof SuggestEmojisOutputSchema>;

export async function suggestEmojis(input: SuggestEmojisInput): Promise<SuggestEmojisOutput> {
  return suggestEmojisFlow(input);
}

const suggestEmojisPrompt = ai.definePrompt({
  name: 'suggestEmojisPrompt',
  input: {schema: SuggestEmojisInputSchema},
  output: {schema: SuggestEmojisOutputSchema},
  prompt: `You are an AI assistant designed to suggest emojis for text messages.

  Given the following message, suggest up to 5 relevant emojis that could be used as reactions or to enhance the message.
  Return the emojis as a JSON array of strings.

  Message: "{{message}}"`,
});

const suggestEmojisFlow = ai.defineFlow(
  {
    name: 'suggestEmojisFlow',
    inputSchema: SuggestEmojisInputSchema,
    outputSchema: SuggestEmojisOutputSchema,
  },
  async input => {
    const {output} = await suggestEmojisPrompt(input);
    return output!;
  }
);
