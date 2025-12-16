// src/pages/AccessPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccessEquipment } from '../hooks/useAccessEquipment';
import { useApi } from './ApiContext';
import AccessSchema from '../components/Schemas/AccessSchema'; // ✅ Правильный путь
// import EquipmentTable from '../components/EquipmentTable/EquipmentTable'; // Убрали - не используем
import './SystemPages.css'; // ✅ Правильный путь

const API_URL = "/rest/v1/contexts/users.admin.models.workerLimsN/functions/getTblDevicesF";

function AccessPage() {
  const { apiToken } = useApi();
  const [activeView, setActiveView] = useState('schema');
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [rawApiData, setRawApiData] = useState(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  
  // Используем хук для локального оборудования СКУД
  const { 
    equipment: localEquipment, 
    loading: localLoading, 
    error: localError,
    stats 
  } = useAccessEquipment();

  // Загружаем данные из API
  useEffect(() => {
    if (apiToken) {
      loadApiEquipment();
    }
  }, [apiToken]);

  const loadApiEquipment = async () => {
    if (!apiToken) {
      setApiError('Токен API не установлен');
      return;
    }

    setApiLoading(true);
    setApiError(null);
    
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify([{ num: "15" }])
      };

      const response = await fetch(API_URL, requestOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText.substring(0, 100)}`);
      }

      // 🔥 ВАЖНО: Декодируем windows-1251
      const buffer = await response.arrayBuffer();
      const decoder = new TextDecoder('windows-1251');
      const text = decoder.decode(buffer);
      
      console.log('📦 Raw response (decoded):', text.substring(0, 500));
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        // Пробуем UTF-8
        const utf8Decoder = new TextDecoder('utf-8');
        const utf8Text = utf8Decoder.decode(buffer);
        data = JSON.parse(utf8Text);
      }
      
      console.log('✅ Parsed data:', data);
      setRawApiData(data);
      
      // Преобразуем данные
      const transformed = transformApiData(data);
      console.log('🔄 Transformed data:', transformed);
      setApiData(transformed);
      
    } catch (err) {
      console.error('Error fetching API equipment:', err);
      setApiError(err.message || 'Ошибка при загрузке данных из API');
    } finally {
      setApiLoading(false);
    }
  };

  // Функция преобразования данных API
  const transformApiData = (apiResponse) => {
    console.log('🔄 Начинаем преобразование данных API...');
    
    if (!apiResponse) {
      console.log('❌ API ответ пустой');
      return [];
    }
    
    if (!Array.isArray(apiResponse)) {
      console.log('❌ API ответ не массив:', typeof apiResponse);
      // Если это объект, попробуем извлечь массив
      if (apiResponse.data && Array.isArray(apiResponse.data)) {
        apiResponse = apiResponse.data;
      } else if (apiResponse.result && Array.isArray(apiResponse.result)) {
        apiResponse = apiResponse.result;
      } else if (apiResponse.devices && Array.isArray(apiResponse.devices)) {
        apiResponse = apiResponse.devices;
      } else {
        // Пробуем преобразовать объект в массив значений
        apiResponse = Object.values(apiResponse);
      }
    }
    
    console.log('📊 API данных для преобразования:', apiResponse.length);
    
    return apiResponse.map((item, index) => {
      // Функция для безопасного получения строки
      const getSafeString = (value) => {
        if (!value) return 'Не указано';
        
        if (typeof value === 'string') {
          // Проверяем на кракозябры (нелатинские символы)
          const hasCyrillicProblems = /[^\x00-\x7F]/.test(value) && /[А-Яа-я]/.test(value) === false;
          
          if (hasCyrillicProblems) {
            console.log(`⚠️ Проблема с кодировкой в поле: ${value}`);
            try {
              const bytes = new Uint8Array(value.split('').map(c => c.charCodeAt(0)));
              const decoder = new TextDecoder('windows-1251');
              return decoder.decode(bytes);
            } catch (e) {
              return value;
            }
          }
        }
        
        return String(value);
      };
      
      // Логируем структуру первого элемента
      if (index === 0) {
        console.log('🔍 Структура первого элемента:', item);
        console.log('📋 Ключи первого элемента:', Object.keys(item));
      }
      
      const name = getSafeString(
        item.device_name || item.name || item.title || 
        item.deviceName || item.device_id || `Устройство ${index + 1}`
      );
      
      const type = getSafeString(
        item.device_type || item.type || item.category || 
        item.deviceType || 'Контроллер'
      );
      
      const status = getSafeString(
        item.status || item.state || item.condition || 
        (item.active ? 'Активен' : 'Не активен') || 'Неизвестно'
      );
      
      const location = getSafeString(
        item.location || item.place || item.room || 
        item.building || 'Не указано'
      );
      
      const description = getSafeString(
        item.description || item.model || 
        item.manufacturer || 'Нет описания'
      );
      
      const group = getSafeString(
        item.group || item.department || item.zone || 'Нет группы'
      );
      
      return {
        id: item.device_id || item.id || `api-${index}`,
        name: name,
        type: type,
        status: status,
        location: location,
        source: 'API',
        description: description,
        group: group,
        apiData: item
      };
    });
  };

  // Объединяем данные
  const equipmentList = [
    ...(localEquipment || []),
    ...(apiData || [])
  ];

  console.log('📊 Всего оборудования:', equipmentList.length);
  console.log('🏠 Локальное:', localEquipment?.length || 0);
  console.log('🌐 API:', apiData?.length || 0);

  return (
    <div className="system-page">
      <div className="system-header-card">
        <div className="system-header-left">
          <span className="material-icons system-main-icon">lock</span>
          <div>
            <h2>Система контроля доступа - Управление и мониторинг</h2>
            <p>Мониторинг состояния и управление системой контроля доступа</p>
          </div>
        </div>
        <div className="system-header-right">
          <button 
            className={`view-btn ${activeView === 'schema' ? 'active' : ''}`}
            onClick={() => setActiveView('schema')}
          >
            <span className="material-icons">schema</span>
            Мнемосхема
          </button>
          <button 
            className={`view-btn ${activeView === 'equipment' ? 'active' : ''}`}
            onClick={() => setActiveView('equipment')}
          >
            <span className="material-icons">build</span>
            Оборудование
          </button>
          <button 
            className="debug-btn"
            onClick={() => {
              console.log('=== ДАННЫЕ ДЛЯ ОТЛАДКИ ===');
              console.log('RAW API Data:', rawApiData);
              console.log('Transformed API Data:', apiData);
              console.log('Local Equipment:', localEquipment);
              console.log('Combined Equipment:', equipmentList);
            }}
          >
            <span className="material-icons">bug_report</span>
            Отладка
          </button>
        </div>
      </div>

      {/* Отображение ошибок */}
      {localError && (
        <div className="error-message">
          <span className="material-icons">error</span>
          Ошибка локальных данных: {localError}
        </div>
      )}

      {apiError && (
        <div className="error-message">
          <span className="material-icons">error</span>
          Ошибка API: {apiError}
        </div>
      )}

      {/* Статус API */}
      <div className="api-status">
        {apiLoading && (
          <div className="status-info">
            <span className="material-icons spin">sync</span>
            Загрузка данных с API...
          </div>
        )}
        {!apiLoading && apiToken && apiData.length > 0 && (
          <div className="status-success">
            <span className="material-icons">check_circle</span>
            API подключен. Получено {apiData.length} устройств
          </div>
        )}
      </div>

{activeView === 'schema' ? (
  <div style={{ 
    marginTop: '20px', 
    height: 'calc(100vh - 250px)',
    minHeight: '650px'
  }}>
    <AccessSchema 
      equipment={equipmentList}
      onEquipmentClick={(id) => {
        const eq = equipmentList.find(e => e.id === id);
        if (eq) {
          console.log('Выбрано оборудование:', eq);
        }
      }}
    />
  </div>
) : (
  <div className="equipment-view-container">
    <div className="equipment-table-card">
      <div className="card-header">
        <h4>Оборудование системы ({equipmentList.length})</h4>
      </div>
      <div className="view-hint">
        <span className="material-icons">info</span>
        Для просмотра схемы и графиков переключитесь на вкладку "Мнемосхема"
      </div>
    </div>
  </div>
)}

      <div className="bottom-tabs">
        <Link to="/" className="tab">
          <span className="material-icons">dashboard</span>
          <span>Сводка</span>
        </Link>
        <Link to="/hvac" className="tab">
          <span className="material-icons">handyman</span>
          <span>ЖКХ</span>
        </Link>
        <button className="tab active">
          <span className="material-icons">sensor_door</span>
          <span>СКУД</span>
        </button>
        <Link to="/cctv" className="tab">
          <span className="material-icons">videocam</span>
          <span>Видео</span>
        </Link>
      </div>
    </div>
  );
}

export default AccessPage;