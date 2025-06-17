'use server';
import { suggestEmojis as genkitSuggestEmojis, type SuggestEmojisInput, type SuggestEmojisOutput } from '@/ai/flows/suggest-emojis';

export async function suggestEmojisAction(input: SuggestEmojisInput): Promise<SuggestEmojisOutput | { error: string; emojis: [] }> {
  try {
    // Basic input validation (example)
    if (!input.message || input.message.trim().length === 0) {
      return { error: "Message content cannot be empty.", emojis: [] };
    }
    if (input.message.length > 500) { // Arbitrary limit
        return { error: "Message is too long for emoji suggestion.", emojis: [] };
    }

    const result = await genkitSuggestEmojis(input);
    
    // Ensure emojis array is always present, even if empty
    return { ...result, emojis: result.emojis || [] };

  } catch (error) {
    console.error("Error in suggestEmojisAction:", error);
    // Return a structured error response
    return { error: "Failed to suggest emojis due to an internal error.", emojis: [] };
  }
}
