"use client";
import * from "react";
import { MessageInput } from "./message-input";
import { MessageItem, type Message } from "./message-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface ChatInterfaceProps {
  chatId: string;
  chatName: string;
  chatAvatarUrl?: string;
  chatAvatarHint?: string;
  chatType: "dm" | "group" | "channel";
  initialMessages: Message[];
}

// Mock current user ID
const currentUserId = "currentUser123";

export function ChatInterface({
  chatId,
  chatName,
  chatAvatarUrl,
  chatAvatarHint,
  chatType,
  initialMessages,
}: ChatInterfaceProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        id: currentUserId, // Assume current user is sending
        name: "You", // This would be fetched dynamically
        avatarUrl: "https://placehold.co/100x100.png?self=1",
        dataAiHint: "self portrait"
      },
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwnMessage: true,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    // Simulate receiving a reply for DMs/Groups after a short delay
    if (chatType !== "channel") {
      setTimeout(() => {
        const replyMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          sender: {
            id: `otherUser-${chatId}`,
            name: chatName,
            avatarUrl: chatAvatarUrl || "https://placehold.co/100x100.png?reply=1",
            dataAiHint: chatAvatarHint || "person face"
          },
          content: `Thanks for your message: "${content.substring(0,20)}..."`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwnMessage: false,
        };
        setMessages((prevMessages) => [...prevMessages, replyMessage]);
      }, 1500);
    }

    toast({
        title: "Message Sent!",
        description: `Your message to ${chatName} has been sent.`,
    });
  };

  const isChannelInputDisabled = chatType === "channel"; // Example: only admins can post in channels

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-var(--header-height,4rem)-2rem)] bg-background rounded-lg shadow-xl border border-border overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center p-3 border-b border-border bg-card/80 backdrop-blur-sm">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden text-accent hover:text-accent/80">
          <Icons.back className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10 border-2 border-primary/50">
          <AvatarImage src={chatAvatarUrl} alt={chatName} data-ai-hint={chatAvatarHint} />
          <AvatarFallback>{chatName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h2 className="text-base font-semibold text-foreground">{chatName}</h2>
          <p className="text-xs text-muted-foreground">
            {chatType === "dm" ? "Direct Message" : chatType === "group" ? "Group Chat" : "Channel"}
            {/* You can add online status or member count here */}
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-accent hover:text-accent/80">
            <Icons.search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-accent hover:text-accent/80">
            <Icons.settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 space-y-2 bg-background/50">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Message Input Area */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isChannelInputDisabled}/>
    </div>
  );
}
