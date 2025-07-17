// app/EmailList.tsx
'use client';
import React, { useCallback } from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Email } from '@/types/email';
import EmailCard from './EmailCard';
import { emailAPI } from '@/lib/api';
import { Pagination } from './Pagination';
import Search from './Search';
import PriorityDropdown from './PriorityDropdown';
import { PriorityFilter } from './constants';

interface EmailListState {
  emails: Email[];
  loading: boolean;
  error: string | null;
  actionError: string | null;
  priorityFilter: PriorityFilter;
  currentPage: number;
  emailsPerPage: number;
  searchQuery: string;
  isSearchMode: boolean;
}

export default function EmailList() {
  const [searchInput, setSearchInput] = useState('');
  const [state, setState] = useState<EmailListState>({
    emails: [],
    loading: true,
    error: null,
    actionError: null,
    priorityFilter: 'ALL',
    currentPage: 1,
    emailsPerPage: 25,
    searchQuery: '',
    isSearchMode: false,
  });
  const {
    emails,
    loading,
    error,
    actionError,
    priorityFilter,
    currentPage,
    emailsPerPage,
    searchQuery,
    isSearchMode,
  } = state;

  useEffect(() => {
    loadEmails();
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, currentPage: 1 }));
  }, [priorityFilter]);

  const loadEmails = async () => {
    console.log('loading emails');
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      console.log('About to call API'); // Add this -
      const data = await emailAPI.fetchAll();
      console.log('API response:', data); // Add this
      setState((prev) => ({ ...prev, emails: data, loading: false }));
      console.log('state should be updated');

      setTimeout(() => {
        console.log('State after update:', state);
      }, 100);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error loading emails';
      setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
    }
  };

  const handleToggleStar = useCallback(async (id: number) => {
    try {
      setState((prev) => ({ ...prev, actionError: null }));
      await emailAPI.toggleStar(id);
      setState((prev) => ({
        ...prev,
        emails: prev.emails.map((email) =>
          email.id === id ? { ...email, isStarred: !email.isStarred } : email,
        ),
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to toggle star';
      setState((prev) => ({ ...prev, actionError: errorMessage }));
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    try {
      setState((prev) => ({ ...prev, actionError: null }));
      await emailAPI.delete(id);
      setState((prev) => ({
        ...prev,
        emails: prev.emails.filter((email) => email.id !== id),
      }));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to delete email';
      setState((prev) => ({ ...prev, actionError: errorMessage }));
    }
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleEmailsPerPageChange = useCallback((perPage: number) => {
    setState((prev) => ({
      ...prev,
      emailsPerPage: perPage,
      currentPage: 1, // Reset to first page when changing page size
    }));
  }, []);

  const filteredEmails = useMemo(
    () =>
      priorityFilter === 'ALL'
        ? emails
        : emails.filter((email) => email.priority === priorityFilter),
    [emails, priorityFilter],
  );

  // Calculate pagination
  const totalEmails = filteredEmails.length;
  const totalPages = Math.ceil(totalEmails / emailsPerPage);
  const startIndex = (currentPage - 1) * emailsPerPage;
  const endIndex = startIndex + emailsPerPage;
  const currentEmails = filteredEmails.slice(startIndex, endIndex);

  // Calculate display range
  const displayStart = totalEmails === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(endIndex, totalEmails);

  const handlePriorityFilterChange = useCallback((filter: PriorityFilter) => {
    setState((prev) => ({ ...prev, priorityFilter: filter }));
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        actionError: null,
      }));
      const results = await emailAPI.search(query);
      setState((prev) => ({
        ...prev,
        loading: false,
        isSearchMode: true,
        searchQuery: query,
        emails: results,
        currentPage: 1,
      }));
      console.log(results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setState((prev) => ({
        ...prev,
        actionError: errorMessage,
        loading: false,
      }));
    }
  }, []);

  const handleClear = () => {
    setSearchInput('');
    setState((prev) => ({ ...prev, isSearchMode: false }));
    loadEmails();
  };

  if (error) {
    console.log(error);
  }

  if (loading) return <div className="text-gray-500">Loading emails...</div>;
  // if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      {/* Search Component */}
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
        onClear={handleClear}
        isSearchMode={isSearchMode}
      />

      <div className="mb-4 flex gap-3">
        {/* Priority Dropdown */}
        <PriorityDropdown
          priorityFilter={priorityFilter}
          onPriorityFilterChange={handlePriorityFilterChange}
        />

        {/* Emails per page selector */}
        <select
          value={emailsPerPage}
          onChange={(e) => handleEmailsPerPageChange(Number(e.target.value))}
          className="border rounded px-3 py-1 bg-white"
          aria-label="Emails per page"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>
      </div>

      {/* Results info */}
      <div className="text-sm text-gray-600">
        {isSearchMode && (
          <div className="text-sm text-gray-600">
            Search results for "{searchQuery}" ({emails.length} found)
          </div>
        )}
        Showing {displayStart}-{displayEnd} of {totalEmails} emails
      </div>

      {/* Error Display */}
      {error && (
        <div>
          <strong>Error:</strong> {error}
          <button
            onClick={() => setState((prev) => ({ ...prev, error: null }))}
          ></button>
        </div>
      )}

      {actionError && (
        <div>
          <strong>Error:</strong> {actionError}
          <button
            onClick={() => setState((prev) => ({ ...prev, actionError: null }))}
          ></button>
        </div>
      )}

      {/* Email List */}
      {currentEmails.map((email) => {
        return (
          <EmailCard
            key={email.id}
            {...email}
            onToggleStar={handleToggleStar}
            onDelete={handleDelete}
          />
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t bg-gray-50 px-4 py-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalEmails}
            itemsPerPage={emailsPerPage}
          />
        </div>
      )}
    </div>
  );
}
