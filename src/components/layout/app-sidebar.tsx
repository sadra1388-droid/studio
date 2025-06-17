"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mainNavLinks, userNavLinks, type NavLink } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  const renderNavLink = (link: NavLink, index: number) => {
    const IconComponent = Icons[link.icon];
    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
    
    return (
      <SidebarMenuItem key={`${link.label}-${index}`}>
        <Link href={link.href} passHref legacyBehavior>
          <SidebarMenuButton
            className={cn(
              "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
            )}
            isActive={isActive}
            tooltip={{ children: link.tooltip, className: "bg-popover text-popover-foreground border-border" }}
          >
            <IconComponent className={cn("h-5 w-5", isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground group-hover/menu-button:text-sidebar-accent-foreground")} />
            <span>{link.label}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4 flex flex-col items-center group-data-[collapsible=icon]:items-center">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Icons.logo className="h-8 w-8 text-primary transition-all duration-300 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
          <span className="font-bold text-xl font-headline text-foreground transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hidden">
            Connectify
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-grow p-2">
        <SidebarMenu>
          {mainNavLinks.map(renderNavLink)}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-2">
         <SidebarMenu>
          {userNavLinks.slice(0, -1).map(renderNavLink)} {/* Profile and Settings */}
        </SidebarMenu>
        <SidebarSeparator className="my-2"/>
        <SidebarMenuItem>
          <Link href="/auth/login" passHref legacyBehavior>
            <SidebarMenuButton
              className="text-sidebar-foreground hover:bg-destructive/20 hover:text-red-400"
              tooltip={{ children: "Log Out", className: "bg-popover text-popover-foreground border-border"}}
            >
              <Icons.logout className="h-5 w-5 text-sidebar-foreground group-hover/menu-button:text-red-400" />
              <span>Logout</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>

        <div className="mt-4 p-2 flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="transition-opacity duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-sm text-foreground">User Name</p>
            <p className="text-xs text-muted-foreground">user@connectify.app</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
