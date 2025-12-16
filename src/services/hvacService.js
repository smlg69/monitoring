import { apiService } from './api';

class HVACService {
  async getEquipment(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/hvac/equipment${queryString ? `?${queryString}` : ''}`;
    return apiService.get(endpoint);
  }

  async addEquipment(equipmentData) {
    return apiService.post('/hvac/equipment', equipmentData);
  }

  async updateEquipment(id, equipmentData) {
    return apiService.put(`/hvac/equipment/${id}`, equipmentData);
  }

  async deleteEquipment(id) {
    return apiService.delete(`/hvac/equipment/${id}`);
  }

  async getParameterHistory(equipmentId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(
      `/hvac/equipment/${equipmentId}/history${queryString ? `?${queryString}` : ''}`
    );
  }

  async createMaintenanceRequest(requestData) {
    return apiService.post('/hvac/maintenance-requests', requestData);
  }
}

export const hvacService = new HVACService();