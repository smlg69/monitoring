import { useState, useEffect, useCallback } from 'react';
import { accessService } from '../services/accessService';

export const useAccessEquipment = (params = {}) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalEvents: 0,
    systemAvailability: 0
  });

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await accessService.getEquipment(params);
      setEquipment(data);
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке оборудования');
      console.error('Error fetching access equipment:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const fetchStatistics = useCallback(async () => {
    try {
      const data = await accessService.getStatistics();
      setStats(data);
    } catch (err) {
      console.error('Error fetching access statistics:', err);
    }
  }, []);

  const addEquipment = async (equipmentData) => {
    try {
      const newEquipment = await accessService.addEquipment(equipmentData);
      setEquipment(prev => [...prev, newEquipment]);
      return newEquipment;
    } catch (err) {
      console.error('Error adding access equipment:', err);
      throw err;
    }
  };

  const updateEquipment = async (id, equipmentData) => {
    try {
      const updated = await accessService.updateEquipment(id, equipmentData);
      setEquipment(prev => prev.map(item => 
        item.id === id ? updated : item
      ));
      return updated;
    } catch (err) {
      console.error('Error updating access equipment:', err);
      throw err;
    }
  };

  const deleteEquipment = async (id) => {
    try {
      await accessService.deleteEquipment(id);
      setEquipment(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting access equipment:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchEquipment();
    fetchStatistics();
  }, [fetchEquipment, fetchStatistics]);

  return {
    equipment,
    loading,
    error,
    stats,
    refetch: fetchEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    fetchStatistics,
  };
};