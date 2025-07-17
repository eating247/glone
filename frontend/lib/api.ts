import { Email } from '@/types/email';

const API_BASE_URL = 'http://localhost:3001';

async function handleResponse(res: Response) {
  if (!res.ok) {
    let errorMsg = `Request failed: ${res.status}`;
    try {
      const errorData = await res.json();
      errorMsg = errorData.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  return res.json();
}

export const emailAPI = {
  async fetchAll(priority?: string): Promise<Email[]> {
    const query = priority ? `?priority=${priority}` : '';
    const response = await fetch(`${API_BASE_URL}/emails${query}`, {
      cache: 'no-store',
    });
    return handleResponse(response);
  },

  async search(query?: string): Promise<Email[]> {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await fetch(
      `${API_BASE_URL}/emails/search?q=${encodedQuery}`,
    );

    return handleResponse(response);
  },

  toggleStar: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/emails/${id}/star`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/emails/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  getOne: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/emails/${id}`);
    return handleResponse(response);
  },
};
