"use client";

import * from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { EmojiSuggestionButton } from "./emoji-suggestion-button";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="relative flex items-end space-x-2">
        <Textarea
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 resize-none rounded-xl border-2 border-input bg-input p-3 pr-20 min-h-[48px] max-h-[120px] text-foreground focus:border-primary focus-visible:ring-primary/50"
          rows={1}
          disabled={disabled}
        />
        <div className="absolute right-14 bottom-1.5 flex items-center">
           <EmojiSuggestionButton messageText={message} onEmojiSelect={handleEmojiSelect} disabled={disabled} />
           <Button type="button" variant="ghost" size="icon" className="text-accent hover:text-accent/80" disabled={disabled} aria-label="Attach file">
             <Icons.attachment className="h-5 w-5" />
           </Button>
        </div>
        <Button
            type="button"
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3 h-10 w-10 aspect-square self-end"
            aria-label="Send message"
        >
            <Icons.send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
