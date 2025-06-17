import { ChatInterface } from '@/components/chat/chat-interface';
import type { Message } from '@/components/chat/message-item';

// Mock data fetching function
async function getChatDetails(chatId: string) {
  // In a real app, fetch this from your backend
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
  
  const allChatsData: { [key: string]: any } = {
    '1': { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png?a=1', dataAiHint: "woman face", type: 'dm' },
    '2': { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/100x100.png?a=2', dataAiHint: "man portrait", type: 'dm' },
    '3': { name: 'Tech Innovators Group', avatarUrl: 'https://placehold.co/100x100.png?a=3', dataAiHint: "team work", type: 'group' },
    '4': { name: 'Carol Danvers', avatarUrl: 'https://placehold.co/100x100.png?a=4', dataAiHint: "female hero", type: 'dm' },
  };

  const chat = allChatsData[chatId];
  if (!chat) return null;

  const messages: Message[] = [
    { id: 'm1', sender: { id: 'user2', name: chat.name, avatarUrl: chat.avatarUrl, dataAiHint: chat.dataAiHint }, content: 'Hey there! How are you doing?', timestamp: '10:30 AM', isOwnMessage: false },
    { id: 'm2', sender: { id: 'currentUser123', name: 'You', avatarUrl: 'https://placehold.co/100x100.png?self=1', dataAiHint: "self portrait" }, content: 'Hi! I am good, thanks for asking. What about you?', timestamp: '10:31 AM', isOwnMessage: true },
    { id: 'm3', sender: { id: 'user2', name: chat.name, avatarUrl: chat.avatarUrl, dataAiHint: chat.dataAiHint }, content: 'Doing great! Just working on some new features for Connectify.', timestamp: '10:32 AM', isOwnMessage: false },
  ];
  
  if (chat.type === 'group') {
     messages.push({ id: 'm4', sender: { id: 'user3', name: 'Charlie Brown', avatarUrl: 'https://placehold.co/100x100.png?charlie=1', dataAiHint: "cartoon character" }, content: 'Awesome! Can\'t wait to see them.', timestamp: '10:33 AM', isOwnMessage: false });
  }


  return {
    name: chat.name,
    avatarUrl: chat.avatarUrl,
    dataAiHint: chat.dataAiHint,
    type: chat.type,
    messages
  };
}


export default async function ChatPage({ params }: { params: { chatId: string } }) {
  const chatDetails = await getChatDetails(params.chatId);

  if (!chatDetails) {
    return <div className="p-4 text-center text-destructive-foreground">Chat not found.</div>;
  }

  return (
    <ChatInterface
      chatId={params.chatId}
      chatName={chatDetails.name}
      chatAvatarUrl={chatDetails.avatarUrl}
      chatAvatarHint={chatDetails.dataAiHint}
      chatType={chatDetails.type as "dm" | "group" | "channel"}
      initialMessages={chatDetails.messages}
    />
  );
}
