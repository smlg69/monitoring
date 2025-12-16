import React, { useState, useEffect } from 'react';

const AccessSchema = ({ equipment = [], onEquipmentClick }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loadingChart, setLoadingChart] = useState(false);

  const handleEquipmentClick = (equipmentItem) => {
    setSelectedEquipment(equipmentItem);
    if (onEquipmentClick) onEquipmentClick(equipmentItem.id);
    loadChartData(equipmentItem);
  };

  const loadChartData = async (eq) => {
    setLoadingChart(true);
    // Имитация загрузки данных графика
    setTimeout(() => {
      const mockData = {
        temperature: Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          value: Math.floor(Math.random() * 20 + 30) // 30-50°C
        })),
        load: Array.from({ length: 7 }, (_, i) => ({
          day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i],
          value: Math.floor(Math.random() * 30 + 60) // 60-90%
        })),
        errors: [
          { type: 'Сетевая', count: 2 },
          { type: 'Аппаратная', count: 1 },
          { type: 'Программная', count: 0 }
        ]
      };
      setChartData(mockData);
      setLoadingChart(false);
    }, 500);
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'норма':
      case 'active':
      case 'активен':
        return '#10b981';
      case 'внимание':
      case 'warning':
        return '#f59e0b';
      case 'критично':
      case 'critical':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Заголовок */}
      <div style={{
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '18px' }}>Мнемосхема системы контроля доступа</h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
            Всего устройств: {equipment.length} {selectedEquipment && `| Выбрано: ${selectedEquipment.name}`}
          </p>
        </div>
        <div style={{
          display: 'flex',
          gap: '10px',
          fontSize: '14px',
          background: 'rgba(255,255,255,0.1)',
          padding: '8px 16px',
          borderRadius: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
            <span>Норма</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
            <span>Внимание</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
            <span>Критично</span>
          </div>
        </div>
      </div>

      {/* Основное содержимое */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        padding: '20px',
        gap: '20px',
        overflow: 'hidden',
        background: '#f8fafc'
      }}>
        {/* Левая часть - SVG схема */}
        <div style={{ 
          flex: 1,
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            flex: 1,
            background: '#f8fafc',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            padding: '10px',
            overflow: 'auto'
          }}>
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 600 400"
              style={{ 
                minWidth: '500px',
                minHeight: '300px'
              }}
            >
              {/* Фон */}
              <rect x="0" y="0" width="600" height="400" fill="#f8fafc" />
              
              {/* Здание */}
              <rect x="50" y="50" width="500" height="300" fill="white" stroke="#cbd5e1" strokeWidth="2" rx="10" />
              
              {/* Элементы оборудования */}
              {equipment.slice(0, 8).map((eq, index) => {
                const row = Math.floor(index / 4);
                const col = index % 4;
                const x = 80 + col * 110;
                const y = 80 + row * 120;
                const color = getStatusColor(eq.status);
                
                return (
                  <g 
                    key={eq.id || index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEquipmentClick(eq)}
                  >
                    <rect 
                      x={x} 
                      y={y} 
                      width="80" 
                      height="60"
                      rx="6"
                      fill={color}
                      fillOpacity="0.15"
                      stroke={color}
                      strokeWidth="2"
                    />
                    <text 
                      x={x + 40} 
                      y={y - 5} 
                      textAnchor="middle" 
                      fill="#1e293b" 
                      fontSize="11" 
                      fontWeight="500"
                    >
                      {eq.name.length > 10 ? eq.name.substring(0, 10) + '...' : eq.name}
                    </text>
                    <text 
                      x={x + 40} 
                      y={y + 35} 
                      textAnchor="middle" 
                      fill="#64748b" 
                      fontSize="10"
                    >
                      {eq.type}
                    </text>
                    <text 
                      x={x + 40} 
                      y={y + 55} 
                      textAnchor="middle" 
                      fill={color} 
                      fontSize="10" 
                      fontWeight="500"
                    >
                      {eq.status}
                    </text>
                  </g>
                );
              })}

              {/* Серверная */}
              <rect x="400" y="280" width="120" height="60" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="460" y="275" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="500">Серверная</text>
              
              {/* Линии соединений */}
              <path d="M280,140 L400,310" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M160,200 L400,310" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M160,320 L400,310" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
            </svg>
          </div>
          
          {/* Статистика */}
          <div style={{
            marginTop: '15px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px'
          }}>
            <div style={{
              background: '#f0f9ff',
              padding: '10px',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#0369a1', fontSize: '16px', fontWeight: '700' }}>{equipment.length}</div>
              <div style={{ color: '#64748b', fontSize: '11px' }}>Всего устройств</div>
            </div>
            <div style={{
              background: '#f0fdf4',
              padding: '10px',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#059669', fontSize: '16px', fontWeight: '700' }}>
                {equipment.filter(e => e.status?.toLowerCase().includes('норма') || e.status?.toLowerCase().includes('active')).length}
              </div>
              <div style={{ color: '#64748b', fontSize: '11px' }}>В норме</div>
            </div>
            <div style={{
              background: '#fef3c7',
              padding: '10px',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <div style={{ color: '#92400e', fontSize: '16px', fontWeight: '700' }}>
                {equipment.filter(e => e.status?.toLowerCase().includes('внимание') || e.status?.toLowerCase().includes('warning')).length}
              </div>
              <div style={{ color: '#64748b', fontSize: '11px' }}>Требует внимания</div>
            </div>
          </div>
        </div>

        {/* Правая часть - Графики и детали */}
        <div style={{ 
          flex: 1,
          minWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {selectedEquipment ? (
            <>
              {/* Карточка с информацией об оборудовании */}
              <div style={{
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px' }}>{selectedEquipment.name}</h4>
                    <div style={{ marginTop: '6px', fontSize: '13px', opacity: 0.9, display: 'flex', gap: '15px' }}>
                      <span>Тип: {selectedEquipment.type}</span>
                      <span style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '2px 10px',
                        borderRadius: '12px'
                      }}>
                        Статус: {selectedEquipment.status}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedEquipment(null)}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span className="material-icons" style={{ fontSize: '20px' }}>close</span>
                  </button>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>Расположение</div>
                      <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: '500' }}>
                        {selectedEquipment.location || 'Не указано'}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>Источник данных</div>
                      <div style={{ 
                        color: selectedEquipment.source === 'API' ? '#3b82f6' : '#10b981',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        {selectedEquipment.source || 'Локальный'}
                      </div>
                    </div>
                  </div>
                  
                  {selectedEquipment.description && (
                    <div style={{ 
                      background: '#f8fafc', 
                      padding: '12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      color: '#475569',
                      marginBottom: '20px'
                    }}>
                      {selectedEquipment.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Графики */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {/* График температуры */}
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h5 style={{ margin: 0, color: '#1e293b', fontSize: '14px' }}>Температура оборудования</h5>
                    <span style={{ color: '#3b82f6', fontSize: '20px', fontWeight: '700' }}>
                      {loadingChart ? '...' : '42'}°C
                    </span>
                  </div>
                  
                  {loadingChart ? (
                    <div style={{ 
                      height: '100px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#64748b'
                    }}>
                      <span className="material-icons spin" style={{ marginRight: '10px' }}>sync</span>
                      Загрузка графика...
                    </div>
                  ) : chartData ? (
                    <div style={{ height: '100px', position: 'relative' }}>
                      {/* Имитация графика */}
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '80px',
                        borderLeft: '1px solid #cbd5e1',
                        borderBottom: '1px solid #cbd5e1'
                      }}>
                        {/* Линия графика */}
                        <svg width="100%" height="100%" viewBox="0 0 100 80">
                          <path 
                            d="M0,60 L10,55 L20,58 L30,50 L40,45 L50,40 L60,35 L70,30 L80,32 L90,28 L100,25"
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* График нагрузки */}
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  padding: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h5 style={{ margin: 0, color: '#1e293b', fontSize: '14px' }}>Загрузка системы</h5>
                    <span style={{ color: '#10b981', fontSize: '20px', fontWeight: '700' }}>
                      {loadingChart ? '...' : '78'}%
                    </span>
                  </div>
                  
                  {!loadingChart && chartData && (
                    <div style={{ height: '60px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                      {chartData.load.map((item, index) => (
                        <div key={index} style={{ 
                          flex: 1, 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            width: '20px',
                            height: `${item.value}%`,
                            background: 'linear-gradient(to top, #10b981, #34d399)',
                            borderRadius: '3px 3px 0 0'
                          }}></div>
                          <div style={{ 
                            fontSize: '10px', 
                            color: '#64748b',
                            marginTop: '4px'
                          }}>
                            {item.day}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Статистика ошибок */}
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  padding: '16px'
                }}>
                  <h5 style={{ margin: '0 0 15px 0', color: '#1e293b', fontSize: '14px' }}>Статистика ошибок</h5>
                  {!loadingChart && chartData && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {chartData.errors.map((error, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '50%',
                            background: error.count === 0 ? '#10b981' : error.count < 2 ? '#f59e0b' : '#ef4444'
                          }}></div>
                          <div style={{ flex: 1, fontSize: '13px', color: '#475569' }}>
                            {error.type}
                          </div>
                          <div style={{ 
                            fontSize: '13px',
                            fontWeight: '700',
                            color: error.count === 0 ? '#10b981' : error.count < 2 ? '#f59e0b' : '#ef4444'
                          }}>
                            {error.count} ошибок
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'white',
              borderRadius: '8px',
              border: '1px dashed #e2e8f0'
            }}>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <span className="material-icons" style={{ 
                  fontSize: '64px', 
                  color: '#cbd5e1',
                  marginBottom: '16px'
                }}>
                  analytics
                </span>
                <h4 style={{ color: '#475569', margin: '0 0 8px 0' }}>Выберите оборудование</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                  Кликните на любой элемент схемы слева для просмотра графиков
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessSchema;