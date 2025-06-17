import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

// Mock data
const mockChannels = [
  { id: 'c1', name: 'Company Announcements', description: 'Official updates and news from Connectify HQ.', subscribers: 150, avatarUrl: 'https://placehold.co/100x100.png?ch=1', dataAiHint: "megaphone announcement" },
  { id: 'c2', name: 'Tech News Daily', description: 'Your daily dose of technology news and trends.', subscribers: 2056, avatarUrl: 'https://placehold.co/100x100.png?ch=2', dataAiHint: "circuit board" },
  { id: 'c3', name: 'Art & Design Inspiration', description: 'Curated content for artists and designers.', subscribers: 873, avatarUrl: 'https://placehold.co/100x100.png?ch=3', dataAiHint: "paint palette" },
];

export default function ChannelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-headline text-foreground">Channels</h2>
        <Link href="/channels/create">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Icons.add className="mr-2 h-4 w-4" /> Create Channel
          </Button>
        </Link>
      </div>

      {mockChannels.length > 0 ? (
        <div className="space-y-4">
          {mockChannels.map((channel) => (
            <Card key={channel.id} className="shadow-lg hover:shadow-primary/20 transition-shadow border-primary/10">
              <CardContent className="p-4 flex items-center space-x-4">
                <Avatar className="h-16 w-16 rounded-lg border-2 border-primary/50">
                  <AvatarImage src={channel.avatarUrl} alt={channel.name} data-ai-hint={channel.dataAiHint} />
                  <AvatarFallback>{channel.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground">{channel.name}</CardTitle>
                  <CardDescription className="text-sm mt-1 line-clamp-2">{channel.description}</CardDescription>
                  <div className="mt-2 flex items-center justify-between">
                     <Badge variant="secondary" className="text-xs">{channel.subscribers.toLocaleString()} subscribers</Badge>
                     <Link href={`/channels/${channel.id}`} passHref>
                        <Button variant="link" size="sm" className="text-accent hover:text-accent/80 px-0">
                            View Channel <Icons.next className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
         <Card className="text-center py-10 border-dashed border-primary/20">
          <CardHeader>
            <Icons.channels className="mx-auto h-12 w-12 text-muted-foreground" />
            <CardTitle className="mt-4 text-xl font-semibold">No Channels Yet</CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              Create a new channel or subscribe to existing ones to stay updated.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Link href="/channels/create">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Icons.add className="mr-2 h-4 w-4" /> Create New Channel
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
