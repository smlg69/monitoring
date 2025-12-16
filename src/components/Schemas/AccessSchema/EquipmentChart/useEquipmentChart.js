// src/components/Schemas/AccessSchema/EquipmentChart/useEquipmentChart.js
import { useState, useEffect } from 'react';

export const useEquipmentChart = (equipment) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!equipment) {
      setChartData(null);
      return;
    }

    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Имитация загрузки данных
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Генерируем тестовые данные
        const mockData = Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          value: Math.floor(Math.random() * 100),
          status: Math.random() > 0.8 ? 'warning' : 'normal'
        }));

        setChartData(mockData);
      } catch (err) {
        setError('Ошибка загрузки данных графика');
        console.error('Error loading chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [equipment]);

  return { chartData, loading, error };
};