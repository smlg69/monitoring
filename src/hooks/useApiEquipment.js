// src/hooks/useApiEquipment.js
import { useState, useCallback } from 'react';
import { useApi } from '../pages/ApiContext';

export const useApiEquipment = () => {
  const { apiToken, getApiUrl } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // Функция для декодирования ответа в windows-1251
  const decodeWindows1251 = async (response) => {
    try {
      const buffer = await response.arrayBuffer();
      const decoder = new TextDecoder('windows-1251');
      const text = decoder.decode(buffer);
      return JSON.parse(text);
    } catch (error) {
      console.error('Ошибка декодирования:', error);
      throw error;
    }
  };

  // Функция для получения данных оборудования
  const fetchEquipmentData = useCallback(async (params = { num: "15" }) => {
    if (!apiToken) {
      setError("❌ Токен не установлен");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([params]),
      });

      if (response.ok) {
        const responseData = await decodeWindows1251(response);
        setData(responseData);
        return responseData;
      } else if (response.status === 401 || response.status === 403) {
        setError(`❌ Токен недействителен (${response.status})`);
        return null;
      } else if (response.status === 404) {
        setError(`❌ API не найден (404)`);
        return null;
      } else {
        const errorText = await response.text();
        setError(`❌ Ошибка API ${response.status}: ${errorText.substring(0, 100)}`);
        return null;
      }
    } catch (err) {
      setError(`💥 Ошибка сети: ${err.message}`);
      console.error('Ошибка при загрузке оборудования:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiToken, getApiUrl]);

  // Функция для преобразования данных API в формат оборудования
  const transformApiData = useCallback((apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    return apiData.map((item, index) => {
      // Ищем нужные поля в различных вариантах названий
      const name = item.name || item.NAME || item.deviceName || `Устройство ${index + 1}`;
      const type = item.type || item.TYPE || item.deviceType || 'Неизвестный тип';
      
      let status = 'Неизвестно';
      if (item.active !== undefined) {
        status = item.active ? 'Активен' : 'Не активен';
      } else if (item.ACTIVE !== undefined) {
        status = item.ACTIVE ? 'Активен' : 'Не активен';
      } else if (item.status !== undefined) {
        status = item.status;
      }

      const location = item.dislocation || item.DISLOCATION || item.location || 'Не указано';
      const source = item.group || item.GROUP || item.source || 'Без группы';
      const description = item.description || item.DESCRIPTION || 'Нет описания';

      return {
        id: item.id || item.ID || `api-${index}`,
        name,
        type,
        status,
        location,
        source,
        description,
        apiData: item
      };
    });
  }, []);

  return {
    loading,
    error,
    data,
    fetchEquipmentData,
    transformApiData,
    getTransformedData: () => transformApiData(data),
    clearError: () => setError(null),
    clearData: () => setData([])
  };
};