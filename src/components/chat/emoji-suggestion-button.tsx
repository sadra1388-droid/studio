"use client";

import * from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { suggestEmojisAction } from "@/app/actions/suggest-emojis-action";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface EmojiSuggestionButtonProps {
  messageText: string;
  onEmojiSelect: (emoji: string) => void;
  disabled?: boolean;
}

export function EmojiSuggestionButton({ messageText, onEmojiSelect, disabled }: EmojiSuggestionButtonProps) {
  const [suggestedEmojis, setSuggestedEmojis] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const { toast } = useToast();

  const handleSuggestEmojis = async () => {
    if (!messageText.trim()) {
      toast({
        title: "Cannot Suggest Emojis",
        description: "Please type a message first.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setPopoverOpen(true); // Open popover when suggestions are requested
    const result = await suggestEmojisAction({ message: messageText });
    setIsLoading(false);
    if (result.error) {
      toast({
        title: "Emoji Suggestion Failed",
        description: result.error,
        variant: "destructive",
      });
      setSuggestedEmojis([]);
    } else {
      setSuggestedEmojis(result.emojis || []);
      if (!result.emojis || result.emojis.length === 0) {
        toast({
          title: "No Emojis Suggested",
          description: "Try a different message or check back later.",
        });
      }
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleSuggestEmojis}
          disabled={disabled || isLoading || !messageText.trim()}
          className="text-accent hover:text-accent/80 disabled:text-muted-foreground"
          aria-label="Suggest Emojis"
        >
          <Icons.emoji className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 bg-card border-primary/20">
        {isLoading ? (
          <div className="flex space-x-2 p-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        ) : suggestedEmojis.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {suggestedEmojis.map((emoji, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={() => {
                  onEmojiSelect(emoji);
                  setPopoverOpen(false); // Close popover after selection
                }}
                className="text-2xl hover:bg-accent/20"
                aria-label={`Select emoji ${emoji}`}
              >
                {emoji}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground p-2">No suggestions. Try typing a message!</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
