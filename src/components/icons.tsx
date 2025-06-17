import { MessageSquare, Users, RadioTower, Contact, UserCircle, LogOut, Settings, Moon, Sun, Search, Send, Smile, PlusCircle, Image as ImageIcon, Paperclip, ChevronLeft, ChevronRight, Menu, Edit3, Trash2, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

export const Icons = {
  logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 12l6-4" />
      <path d="M12 12l-6-4" />
      <path d="M12 12v6" />
      <path d="M12 12l6 4" />
      <path d="M12 12l-6 4" />
    </svg>
  ),
  chats: MessageSquare,
  groups: Users,
  channels: RadioTower,
  contacts: Contact,
  profile: UserCircle,
  logout: LogOut,
  settings: Settings,
  moon: Moon,
  sun: Sun,
  search: Search,
  send: Send,
  emoji: Smile,
  add: PlusCircle,
  image: ImageIcon,
  attachment: Paperclip,
  back: ChevronLeft,
  next: ChevronRight,
  menu: Menu,
  edit: Edit3,
  delete: Trash2,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

export type IconName = keyof typeof Icons;
