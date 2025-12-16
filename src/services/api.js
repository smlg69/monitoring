// src/services/api.js
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "",
  DEFAULT_TOKEN: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTFlMWY1Mi0xMDc4LTQ3NTAtODNjNy0xM2I3ZTg3NjUwZmEiLCJzdWIiOiJhZG1pbiIsImF1ZCI6InJlZnJlc2giLCJpYXQiOjE3NjU4Nzk3MTcsImV4cCI6MTc2NTk2NjExN30.q49X51NYgHgJuM8VJt6gSvJ1OFOWDmGKrxRR6JgydDQ",
  API_URL: "/rest/v1/contexts/users.admin.models.workerLimsN/functions/getTblDevicesF",
  ITEMS_PER_PAGE: 15
};

class ApiService {
  constructor() {
    this.config = API_CONFIG;
  }

  async request(url, options = {}) {
    const token = this.config.DEFAULT_TOKEN;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    const config = { ...defaultOptions, ...options };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Специальный метод для получения оборудования
  async getEquipment(params = { num: "15" }) {
    return this.request(this.config.API_URL, {
      method: 'POST',
      body: JSON.stringify([params]) // ← ВАЖНО: массив!
    });
  }
}

export const apiService = new ApiService();