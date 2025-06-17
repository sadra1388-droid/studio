import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold font-headline text-foreground">Account Settings</CardTitle>
          <CardDescription className="text-muted-foreground">Manage your account preferences and settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-border bg-card">
            <div>
              <Label htmlFor="change-password_btn" className="font-medium text-foreground">Change Password</Label>
              <p className="text-xs text-muted-foreground">Update your account password regularly for security.</p>
            </div>
            <Button id="change-password_btn" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-border bg-card">
            <div>
              <Label htmlFor="two-factor-auth" className="font-medium text-foreground">Two-Factor Authentication</Label>
              <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
            </div>
            <Switch id="two-factor-auth" className="data-[state=checked]:bg-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold font-headline text-foreground">Notification Settings</CardTitle>
          <CardDescription className="text-muted-foreground">Control how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-border bg-card">
            <div>
              <Label htmlFor="desktop-notifications" className="font-medium text-foreground">Desktop Notifications</Label>
              <p className="text-xs text-muted-foreground">Receive notifications on your computer.</p>
            </div>
            <Switch id="desktop-notifications" defaultChecked className="data-[state=checked]:bg-primary" />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-border bg-card">
            <div>
              <Label htmlFor="message-previews" className="font-medium text-foreground">Show Message Previews</Label>
              <p className="text-xs text-muted-foreground">Display message content in notifications.</p>
            </div>
            <Switch id="message-previews" defaultChecked className="data-[state=checked]:bg-primary" />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-border bg-card">
            <div>
              <Label htmlFor="notification-sounds" className="font-medium text-foreground">Notification Sounds</Label>
              <p className="text-xs text-muted-foreground">Play a sound for new notifications.</p>
            </div>
            <Switch id="notification-sounds" className="data-[state=checked]:bg-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold font-headline text-foreground">Privacy Settings</CardTitle>
          <CardDescription className="text-muted-foreground">Manage your privacy and data sharing options.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-border bg-card">
            <div>
              <Label htmlFor="read-receipts" className="font-medium text-foreground">Read Receipts</Label>
              <p className="text-xs text-muted-foreground">Allow others to see when you've read their messages.</p>
            </div>
            <Switch id="read-receipts" defaultChecked className="data-[state=checked]:bg-primary" />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-border bg-card">
            <div>
              <Label htmlFor="activity-status" className="font-medium text-foreground">Show Activity Status</Label>
              <p className="text-xs text-muted-foreground">Let your contacts see when you're active.</p>
            </div>
            <Switch id="activity-status" defaultChecked className="data-[state=checked]:bg-primary"/>
          </div>
        </CardContent>
      </Card>
       <div className="pt-4 text-center">
         <Button variant="destructive" className="bg-destructive/80 hover:bg-destructive text-destructive-foreground">
            <Icons.delete className="mr-2 h-4 w-4" /> Delete Account
          </Button>
          <p className="text-xs text-muted-foreground mt-2">This action is irreversible and will permanently delete your account and all associated data.</p>
      </div>
    </div>
  );
}
