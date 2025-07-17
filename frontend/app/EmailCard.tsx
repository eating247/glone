'use client';

import React from 'react';
import { useState, memo } from 'react';
import Link from 'next/link';
import { Email } from '@/types/email';

interface EmailCardProps extends Email {
  onToggleStar: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const EmailCard = memo(function EmailCard({
  id,
  from,
  subject,
  updatedAt,
  priority,
  isStarred,
  onToggleStar,
  onDelete,
}: EmailCardProps) {
  const [error, setError] = useState<string | null>(null);

  const handleToggleStar = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await onToggleStar(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to toggle star';
      setError(errorMessage);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await onDelete(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete email';
      setError(errorMessage);
    }
  };

  return (
    <Link href={`/emails/${id}`} key={id} className="ms-2">
      <div className="border p-4 rounded shadow-sm hover:shadow-md transition">
        <div className="flex justify-between items-center">
          <strong>{from}</strong>
          <span className="text-sm text-gray-500">{updatedAt}</span>
        </div>
        <div className="font-semibold">{subject}</div>
        <div className="text-sm text-gray-600">
          <span className="capitalize">{priority}</span>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleToggleStar}
            className={`px-2 py-1 rounded ${
              isStarred ? 'bg-yellow-300' : 'bg-gray-200'
            }`}
          >
            {isStarred ? 'Unstar' : 'Star'}
          </button>

          <button
            onClick={handleDelete}
            className="px-2 py-1 rounded bg-red-400 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
});

export default EmailCard;
