import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
  }
  
  export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
  }: Omit<PaginationProps, 'totalItems' | 'itemsPerPage'>) {
    return (
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50"
        >
          First
        </button>
  
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50"
        >
          Previous
        </button>
  
        <span className="px-4 py-1 text-sm">
          Page {currentPage} of {totalPages}
        </span>
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50"
        >
          Next
        </button>
  
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-sm disabled:opacity-50"
        >
          Last
        </button>
      </div>
    );
  }