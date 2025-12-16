import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccessEquipment } from '../hooks/useAccessEquipment';
import AccessSchema from '../components/Schemas/AccessSchema';
import './SystemPages.css';

function AccessPage() {
  const [activeView, setActiveView] = useState('schema');
  const [equipmentModalOpen, setEquipmentModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [selectedEquipmentDetails, setSelectedEquipmentDetails] = useState(null);

  // Используем хук для оборудования СКУД
  const { 
    equipment: equipmentList, 
    loading, 
    error, 
    addEquipment 
  } = useAccessEquipment();

  // Состояние для формы добавления оборудования
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: 'Контроллер',
    location: '',
    ipAddress: '',
    status: 'Норма'
  });

  const serviceSchedule = [
    { equipment: 'Контроллер доступа №1', type: 'Обновление прошивки', date: '16.06.2023', status: 'Запланировано', responsible: 'Иванов А.С.' },
    { equipment: 'Считыватель №5', type: 'Замена батареи', date: '19.06.2023', status: 'Требует подтверждения', responsible: 'Петров В.И.' },
    { equipment: 'Замок главного входа', type: 'Регулировка', date: '22.06.2023', status: 'Запланировано', responsible: 'Сидоров П.К.' },
  ];

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment({
      ...newEquipment,
      [name]: value
    });
  };

  // Обработчик отправки формы добавления оборудования
  const handleAddEquipment = async (e) => {
    e.preventDefault();
    
    try {
      // Отправляем данные на сервер через хук
      await addEquipment(newEquipment);
      
      // Закрываем модальное окно
      setEquipmentModalOpen(false);
      
      // Сбрасываем форму
      setNewEquipment({
        name: '',
        type: 'Контроллер',
        location: '',
        ipAddress: '',
        status: 'Норма'
      });
      
      alert('Оборудование успешно добавлено!');
    } catch (err) {
      console.error('Ошибка при добавлении оборудования:', err);
      alert('Ошибка при добавлении оборудования');
    }
  };

  // Обработчик клика на оборудование в схеме
  const handleEquipmentClick = (equipmentId) => {
    const equipment = equipmentList.find(eq => eq.id === equipmentId);
    setSelectedEquipmentId(equipmentId);
    setSelectedEquipmentDetails(equipment);
  };

  // Обработчик просмотра истории параметров
  const handleViewHistory = async (equipmentId) => {
    try {
      setHistoryModalOpen(true);
    } catch (err) {
      console.error('Ошибка при загрузке истории:', err);
    }
  };

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
            className={`view-btn ${activeView === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveView('schedule')}
          >
            <span className="material-icons">schedule</span>
            Расписание обслуживания
          </button>
        </div>
      </div>

      {/* Отображение ошибки */}
      {error && (
        <div className="error-message">
          <span className="material-icons">error</span>
          {error}
        </div>
      )}

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
                  <AccessSchema 
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
                      <span className="parameter-label">IP-адрес</span>
                      <span className="parameter-value">{selectedEquipmentDetails.ipAddress || 'Не настроен'}</span>
                    </div>
                    <div className="parameter-item">
                      <span className="parameter-label">Активных пользователей</span>
                      <span className="parameter-value">142</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="monitoring-card">
            <h4>Мониторинг активности</h4>
            <div className="monitoring-stats">
              <div className="monitoring-stat">
                <span className="stat-value">142</span>
                <span className="stat-label">Активных пользователей</span>
              </div>
              <div className="monitoring-stat">
                <span className="stat-value">98.5%</span>
                <span className="stat-label">Доступность</span>
              </div>
              <div className="monitoring-stat">
                <span className="stat-value">24</span>
                <span className="stat-label">Событий за час</span>
              </div>
            </div>
          </div>
        </div>

        <div className="system-right-panel">
          <div className="documentation-card">
            <h4>Рабочая документация</h4>
            <div className="documents-list">
              <div className="document-item">
                <span className="material-icons">description</span>
                <div className="document-info">
                  <span className="document-name">Паспорт оборудования.pdf</span>
                  <span className="document-date">Добавлен: 15.03.2022</span>
                </div>
                <div className="document-actions">
                  <button className="icon-btn-small">
                    <span className="material-icons">visibility</span>
                  </button>
                  <button className="icon-btn-small">
                    <span className="material-icons">download</span>
                  </button>
                </div>
              </div>
              <div className="document-item">
                <span className="material-icons">schema</span>
                <div className="document-info">
                  <span className="document-name">Схема подключения.dwg</span>
                  <span className="document-date">Добавлен: 20.03.2022</span>
                </div>
                <div className="document-actions">
                  <button className="icon-btn-small">
                    <span className="material-icons">visibility</span>
                  </button>
                  <button className="icon-btn-small">
                    <span className="material-icons">download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="equipment-table-card">
            <div className="card-header">
              <h4>Оборудование системы</h4>
              <div className="card-controls">
                <select className="filter-select">
                  <option>Все типы</option>
                  <option>Контроллеры</option>
                  <option>Считыватели</option>
                  <option>Замки</option>
                </select>
                <button 
                  className="add-btn"
                  onClick={() => setEquipmentModalOpen(true)}
                >
                  <span className="material-icons">add</span>
                  Добавить оборудование
                </button>
              </div>
            </div>
            
            {/* Индикатор загрузки */}
            {loading ? (
              <div className="loading-spinner">
                <span className="material-icons">refresh</span>
                Загрузка...
              </div>
            ) : (
              <table className="equipment-table">
                <thead>
                  <tr>
                    <th>Наименование</th>
                    <th>Тип</th>
                    <th>Статус</th>
                    <th>Расположение</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {equipmentList.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>
                        <span className={`status-badge ${
                          item.status === 'Норма' ? 'normal' : 
                          item.status === 'Внимание' ? 'warning' : 'critical'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.location}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="icon-btn-small"
                            onClick={() => handleViewHistory(item.id || index)}
                          >
                            <span className="material-icons">visibility</span>
                          </button>
                          <button className="icon-btn-small">
                            <span className="material-icons">edit</span>
                          </button>
                          <button className="icon-btn-small">
                            <span className="material-icons">settings</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="service-schedule-card">
            <div className="card-header">
              <h4>Расписание обслуживания</h4>
              <div className="period-selector">
                <select className="period-select">
                  <option>Текущая неделя</option>
                  <option>Текущий месяц</option>
                  <option>Текущий квартал</option>
                </select>
              </div>
            </div>

            <div className="timeline">
              <div className="timeline-header">
                <button className="nav-btn">
                  <span className="material-icons">chevron_left</span>
                </button>
                <h5>Июль 2024</h5>
                <button className="nav-btn">
                  <span className="material-icons">chevron_right</span>
                </button>
              </div>
              
              <div className="timeline-grid">
                <div className="week-label">Неделя 1</div>
                <div className="week-label">Неделя 2</div>
                <div className="week-label">Неделя 3</div>
                <div className="week-label">Неделя 4</div>
                
                <div className="timeline-item" style={{gridColumn: 1}}>
                  <div className="timeline-task">
                    Контроллер #1
                    <span className="task-type">Плановое ТО</span>
                  </div>
                </div>
                <div className="timeline-item" style={{gridColumn: 2}}>
                  <div className="timeline-task warning">
                    Считыватель #5
                    <span className="task-type">Замена</span>
                  </div>
                </div>
                <div className="timeline-item" style={{gridColumn: 3}}>
                  <div className="timeline-task">
                    Замок вход
                    <span className="task-type">Проверка</span>
                  </div>
                </div>
              </div>
            </div>

            <table className="service-table">
              <thead>
                <tr>
                  <th>Оборудование</th>
                  <th>Тип обслуживания</th>
                  <th>Планируемая дата</th>
                  <th>Статус</th>
                  <th>Ответственный</th>
                </tr>
              </thead>
              <tbody>
                {serviceSchedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.equipment}</td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    <td>
                      <span className={`status-badge ${
                        item.status === 'Запланировано' ? 'planned' : 
                        item.status === 'Требует подтверждения' ? 'pending' : 'completed'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.responsible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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

      {/* Модальные окна */}
      {equipmentModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Добавление оборудования</h3>
              <button className="close-btn" onClick={() => setEquipmentModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <form onSubmit={handleAddEquipment}>
              <div className="form-group">
                <label>Наименование оборудования</label>
                <input 
                  type="text" 
                  name="name"
                  value={newEquipment.name}
                  onChange={handleInputChange}
                  placeholder="Введите наименование"
                  required
                />
              </div>
              <div className="form-group">
                <label>Тип оборудования</label>
                <select 
                  name="type"
                  value={newEquipment.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Контроллер">Контроллер</option>
                  <option value="Считыватель">Считыватель</option>
                  <option value="Замок">Замок</option>
                  <option value="Сервер">Сервер</option>
                </select>
              </div>
              <div className="form-group">
                <label>Расположение</label>
                <input 
                  type="text" 
                  name="location"
                  value={newEquipment.location}
                  onChange={handleInputChange}
                  placeholder="Введите расположение"
                  required
                />
              </div>
              <div className="form-group">
                <label>IP-адрес</label>
                <input 
                  type="text" 
                  name="ipAddress"
                  value={newEquipment.ipAddress}
                  onChange={handleInputChange}
                  placeholder="Введите IP-адрес"
                />
              </div>
              <div className="form-group">
                <label>Статус</label>
                <select 
                  name="status"
                  value={newEquipment.status}
                  onChange={handleInputChange}
                >
                  <option value="Норма">Норма</option>
                  <option value="Внимание">Внимание</option>
                  <option value="Критично">Критично</option>
                </select>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => setEquipmentModalOpen(false)}
                >
                  Отмена
                </button>
                <button type="submit" className="submit-btn">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {historyModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>История параметров</h3>
              <button className="close-btn" onClick={() => setHistoryModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Параметр</th>
                    <th>Значение</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>25.05.2023 14:30</td>
                    <td>Статус</td>
                    <td>Активен</td>
                    <td><span className="status-badge normal">Норма</span></td>
                  </tr>
                  <tr>
                    <td>25.05.2023 14:28</td>
                    <td>Пользователей</td>
                    <td>142</td>
                    <td><span className="status-badge normal">Норма</span></td>
                  </tr>
                  <tr>
                    <td>25.05.2023 14:25</td>
                    <td>Последняя активность</td>
                    <td>25.05.2023 14:25</td>
                    <td><span className="status-badge normal">Норма</span></td>
                  </tr>
                  <tr>
                    <td>25.05.2023 14:20</td>
                    <td>Батарея</td>
                    <td>85%</td>
                    <td><span className="status-badge normal">Норма</span></td>
                  </tr>
                </tbody>
              </table>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setHistoryModalOpen(false)}>
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {requestModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Создание заявки на обслуживание</h3>
              <button className="close-btn" onClick={() => setRequestModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <form>
              <div className="form-group">
                <label>Оборудование</label>
                <input type="text" placeholder="Выберите оборудование" />
              </div>
              <div className="form-group">
                <label>Тип заявки</label>
                <select>
                  <option>Ремонт</option>
                  <option>Обслуживание</option>
                  <option>Осмотр</option>
                  <option>Обновление ПО</option>
                </select>
              </div>
              <div className="form-group">
                <label>Описание проблемы</label>
                <textarea rows="3" placeholder="Опишите проблему"></textarea>
              </div>
              <div className="form-group">
                <label>Приоритет</label>
                <select>
                  <option>Низкий</option>
                  <option>Средний</option>
                  <option>Высокий</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setRequestModalOpen(false)}>
                  Отмена
                </button>
                <button type="submit" className="submit-btn">
                  Создать заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {settingsModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Настройки оборудования</h3>
              <button className="close-btn" onClick={() => setSettingsModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <form>
              <div className="form-group">
                <label>IP-адрес</label>
                <input type="text" placeholder="Введите IP-адрес" />
              </div>
              <div className="form-group">
                <label>Порт</label>
                <input type="text" placeholder="Введите порт" />
              </div>
              <div className="form-group">
                <label>Частота опроса</label>
                <select>
                  <option>5 секунд</option>
                  <option>10 секунд</option>
                  <option>30 секунд</option>
                  <option>1 минута</option>
                </select>
              </div>
              <div className="form-group">
                <label>Протокол</label>
                <select>
                  <option>TCP</option>
                  <option>UDP</option>
                  <option>HTTP</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <input type="checkbox" id="monitoring" />
                <label htmlFor="monitoring">Включить мониторинг</label>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setSettingsModalOpen(false)}>
                  Отмена
                </button>
                <button type="submit" className="submit-btn">
                  Сохранить настройки
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessPage;