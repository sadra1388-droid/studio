"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import { mainNavLinks, userNavLinks } from "@/lib/nav-links"; // Ensure correct path

function getPageTitle(pathname: string): string {
  const allLinks = [...mainNavLinks, ...userNavLinks];
  const currentLink = allLinks.find(link => pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
  if (currentLink) {
    return currentLink.label;
  }
  if (pathname.startsWith('/chats/')) return "Chat";
  if (pathname.startsWith('/groups/')) return "Group Chat";
  if (pathname.startsWith('/channels/')) return "Channel";
  // Add more specific cases if needed for dynamic routes
  return "Connectify";
}


export function AppHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <SidebarTrigger className="md:hidden mr-2 text-accent hover:text-accent/80" />
          <h1 className="text-xl font-semibold font-headline text-foreground">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-accent hover:text-accent/80">
            <Icons.search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          {/* Mock notifications */}
          <Button variant="ghost" size="icon" className="relative text-accent hover:text-accent/80">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
