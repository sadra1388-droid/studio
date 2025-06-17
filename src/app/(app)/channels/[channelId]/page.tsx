import { ChatInterface } from '@/components/chat/chat-interface';
import type { Message } from '@/components/chat/message-item';

// Mock data fetching function
async function getChannelDetails(channelId: string) {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  const allChannelsData: { [key: string]: any } = {
    'c1': { name: 'Company Announcements', avatarUrl: 'https://placehold.co/100x100.png?ch=1', dataAiHint: "megaphone announcement" },
    'c2': { name: 'Tech News Daily', avatarUrl: 'https://placehold.co/100x100.png?ch=2', dataAiHint: "circuit board" },
    'c3': { name: 'Art & Design Inspiration', avatarUrl: 'https://placehold.co/100x100.png?ch=3', dataAiHint: "paint palette" },
  };

  const channel = allChannelsData[channelId];
  if (!channel) return null;

  const messages: Message[] = [
    { id: 'chm1', sender: { id: 'adminUser', name: 'Connectify Admin', avatarUrl: 'https://placehold.co/100x100.png?admin=1', dataAiHint: "official logo" }, content: `Welcome to the ${channel.name} channel!`, timestamp: 'Yesterday', isOwnMessage: false },
    { id: 'chm2', sender: { id: 'adminUser', name: 'Connectify Admin', avatarUrl: 'https://placehold.co/100x100.png?admin=1', dataAiHint: "official logo" }, content: 'Stay tuned for exciting updates.', timestamp: '11:00 AM', isOwnMessage: false },
    { id: 'chm3', sender: { id: 'adminUser', name: 'Connectify Admin', avatarUrl: 'https://placehold.co/100x100.png?admin=1', dataAiHint: "official logo" }, content: 'New feature X has been launched! Check it out.', timestamp: '02:30 PM', isOwnMessage: false },
  ];
  
  return {
    name: channel.name,
    avatarUrl: channel.avatarUrl,
    dataAiHint: channel.dataAiHint,
    messages
  };
}

export default async function ChannelPage({ params }: { params: { channelId: string } }) {
  const channelDetails = await getChannelDetails(params.channelId);

  if (!channelDetails) {
    return <div className="p-4 text-center text-destructive-foreground">Channel not found.</div>;
  }

  return (
    <ChatInterface
      chatId={params.channelId}
      chatName={channelDetails.name}
      chatAvatarUrl={channelDetails.avatarUrl}
      chatAvatarHint={channelDetails.dataAiHint}
      chatType="channel" // Channels are typically read-only for most users, input might be disabled
      initialMessages={channelDetails.messages}
    />
  );
}
