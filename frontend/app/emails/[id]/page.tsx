// app/emails/[id]/page.tsx
import { emailAPI } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function EmailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const email = await emailAPI.getOne(id);

  if (!email) return notFound();

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">{email.subject}</h1>
      <div className="text-sm text-gray-600">From: {email.sender}</div>
      <div className="text-sm text-gray-600">Priority: {email.priority}</div>
      <div className="mt-4">{email.body}</div>
      <Link href="/">
        <button className="px-2 py-1 rounded bg-blue-400 text-white">back to all emails</button>
      </Link>
    </div>
  );
}
