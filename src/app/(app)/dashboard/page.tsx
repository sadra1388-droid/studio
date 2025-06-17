import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

// Mock data - replace with actual data fetching
const mockChats = [
  { id: '1', name: 'Alice Wonderland', lastMessage: 'Hey, how are you?', unreadCount: 2, avatarUrl: 'https://placehold.co/100x100.png?a=1', timestamp: '10:30 AM', dataAiHint: "woman face" },
  { id: '2', name: 'Bob The Builder', lastMessage: 'Meeting at 2 PM.', unreadCount: 0, avatarUrl: 'https://placehold.co/100x100.png?a=2', timestamp: 'Yesterday', dataAiHint: "man portrait" },
  { id: '3', name: 'Tech Innovators Group', lastMessage: 'Charlie: Check out this new AI tool!', unreadCount: 5, avatarUrl: 'https://placehold.co/100x100.png?a=3', timestamp: 'Mon', isGroup: true, dataAiHint: "team work" },
  { id: '4', name: 'Carol Danvers', lastMessage: 'Sounds good!', unreadCount: 0, avatarUrl: 'https://placehold.co/100x100.png?a=4', timestamp: 'Sun', dataAiHint: "female hero" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-headline text-foreground">Chats</h2>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Icons.add className="mr-2 h-4 w-4" /> New Chat
        </Button>
      </div>

      <Card className="shadow-lg border-primary/10">
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {mockChats.map((chat) => (
              <li key={chat.id}>
                <Link href={`/chats/${chat.id}`} className="block hover:bg-muted/50 transition-colors">
                  <div className="flex items-center p-4 space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/50">
                      <AvatarImage src={chat.avatarUrl} alt={chat.name} data-ai-hint={chat.dataAiHint} />
                      <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">{chat.name}</p>
                        <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground truncate flex-1 pr-2">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <Badge variant="default" className="bg-primary text-primary-foreground h-5 px-2 text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {mockChats.length === 0 && (
         <Card className="text-center py-10 border-dashed border-primary/20">
          <CardHeader>
            <Icons.chats className="mx-auto h-12 w-12 text-muted-foreground" />
            <CardTitle className="mt-4 text-xl font-semibold">No Chats Yet</CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              Start a new conversation or add contacts to begin chatting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Icons.add className="mr-2 h-4 w-4" /> Start New Chat
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
