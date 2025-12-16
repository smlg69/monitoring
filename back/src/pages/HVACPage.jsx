import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHvacEquipment } from '../hooks/useHvacEquipment';
import HVACSchema from '../components/Schemas/HVACSchema';
import './SystemPages.css';

function HVACPage() {
  const [activeView, setActiveView] = useState('schema');
  const [equipmentModalOpen, setEquipmentModalOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [selectedEquipmentDetails, setSelectedEquipmentDetails] = useState(null);
  
  // Используем хук для оборудования
  const { 
    equipment: equipmentList, 
    loading, 
    error, 
    addEquipment 
  } = useHvacEquipment();
  
  // Состояние для формы добавления оборудования
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: 'Насосное оборудование',
    location: '',
    parameters: '',
    ipAddress: '',
    status: 'Норма'
  });

  const serviceSchedule = [
    { equipment: 'Насосная станция №1', type: 'Регламентное обслуживание', date: '15.06.2023', status: 'Запланировано', responsible: 'Иванов А.С.' },
    { equipment: 'Тепловой узел №3', type: 'Замена фильтра', date: '18.06.2023', status: 'Требует подтверждения', responsible: 'Петров В.И.' },
    { equipment: 'Вентиляционная установка', type: 'Чистка фильтров', date: '20.06.2023', status: 'Запланировано', responsible: 'Сидоров П.К.' },
  ];

  // Обработчик клика на оборудование в схеме
  const handleEquipmentClick = (equipmentId) => {
    const equipment = equipmentList.find(eq => eq.id === equipmentId);
    setSelectedEquipmentId(equipmentId);
    setSelectedEquipmentDetails(equipment);
  };

  // Получение деталей выбранного оборудования
  const getEquipmentDetails = (id) => {
    const eq = equipmentList.find(e => e.id === id);
    if (!eq) return null;
    
    return {
      name: eq.name,
      type: eq.type,
      status: eq.status,
      location: eq.location,
      parameters: eq.parameters,
      ipAddress: eq.ipAddress,
      lastMaintenance: '15.03.2023',
      nextMaintenance: '15.09.2023',
      temperature: '65°C',
      pressure: '4.2 бар',
      flowRate: '12.5 м³/ч'
    };
  };

  return (
    <div className="system-page">
      {/* ... существующий код header ... */}

      <div className="content-row">
        <div className="system-left-panel">
          <div className="legend-card">
            <h4>Легенда:</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div className="status-indicator normal"></div>
                <span>Норма</span>
              </div>
              <div className="legend-item">
                <div className="status-indicator warning"></div>
                <span>Внимание</span>
              </div>
              <div className="legend-item">
                <div className="status-indicator critical"></div>
                <span>Критично</span>
              </div>
            </div>
          </div>

          <div className="parameters-card">
            <h4>Параметры оборудования</h4>
            <div className="parameters-content">
              {activeView === 'schema' ? (
                <>
                  <HVACSchema 
                    equipment={equipmentList}
                    selectedEquipmentId={selectedEquipmentId}
                    onEquipmentClick={handleEquipmentClick}
                  />
                  
                  <div className="schema-controls">
                    <button className="control-btn">
                      <span className="material-icons">zoom_in</span>
                      Увеличить
                    </button>
                    <button className="control-btn">
                      <span className="material-icons">zoom_out</span>
                      Уменьшить
                    </button>
                    <button className="control-btn active">
                      <span className="material-icons">refresh</span>
                      Обновить
                    </button>
                  </div>
                </>
              ) : (
                <div className="parameters-placeholder">
                  <span className="material-icons">info</span>
                  <p>Выберите оборудование для отображения параметров</p>
                </div>
              )}
              
              {selectedEquipmentDetails && (
                <div className="parameter-details">
                  <h5>{selectedEquipmentDetails.name}</h5>
                  <div className="parameter-list">
                    <div className="parameter-item">
                      <span className="parameter-label">Статус</span>
                      <span className={`parameter-value ${selectedEquipmentDetails.status === 'Норма' ? 'normal' : 
                                    selectedEquipmentDetails.status === 'Внимание' ? 'warning' : 'critical'}`}>
                        {selectedEquipmentDetails.status}
                      </span>
                    </div>
                    <div className="parameter-item">
                      <span className="parameter-label">Тип</span>
                      <span className="parameter-value">{selectedEquipmentDetails.type}</span>
                    </div>
                    <div className="parameter-item">
                      <span className="parameter-label">Расположение</span>
                      <span className="parameter-value">{selectedEquipmentDetails.location}</span>
                    </div>
                    <div className="parameter-item">
                      <span className="parameter-label">Давление</span>
                      <span className="parameter-value">4.2 бар</span>
                    </div>
                    <div className="parameter-item">
                      <span className="parameter-label">Температура</span>
                      <span className="parameter-value">65°C</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="monitoring-card">
            <h4>Мониторинг параметров</h4>
            <div className="monitoring-stats">
              <div className="monitoring-stat">
                <span className="stat-value">4.2 бар</span>
                <span className="stat-label">Давление</span>
              </div>
              <div className="monitoring-stat">
                <span className="stat-value">65°C</span>
                <span className="stat-label">Температура</span>
              </div>
              <div className="monitoring-stat">
                <span className="stat-value">12.5 м³/ч</span>
                <span className="stat-label">Расход</span>
              </div>
            </div>
          </div>
        </div>

        {/* ... остальной код ... */}
      </div>
    </div>
  );
}

export default HVACPage;