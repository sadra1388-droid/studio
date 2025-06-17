import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-primary/20 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors">
          <Icons.logo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline">Connectify</span>
        </Link>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Connectify. All rights reserved.
      </footer>
    </div>
  );
}
