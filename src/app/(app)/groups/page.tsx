import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

// Mock data
const mockGroups = [
  { id: 'g1', name: 'Weekend Warriors', lastMessage: 'Sarah: Anyone up for hiking?', unreadCount: 3, members: 5, avatarUrl: 'https://placehold.co/100x100.png?g=1', dataAiHint: "group friends" },
  { id: 'g2', name: 'Book Club', lastMessage: 'Just finished the latest chapter!', unreadCount: 0, members: 12, avatarUrl: 'https://placehold.co/100x100.png?g=2', dataAiHint: "books study" },
  { id: 'g3', name: 'Project Connectify Team', lastMessage: 'Meeting reminder for 3 PM.', unreadCount: 1, members: 8, avatarUrl: 'https://placehold.co/100x100.png?g=3', dataAiHint: "team collaboration" },
];

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-headline text-foreground">Groups</h2>
        <Link href="/groups/create">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Icons.add className="mr-2 h-4 w-4" /> Create Group
          </Button>
        </Link>
      </div>

      {mockGroups.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockGroups.map((group) => (
            <Card key={group.id} className="shadow-lg hover:shadow-primary/20 transition-shadow border-primary/10">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar className="h-12 w-12 border-2 border-primary/50">
                  <AvatarImage src={group.avatarUrl} alt={group.name} data-ai-hint={group.dataAiHint} />
                  <AvatarFallback>{group.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg text-foreground">{group.name}</CardTitle>
                  <CardDescription className="text-xs">{group.members} members</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground h-10 overflow-hidden">{group.lastMessage}</p>
                <div className="mt-4 flex justify-between items-center">
                  {group.unreadCount > 0 && (
                    <Badge variant="default" className="bg-primary text-primary-foreground">{group.unreadCount} unread</Badge>
                  )}
                  <Link href={`/groups/${group.id}`} passHref>
                    <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      Open Group
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-10 border-dashed border-primary/20">
          <CardHeader>
            <Icons.groups className="mx-auto h-12 w-12 text-muted-foreground" />
            <CardTitle className="mt-4 text-xl font-semibold">No Groups Yet</CardTitle>
            <CardDescription className="mt-2 text-sm text-muted-foreground">
              Create a new group or get invited to one to start collaborating.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Link href="/groups/create">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Icons.add className="mr-2 h-4 w-4" /> Create New Group
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
