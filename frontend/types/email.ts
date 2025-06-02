export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  createdAt: string;
  updatedAt: string;
}
