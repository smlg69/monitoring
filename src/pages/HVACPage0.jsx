import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SystemPages.css';

function HVACPage() {
  const [activeView, setActiveView] = useState('schema');
  const [equipmentModalOpen, setEquipmentModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const equipmentList = [
    { name: 'Насосная станция №1', type: 'Насосное оборудование', status: 'Норма', location: 'Подвал, секция А' },
    { name: 'Тепловой узел №3', type: 'Тепловой узел', status: 'Внимание', location: 'Цокольный этаж' },
    { name: 'Вентиляционная установка', type: 'Вентиляция', status: 'Норма', location: 'Крыша, блок Б' },
  ];

  const serviceSchedule = [
    { equipment: 'Насосная станция №1', type: 'Регламентное обслуживание', date: '15.06.2023', status: 'Запланировано', responsible: 'Иванов А.С.' },
    { equipment: 'Тепловой узел №3', type: 'Замена фильтра', date: '18.06.2023', status: 'Требует подтверждения', responsible: 'Петров В.И.' },
    { equipment: 'Вентиляционная установка', type: 'Чистка фильтров', date: '20.06.2023', status: 'Запланировано', responsible: 'Сидоров П.К.' },
  ];

  return (
    <div className="system-page">
      <div className="system-header-card">
        <div className="system-header-left">
          <span className="material-icons system-main-icon">ac_unit</span>
          <div>
            <h2>Система ЖКХ - Управление и мониторинг</h2>
            <p>Мониторинг параметров и управление системой ЖКХ</p>
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
            <p className="hint">Выберите узел на схеме для просмотра параметров</p>
            <div className="parameters-placeholder">
              <span className="material-icons">info</span>
              <p>Выберите оборудование для отображения параметров</p>
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
                  <option>Насосное оборудование</option>
                  <option>Клапаны</option>
                  <option>Датчики</option>
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
                  <tr key={index}>
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
                          onClick={() => setHistoryModalOpen(true)}
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
                    Котел #2
                    <span className="task-type">Плановое ТО</span>
                  </div>
                </div>
                <div className="timeline-item" style={{gridColumn: 2}}>
                  <div className="timeline-task warning">
                    Насос #1
                    <span className="task-type">Замена</span>
                  </div>
                </div>
                <div className="timeline-item" style={{gridColumn: 3}}>
                  <div className="timeline-task">
                    Вент. #5
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
        <button className="tab active">
          <span className="material-icons">handyman</span>
          <span>ЖКХ</span>
        </button>
        <Link to="/access" className="tab">
          <span className="material-icons">sensor_door</span>
          <span>СКУД</span>
        </Link>
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
            <form>
              <div className="form-group">
                <label>Наименование оборудования</label>
                <input type="text" placeholder="Введите наименование" />
              </div>
              <div className="form-group">
                <label>Тип оборудования</label>
                <select>
                  <option>Насосное оборудование</option>
                  <option>Клапан</option>
                  <option>Датчик</option>
                  <option>Тепловой узел</option>
                  <option>Вентиляция</option>
                </select>
              </div>
              <div className="form-group">
                <label>Расположение</label>
                <input type="text" placeholder="Введите расположение" />
              </div>
              <div className="form-group">
                <label>Параметры</label>
                <input type="text" placeholder="Введите параметры" />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setEquipmentModalOpen(false)}>
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
                    <td>Давление</td>
                    <td>4.2 бар</td>
                    <td><span className="status-badge normal">Норма</span></td>
                  </tr>
                  <tr>
                    <td>25.05.2023 14:28</td>
                    <td>Температура</td>
                    <td>65°C</td>
                    <td><span className="status-badge normal">Норма</span></td>
                  </tr>
                  <tr>
                    <td>25.05.2023 14:25</td>
                    <td>Расход</td>
                    <td>12.5 м³/ч</td>
                    <td><span className="status-badge normal">Норма</span></td>
                  </tr>
                  <tr>
                    <td>25.05.2023 14:20</td>
                    <td>Давление</td>
                    <td>3.8 бар</td>
                    <td><span className="status-badge warning">Внимание</span></td>
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
                  <option>Калибровка</option>
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
                  <option>Критический</option>
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
                <label>Пороговые значения</label>
                <div className="thresholds">
                  <input type="text" placeholder="Минимум" />
                  <input type="text" placeholder="Максимум" />
                </div>
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

export default HVACPage;