// src/hooks/useAccessEquipment.js
import { useState, useEffect, useCallback } from 'react';
// import { accessService } from '../services/accessService'; // Временно отключим

export const useAccessEquipment = (params = {}) => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEquipment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Временные данные для отладки
      const mockData = [
        { 
          id: 1, 
          name: 'Контроллер доступа №1', 
          type: 'Контроллер', 
          status: 'Активен', 
          location: 'Главный вход',
          description: 'Основной контроллер системы'
        },
        { 
          id: 2, 
          name: 'Считыватель карт №5', 
          type: 'Считыватель', 
          status: 'Внимание', 
          location: 'Склад №2',
          description: 'Требует калибровки'
        },
        { 
          id: 3, 
          name: 'Замок турникета', 
          type: 'Замок', 
          status: 'Норма', 
          location: 'Проходная',
          description: 'Электромеханический замок'
        }
      ];
      
      // Имитируем задержку сети
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEquipment(mockData);
      
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке оборудования');
      console.error('Error fetching access equipment:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return {
    equipment,
    loading,
    error,
    refetch: fetchEquipment,
  };
};