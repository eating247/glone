import React from 'react';

interface SearchProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  onSearch: (query: string) => void;
  onClear: () => void;
  isSearchMode?: boolean;
}

export default function Search({
  searchInput,
  setSearchInput,
  onSearch,
  onClear,
}: SearchProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={searchInput}
        placeholder="Search emails"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(searchInput)}
        className="border rounded px-2 py-1 flex-1"
      ></input>
      <button
        className="border rounded px-2 py-1 bg-cyan-300"
        onClick={() => onSearch(searchInput)}
      >
        Search
      </button>
      <button
        onClick={onClear}
        className="border rounded px-2 py-1 bg-orange-300"
      >
        Clear Search
      </button>
    </div>
  );
}
