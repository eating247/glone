// app/EmailList.tsx
'use client';

import { useEffect, useState } from 'react';
import { Email } from '@/types/email';
import { emailAPI } from '@/lib/api';
import Link from 'next/link';

const PRIORITY_LABELS = {
    ALL: 'All',
    URGENT: 'Urgent',
    HIGH: 'High',
    NORMAL: 'Normal',
    LOW: 'Low',
  } as const;
  

type PriorityFilter = keyof typeof PRIORITY_LABELS;

export default function EmailList() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('ALL');

  useEffect(() => {
    async function loadEmails() {
      try {
        const data = await emailAPI.fetchAll();
        setEmails(data);
      } catch (err: any) {
        setError(err.message || 'Error loading emails');
      }
    }

    loadEmails();
  }, []);

  async function handleToggleStar(id: number) {
    try {
      await emailAPI.toggleStar(id);
      setEmails((prev) =>
        prev.map((email) =>
          email.id === id ? { ...email, starred: !email.starred } : email
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to toggle star');
    }
  }

  async function handleDelete(id: number) {
    try {
      await emailAPI.delete(id);
      setEmails((prev) => prev.filter((email) => email.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete email');
    }
  }

  const filteredEmails =
    priorityFilter === 'ALL'
        ? emails
        : emails.filter((email) => email.priority === priorityFilter);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
        {/* Priority Dropdown */}
        <select
        id="priority-filter"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
        className="border rounded px-2 py-1"
        >
        {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
            {label}
            </option>
        ))}
        </select>

        {/* Email List */}
      {filteredEmails.map((email) => (
        <Link href={`/emails/${email.id}`} key={email.id}>
            <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center">
                <strong>{email.sender}</strong>
                <span className="text-sm text-gray-500">{email.timestamp}</span>
            </div>
            <div className="font-semibold">{email.subject}</div>
            <div className="text-sm text-gray-600">
                <span className="capitalize">{email.priority}</span>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleToggleStar(email.id)}}
                    className={`px-2 py-1 rounded ${
                        email.starred ? 'bg-yellow-300' : 'bg-gray-200'
                    }`}
                    >
                    {email.starred ? 'Unstar' : 'Star'}
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(email.id)}}
                    className="px-2 py-1 rounded bg-red-400 text-white"
                    >
                    Delete
                </button>
            </div>
            </div>
        </Link>
      ))}
    </div>
  );
}
