import { apiService } from './api';

class CCTVService {
  // Получение списка оборудования
  async getEquipment(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/cctv/equipment${queryString ? `?${queryString}` : ''}`;
    return apiService.get(endpoint);
  }

  // Добавление нового оборудования
  async addEquipment(equipmentData) {
    return apiService.post('/cctv/equipment', equipmentData);
  }

  // Обновление оборудования
  async updateEquipment(id, equipmentData) {
    return apiService.put(`/cctv/equipment/${id}`, equipmentData);
  }

  // Удаление оборудования
  async deleteEquipment(id) {
    return apiService.delete(`/cctv/equipment/${id}`);
  }

  // Переключение статуса камеры
  async toggleCameraStatus(id, status) {
    return apiService.patch(`/cctv/equipment/${id}/status`, { status });
  }

  // Получение статистики системы
  async getStatistics() {
    return apiService.get('/cctv/statistics');
  }

  // Получение прямой трансляции
  async getLiveStream(cameraId) {
    return apiService.get(`/cctv/cameras/${cameraId}/stream`);
  }

  // Получение последних записей
  async getRecentRecordings(limit = 5) {
    return apiService.get(`/cctv/recordings/recent?limit=${limit}`);
  }

  // Поиск записей
  async searchRecordings(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/cctv/recordings/search${queryString ? `?${queryString}` : ''}`);
  }

  // Получение оповещений
  async getAlerts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/cctv/alerts${queryString ? `?${queryString}` : ''}`);
  }

  // Создание заявки на обслуживание
  async createMaintenanceRequest(requestData) {
    return apiService.post('/cctv/maintenance-requests', requestData);
  }

  // Получение расписания обслуживания
  async getMaintenanceSchedule(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/cctv/maintenance-schedule${queryString ? `?${queryString}` : ''}`);
  }

  // Получение истории параметров камеры
  async getCameraHistory(cameraId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return apiService.get(`/cctv/cameras/${cameraId}/history${queryString ? `?${queryString}` : ''}`);
  }

  // Экспорт записей
  async exportRecordings(recordingIds, format = 'mp4') {
    return apiService.post('/cctv/recordings/export', { recordingIds, format });
  }

  // Настройки системы видеонаблюдения
  async getSystemSettings() {
    return apiService.get('/cctv/settings');
  }

  async updateSystemSettings(settings) {
    return apiService.put('/cctv/settings', settings);
  }
}

export const cctvService = new CCTVService();