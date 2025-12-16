import { useState, useEffect, useCallback } from 'react';
import { hvacService } from '../services/hvacService';

export const useHvacEquipment = (params = {}) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hvacService.getEquipment(params);
      setEquipment(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching equipment:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const addEquipment = async (equipmentData) => {
    try {
      const newEquipment = await hvacService.addEquipment(equipmentData);
      setEquipment(prev => [...prev, newEquipment]);
      return newEquipment;
    } catch (err) {
      console.error('Error adding equipment:', err);
      throw err;
    }
  };

  const updateEquipment = async (id, equipmentData) => {
    try {
      const updated = await hvacService.updateEquipment(id, equipmentData);
      setEquipment(prev => prev.map(item => 
        item.id === id ? updated : item
      ));
      return updated;
    } catch (err) {
      console.error('Error updating equipment:', err);
      throw err;
    }
  };

  const deleteEquipment = async (id) => {
    try {
      await hvacService.deleteEquipment(id);
      setEquipment(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error deleting equipment:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return {
    equipment,
    loading,
    error,
    refetch: fetchEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
  };
};