import React from 'react';
import { PRIORITY_LABELS, PriorityFilter } from './constants';

interface PriorityDropdownProps {
  priorityFilter: PriorityFilter;
  onPriorityFilterChange: (filter: PriorityFilter) => void;
}

export default function PriorityDropdown({
  priorityFilter,
  onPriorityFilterChange,
}: PriorityDropdownProps) {
  return (
    <select
      id="priority-filter"
      value={priorityFilter}
      onChange={(e) => onPriorityFilterChange(e.target.value as PriorityFilter)}
      className="border rounded px-2 py-1"
      aria-label="Filter emails by priority"
    >
      {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
