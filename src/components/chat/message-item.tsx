import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatarUrl: string;
    dataAiHint?: string;
  };
  content: string;
  timestamp: string;
  isOwnMessage: boolean;
}

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={cn(
        "flex items-end space-x-3 py-3 px-2 group",
        message.isOwnMessage ? "justify-end" : "justify-start"
      )}
    >
      {!message.isOwnMessage && (
        <Avatar className="h-8 w-8 self-start border border-primary/30">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} data-ai-hint={message.sender.dataAiHint} />
          <AvatarFallback>{message.sender.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-xs lg:max-w-md p-3 rounded-xl shadow-md",
          message.isOwnMessage
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none border border-border"
        )}
      >
        {!message.isOwnMessage && (
          <p className="text-xs font-semibold text-accent mb-1">{message.sender.name}</p>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <p
          className={cn(
            "text-xs mt-1.5 opacity-70",
            message.isOwnMessage ? "text-right" : "text-left"
          )}
        >
          {message.timestamp}
        </p>
      </div>
      {message.isOwnMessage && (
        <Avatar className="h-8 w-8 self-start border border-primary/30">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} data-ai-hint={message.sender.dataAiHint} />
          <AvatarFallback>{message.sender.name.substring(0, 1)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
