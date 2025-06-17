import type { IconName } from "@/components/icons";

export interface NavLink {
  href: string;
  label: string;
  icon: IconName;
  tooltip: string;
  subLinks?: NavLink[];
}

export const mainNavLinks: NavLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "chats", // Using 'chats' icon for Dashboard as it's the main chat list
    tooltip: "Dashboard & Chats",
  },
  {
    href: "/groups",
    label: "Groups",
    icon: "groups",
    tooltip: "Group Chats",
  },
  {
    href: "/channels",
    label: "Channels",
    icon: "channels",
    tooltip: "Channels",
  },
  {
    href: "/contacts",
    label: "Contacts",
    icon: "contacts",
    tooltip: "Your Contacts",
  },
];

export const userNavLinks: NavLink[] = [
   {
    href: "/profile",
    label: "Profile",
    icon: "profile",
    tooltip: "Your Profile",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "settings",
    tooltip: "App Settings",
  },
   {
    href: "/auth/login", // Mock logout
    label: "Logout",
    icon: "logout",
    tooltip: "Log Out",
  },
];
