import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Teuron MiniApp',
  description: 'Earn Teuron Points by tapping and completing tasks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
          <Link href="/" className="text-sm">Home</Link>
          <Link href="/tasks" className="text-sm">Tasks</Link>
          <Link href="/referrals" className="text-sm">Referrals</Link>
          <Link href="/user" className="text-sm">User</Link>
        </nav>
      </body>
    </html>
  );
}
