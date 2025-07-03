import { Email } from '@/types/email';

const API_BASE_URL = 'http://localhost:3001';

export const emailAPI = {
  async health(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },

  async fetchAll(priority?: string): Promise<Email[]> {
    const query = priority ? `?priority=${priority}` : '';
    const response = await fetch(`${API_BASE_URL}/emails${query}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch emails: ${response.status}`);
    }

    return response.json();
  },

  toggleStar: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/emails/${id}/star`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to toggle star');
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/emails/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete email');
  },

  getOne: async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/emails/${id}`);
    if (!res.ok) throw new Error('Email not found');
    return res.json()
  }
};
