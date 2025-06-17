import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/auth/login');
  return null; // redirect() throws an error, so this won't be reached
}
