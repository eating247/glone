export const PRIORITY_LABELS = {
  ALL: 'All',
  URGENT: 'Urgent',
  HIGH: 'High',
  NORMAL: 'Normal',
  LOW: 'Low',
} as const;

export type PriorityFilter = keyof typeof PRIORITY_LABELS;
