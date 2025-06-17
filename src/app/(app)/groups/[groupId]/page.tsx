import { ChatInterface } from '@/components/chat/chat-interface';
import type { Message } from '@/components/chat/message-item';

// Mock data fetching function
async function getGroupDetails(groupId: string) {
  await new Promise(resolve => setTimeout(resolve, 50)); 
  
  const allGroupsData: { [key: string]: any } = {
    'g1': { name: 'Weekend Warriors', avatarUrl: 'https://placehold.co/100x100.png?g=1', dataAiHint: "group friends" },
    'g2': { name: 'Book Club', avatarUrl: 'https://placehold.co/100x100.png?g=2', dataAiHint: "books study" },
    'g3': { name: 'Project Connectify Team', avatarUrl: 'https://placehold.co/100x100.png?g=3', dataAiHint: "team collaboration" },
  };

  const group = allGroupsData[groupId];
  if (!group) return null;

  const messages: Message[] = [
    { id: 'gm1', sender: { id: 'userAlice', name: 'Alice', avatarUrl: 'https://placehold.co/100x100.png?a=1', dataAiHint: "woman face" }, content: `Welcome to ${group.name}!`, timestamp: '09:00 AM', isOwnMessage: false },
    { id: 'gm2', sender: { id: 'userBob', name: 'Bob', avatarUrl: 'https://placehold.co/100x100.png?b=1', dataAiHint: "man portrait" }, content: 'Glad to be here!', timestamp: '09:01 AM', isOwnMessage: false },
    { id: 'gm3', sender: { id: 'currentUser123', name: 'You', avatarUrl: 'https://placehold.co/100x100.png?self=1', dataAiHint: "self portrait" }, content: `Hello everyone in ${group.name}!`, timestamp: '09:02 AM', isOwnMessage: true },
  ];

  return {
    name: group.name,
    avatarUrl: group.avatarUrl,
    dataAiHint: group.dataAiHint,
    messages
  };
}

export default async function GroupChatPage({ params }: { params: { groupId: string } }) {
  const groupDetails = await getGroupDetails(params.groupId);

  if (!groupDetails) {
    return <div className="p-4 text-center text-destructive-foreground">Group not found.</div>;
  }

  return (
    <ChatInterface
      chatId={params.groupId}
      chatName={groupDetails.name}
      chatAvatarUrl={groupDetails.avatarUrl}
      chatAvatarHint={groupDetails.dataAiHint}
      chatType="group"
      initialMessages={groupDetails.messages}
    />
  );
}
