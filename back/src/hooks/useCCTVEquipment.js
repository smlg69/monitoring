import { useState, useEffect, useCallback } from 'react';
import { cctvService } from '../services/cctvService';

export const useCCTVEquipment = (params = {}) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCameras: 0,
    activeCameras: 0,
    offlineCameras: 0,
    storageUsage: 0,
    bandwidth: 0
  });
  const [recordings, setRecordings] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cctvService.getEquipment(params);
      setEquipment(data);
      
      // Рассчитываем статистику на основе полученных данных
      const total = data.length;
      const active = data.filter(item => item.status === 'Норма' || item.status === 'active').length;
      const offline = data.filter(item => item.status === 'Критично' || item.status === 'offline').length;
      
      setStats(prev => ({
        ...prev,
        totalCameras: total,
        activeCameras: active,
        offlineCameras: offline
      }));
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке оборудования');
      console.error('Error fetching CCTV equipment:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const fetchStatistics = useCallback(async () => {
    try {
      const data = await cctvService.getStatistics();
      setStats(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.error('Error fetching CCTV statistics:', err);
    }
  }, []);

  const fetchRecentRecordings = useCallback(async (limit = 5) => {
    try {
      const data = await cctvService.getRecentRecordings(limit);
      setRecordings(data);
    } catch (err) {
      console.error('Error fetching recent recordings:', err);
    }
  }, []);

  const fetchAlerts = useCallback(async (params = {}) => {
    try {
      const data = await cctvService.getAlerts(params);
      setAlerts(data);
    } catch (err) {
      console.error('Error fetching CCTV alerts:', err);
    }
  }, []);

  const addEquipment = async (equipmentData) => {
    try {
      const newEquipment = await cctvService.addEquipment(equipmentData);
      setEquipment(prev => [...prev, newEquipment]);
      
      // Обновляем статистику
      setStats(prev => ({
        ...prev,
        totalCameras: prev.totalCameras + 1,
        activeCameras: equipmentData.status === 'active' ? prev.activeCameras + 1 : prev.activeCameras
      }));
      
      return newEquipment;
    } catch (err) {
      console.error('Error adding CCTV equipment:', err);
      throw err;
    }
  };

  const updateEquipment = async (id, equipmentData) => {
    try {
      // Получаем старое состояние оборудования для обновления статистики
      const oldEquipment = equipment.find(item => item.id === id);
      
      const updated = await cctvService.updateEquipment(id, equipmentData);
      setEquipment(prev => prev.map(item => 
        item.id === id ? updated : item
      ));
      
      // Обновляем статистику, если изменился статус
      if (oldEquipment && oldEquipment.status !== updated.status) {
        setStats(prev => {
          let newStats = { ...prev };
          
          // Уменьшаем старый статус
          if (oldEquipment.status === 'active' || oldEquipment.status === 'Норма') {
            newStats.activeCameras--;
          } else if (oldEquipment.status === 'offline' || oldEquipment.status === 'Критично') {
            newStats.offlineCameras--;
          }
          
          // Увеличиваем новый статус
          if (updated.status === 'active' || updated.status === 'Норма') {
            newStats.activeCameras++;
          } else if (updated.status === 'offline' || updated.status === 'Критично') {
            newStats.offlineCameras++;
          }
          
          return newStats;
        });
      }
      
      return updated;
    } catch (err) {
      console.error('Error updating CCTV equipment:', err);
      throw err;
    }
  };

  const deleteEquipment = async (id) => {
    try {
      // Получаем удаляемое оборудование для обновления статистики
      const equipmentToDelete = equipment.find(item => item.id === id);
      
      await cctvService.deleteEquipment(id);
      setEquipment(prev => prev.filter(item => item.id !== id));
      
      // Обновляем статистику
      if (equipmentToDelete) {
        setStats(prev => ({
          ...prev,
          totalCameras: prev.totalCameras - 1,
          activeCameras: equipmentToDelete.status === 'active' ? prev.activeCameras - 1 : prev.activeCameras,
          offlineCameras: equipmentToDelete.status === 'offline' ? prev.offlineCameras - 1 : prev.offlineCameras
        }));
      }
    } catch (err) {
      console.error('Error deleting CCTV equipment:', err);
      throw err;
    }
  };

  const toggleCameraStatus = async (id, status) => {
    try {
      const updated = await cctvService.toggleCameraStatus(id, status);
      setEquipment(prev => prev.map(item => 
        item.id === id ? updated : item
      ));
      return updated;
    } catch (err) {
      console.error('Error toggling camera status:', err);
      throw err;
    }
  };

  const getCameraLiveStream = async (cameraId) => {
    try {
      return await cctvService.getLiveStream(cameraId);
    } catch (err) {
      console.error('Error getting live stream:', err);
      throw err;
    }
  };

  const searchRecordings = async (params) => {
    try {
      return await cctvService.searchRecordings(params);
    } catch (err) {
      console.error('Error searching recordings:', err);
      throw err;
    }
  };

  // Загружаем все данные при монтировании
  useEffect(() => {
    fetchEquipment();
    fetchStatistics();
    fetchRecentRecordings();
    fetchAlerts({ limit: 10, recent: true });
  }, [fetchEquipment, fetchStatistics, fetchRecentRecordings, fetchAlerts]);

  return {
    // Состояние
    equipment,
    loading,
    error,
    stats,
    recordings,
    alerts,
    
    // Действия с оборудованием
    refetch: fetchEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    toggleCameraStatus,
    
    // Действия с записями
    fetchRecentRecordings,
    searchRecordings,
    getCameraLiveStream,
    
    // Действия со статистикой и оповещениями
    fetchStatistics,
    fetchAlerts,
    
    // Вспомогательные функции
    getCameraById: (id) => equipment.find(item => item.id === id),
    getActiveCameras: () => equipment.filter(item => item.status === 'active' || item.status === 'Норма'),
    getOfflineCameras: () => equipment.filter(item => item.status === 'offline' || item.status === 'Критично'),
    getCameraByLocation: (location) => equipment.filter(item => item.location === location),
  };
};