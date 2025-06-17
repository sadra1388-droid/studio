import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

// Mock data - replace with actual data fetching
const mockContacts = [
  { id: '1', name: 'Alice Wonderland', online: true, avatarUrl: 'https://placehold.co/100x100.png?c=1', dataAiHint: "woman face" },
  { id: '2', name: 'Bob The Builder', online: false, avatarUrl: 'https://placehold.co/100x100.png?c=2', dataAiHint: "man portrait" },
  { id: '3', name: 'Carol Danvers', online: true, avatarUrl: 'https://placehold.co/100x100.png?c=3', dataAiHint: "female hero" },
  { id: '4', name: 'David Copperfield', online: false, avatarUrl: 'https://placehold.co/100x100.png?c=4', dataAiHint: "magician illusionist" },
  { id: '5', name: 'Eve Harrington', online: true, avatarUrl: 'https://placehold.co/100x100.png?c=5', dataAiHint: "actress stage" },
];

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold font-headline text-foreground">Contacts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Icons.add className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Contact</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter the phone number or email of the person you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactIdentifier" className="text-right text-foreground">
                  Identifier
                </Label>
                <Input id="contactIdentifier" placeholder="Phone or Email" className="col-span-3 bg-input text-foreground" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Add Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-4">
        <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search contacts..." className="pl-10 bg-input text-foreground focus:ring-accent" />
      </div>

      <Card className="shadow-lg border-primary/10">
        <CardContent className="p-0">
          {mockContacts.length > 0 ? (
            <ul className="divide-y divide-border">
              {mockContacts.map((contact) => (
                <li key={contact.id} className="hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10 border-2 border-primary/30">
                        <AvatarImage src={contact.avatarUrl} alt={contact.name} data-ai-hint={contact.dataAiHint} />
                        <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />
                        )}
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.online ? 'Online' : 'Offline'}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-accent hover:text-accent/80">
                      <Icons.chats className="h-5 w-5" />
                      <span className="sr-only">Chat with {contact.name}</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <Icons.contacts className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium text-foreground">No Contacts Yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Add contacts to start connecting.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
