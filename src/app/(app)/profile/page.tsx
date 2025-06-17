import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "User Name",
    email: "user@connectify.app",
    phone: "+1 234 567 8900",
    bio: "Lover of tech, coffee, and connecting with amazing people. Building the future, one line of code at a time. 🚀",
    avatarUrl: "https://placehold.co/200x200.png",
    dataAiHint: "profile avatar",
    memberSince: "January 15, 2023",
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card className="shadow-xl border-primary/20 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-accent" />
        <CardHeader className="flex flex-col items-center text-center -mt-16">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
            <AvatarFallback className="text-4xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-3xl font-bold font-headline text-foreground">{user.name}</CardTitle>
          <CardDescription className="text-accent">{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 space-y-6 px-6 pb-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
            <p className="mt-1 text-foreground">{user.bio}</p>
          </div>
          
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
              <p className="mt-1 text-foreground">{user.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
              <p className="mt-1 text-foreground">{user.memberSince}</p>
            </div>
          </div>

          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Edit Profile</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
                  <Input id="name" defaultValue={user.name} className="mt-1 bg-input text-foreground" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user.email} className="mt-1 bg-input text-foreground" />
                </div>
              </div>
               <div>
                  <Label htmlFor="phone" className="text-muted-foreground">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue={user.phone} className="mt-1 bg-input text-foreground" />
                </div>
              <div>
                <Label htmlFor="bio" className="text-muted-foreground">Bio</Label>
                <textarea id="bio" defaultValue={user.bio} rows={3} className="mt-1 w-full rounded-md border border-input bg-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-foreground" />
              </div>
              <div>
                <Label htmlFor="avatar" className="text-muted-foreground">Profile Picture</Label>
                <Input id="avatar" type="file" className="mt-1 bg-input text-foreground file:text-accent file:border-accent file:hover:bg-accent/10" />
                <p className="text-xs text-muted-foreground mt-1">Upload a new profile picture (PNG, JPG, GIF up to 5MB).</p>
              </div>
            </form>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border px-6 py-4">
          <Button className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground">
            <Icons.edit className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
