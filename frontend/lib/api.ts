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
}
