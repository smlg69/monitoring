import { apiService } from './api';

class AccessService {
  async getEquipment(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/access/equipment${queryString ? `?${queryString}` : ''}`;
    return apiService.get(endpoint);
  }

  async addEquipment(equipmentData) {
    return apiService.post('/access/equipment', equipmentData);
  }

  async updateEquipment(id, equipmentData) {
    return apiService.put(`/access/equipment/${id}`, equipmentData);
  }

  async deleteEquipment(id) {
    return apiService.delete(`/access/equipment/${id}`);
  }

  async getStatistics() {
    return apiService.get('/access/statistics');
  }

  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/access/events${queryString ? `?${queryString}` : ''}`);
  }

  async createMaintenanceRequest(requestData) {
    return apiService.post('/access/maintenance-requests', requestData);
  }

  async getMaintenanceSchedule(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/access/maintenance-schedule${queryString ? `?${queryString}` : ''}`);
  }

  async getEquipmentHistory(equipmentId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/access/equipment/${equipmentId}/history${queryString ? `?${queryString}` : ''}`);
  }
}

export const accessService = new AccessService();