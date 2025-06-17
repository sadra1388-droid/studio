"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function CreateChannelPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [channelAvatarPreview, setChannelAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setChannelAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: "Channel Created!",
      description: `Channel "${channelName}" has been successfully created.`,
    });
    router.push('/channels'); // Redirect to channels list or the new channel page
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl border-primary/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Icons.channels className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-semibold font-headline text-foreground">Create New Channel</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Start a new channel for announcements or topic-based discussions.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="channel-name" className="text-foreground">Channel Name</Label>
              <Input 
                id="channel-name" 
                placeholder="e.g., Company News" 
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                required 
                className="bg-input text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel-description" className="text-foreground">Channel Description (Optional)</Label>
              <Textarea 
                id="channel-description" 
                placeholder="What is this channel about?"
                value={channelDescription}
                onChange={(e) => setChannelDescription(e.target.value)}
                className="bg-input text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel-avatar" className="text-foreground">Channel Avatar (Optional)</Label>
              <Input 
                id="channel-avatar" 
                type="file" 
                accept="image/*"
                onChange={handleAvatarChange}
                className="bg-input text-foreground file:text-accent file:border-accent file:hover:bg-accent/10"
              />
              {channelAvatarPreview && (
                <div className="mt-2">
                  <Image 
                    src={channelAvatarPreview} 
                    alt="Channel avatar preview" 
                    width={100} 
                    height={100} 
                    className="rounded-lg object-cover border-2 border-accent"
                    data-ai-hint="channel avatar" 
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
                <Label className="text-foreground">Channel Type (Coming Soon)</Label>
                <p className="text-sm text-muted-foreground">Options for public/private channels will be available soon.</p>
            </div>

          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading} className="mr-auto text-foreground">
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading || !channelName}>
              {isLoading ? (
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : <Icons.add className="mr-2 h-4 w-4" />}
              Create Channel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
