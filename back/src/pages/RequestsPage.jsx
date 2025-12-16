import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SystemPages.css';

function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState('created');
  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false);
  const [viewRequestModalOpen, setViewRequestModalOpen] = useState(false);
  const [takeRequestModalOpen, setTakeRequestModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [closeRequestModalOpen, setCloseRequestModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const createdRequests = [
    { id: '#00123', type: 'Обслуживание', equipment: 'Контроллер доступа №5', description: 'Необходимо провести плановое обслуживание контроллера', status: 'Создана', date: '24.05.2023', priority: 'Средний' },
    { id: '#00125', type: 'Замена', equipment: 'Камера наблюдения №12', description: 'Требуется замена неисправной камеры', status: 'Создана', date: '26.05.2023', priority: 'Высокий' },
    { id: '#00126', type: 'Ремонт', equipment: 'Тепловой узел №3', description: 'Протечка в системе отопления', status: 'Создана', date: '27.05.2023', priority: 'Высокий' },
    { id: '#00130', type: 'Настройка', equipment: 'Сервер видеонаблюдения', description: 'Настройка расписания записи', status: 'Создана', date: '29.05.2023', priority: 'Низкий' },
    { id: '#00131', type: 'Обслуживание', equipment: 'Система вентиляции', description: 'Замена фильтров в системе вентиляции', status: 'Создана', date: '30.05.2023', priority: 'Средний' },
    { id: '#00132', type: 'Ремонт', equipment: 'Электрощитовая №2', description: 'Нестабильное напряжение в сети', status: 'Создана', date: '31.05.2023', priority: 'Высокий' },
    { id: '#00133', type: 'Замена', equipment: 'Датчик температуры', description: 'Замена неисправного датчика в коридоре 3 этажа', status: 'Создана', date: '01.06.2023', priority: 'Средний' },
    { id: '#00134', type: 'Настройка', equipment: 'СКУД главного входа', description: 'Добавление новых сотрудников в систему', status: 'Создана', date: '02.06.2023', priority: 'Низкий' },
  ];

  const inProgressRequests = [
    { id: '#00124', type: 'Ремонт', equipment: 'Насосная станция №1', description: 'Неисправность насоса подачи воды', status: 'В работе', engineer: 'Петров И.С.' },
    { id: '#00127', type: 'Настройка', equipment: 'Сервер архивации', description: 'Настройка резервного копирования', status: 'В работе', engineer: 'Сидоров А.В.' },
    { id: '#00128', type: 'Обслуживание', equipment: 'Кондиционеры 4 этажа', description: 'Плановое техническое обслуживание', status: 'В работе', engineer: 'Козлов Д.М.' },
    { id: '#00129', type: 'Ремонт', equipment: 'Система пожарной сигнализации', description: 'Ложные срабатывания датчиков', status: 'В работе', engineer: 'Федоров С.П.' },
    { id: '#00135', type: 'Замена', equipment: 'Светильники в холле', description: 'Замена светодиодных ламп', status: 'В работе', engineer: 'Николаев В.Г.' },
    { id: '#00136', type: 'Настройка', equipment: 'Сетевое оборудование', description: 'Оптимизация настроек маршрутизатора', status: 'В работе', engineer: 'Белов А.К.' },
  ];

  const closedRequests = [
    { id: '#00122', type: 'Замена', equipment: 'Камера наблюдения №12', description: 'Замена неисправной камеры наблюдения', status: 'Закрыта', date: '22.05.2023', engineer: 'Иванов П.К.' },
    { id: '#00120', type: 'Обслуживание', equipment: 'Система отопления', description: 'Плановый осмотр и настройка', status: 'Закрыта', date: '20.05.2023', engineer: 'Смирнов А.Л.' },
    { id: '#00119', type: 'Ремонт', equipment: 'Лифт №2', description: 'Устранение неисправности дверей', status: 'Закрыта', date: '18.05.2023', engineer: 'Васильев М.С.' },
    { id: '#00118', type: 'Настройка', equipment: 'Система контроля доступа', description: 'Обновление firmware контроллеров', status: 'Закрыта', date: '15.05.2023', engineer: 'Попов Д.В.' },
  ];

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setViewRequestModalOpen(true);
  };

  const handleTakeRequest = (request) => {
    setSelectedRequest(request);
    setTakeRequestModalOpen(true);
  };

  const handleUpdateProgress = (request) => {
    setSelectedRequest(request);
    setProgressModalOpen(true);
  };

  const handleCloseRequest = (request) => {
    setSelectedRequest(request);
    setCloseRequestModalOpen(true);
  };

  return (
    <div className="system-page">
      <div className="system-header-card">
        <div className="system-header-left">
          <span className="material-icons system-main-icon">assignment</span>
          <div>
            <h2>Заявки на обслуживание</h2>
            <p>Управление и отслеживание заявок на обслуживание оборудования</p>
          </div>
        </div>
        <div className="system-header-right">
          <button className="add-btn" onClick={() => setNewRequestModalOpen(true)}>
            <span className="material-icons">add</span>
            Создать новую заявку
          </button>
          <div className="search-box">
            <input type="text" placeholder="Поиск..." />
            <span className="material-icons">search</span>
          </div>
        </div>
      </div>

      <div className="status-tabs">
        <button 
          className={`status-tab ${statusFilter === 'created' ? 'active' : ''}`}
          onClick={() => setStatusFilter('created')}
        >
          Созданы ({createdRequests.length})
        </button>
        <button 
          className={`status-tab ${statusFilter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setStatusFilter('in-progress')}
        >
          В работе ({inProgressRequests.length})
        </button>
        <button 
          className={`status-tab ${statusFilter === 'closed' ? 'active' : ''}`}
          onClick={() => setStatusFilter('closed')}
        >
          Закрыты ({closedRequests.length})
        </button>
      </div>

      {statusFilter === 'created' && (
        <div className="requests-table-card">
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Тип заявки</th>
                <th>Оборудование</th>
                <th>Описание</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th>Приоритет</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {createdRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.id}</td>
                  <td>{request.type}</td>
                  <td>{request.equipment}</td>
                  <td>{request.description}</td>
                  <td><span className="status-badge new">{request.status}</span></td>
                  <td>{request.date}</td>
                  <td>
                    <span className={`priority-badge ${request.priority === 'Высокий' ? 'high' : request.priority === 'Средний' ? 'medium' : 'low'}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn-small" onClick={() => handleViewRequest(request)}>
                        <span className="material-icons">visibility</span>
                      </button>
                      <button className="icon-btn-small" onClick={() => handleTakeRequest(request)}>
                        <span className="material-icons">play_arrow</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {statusFilter === 'in-progress' && (
        <div className="requests-table-card">
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Тип заявки</th>
                <th>Оборудование</th>
                <th>Описание</th>
                <th>Статус</th>
                <th>Инженер</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {inProgressRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.id}</td>
                  <td>{request.type}</td>
                  <td>{request.equipment}</td>
                  <td>{request.description}</td>
                  <td><span className="status-badge in-progress">{request.status}</span></td>
                  <td>{request.engineer}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn-small" onClick={() => handleViewRequest(request)}>
                        <span className="material-icons">visibility</span>
                      </button>
                      <button className="icon-btn-small" onClick={() => handleUpdateProgress(request)}>
                        <span className="material-icons">update</span>
                      </button>
                      <button className="icon-btn-small" onClick={() => handleCloseRequest(request)}>
                        <span className="material-icons">check</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {statusFilter === 'closed' && (
        <div className="requests-table-card">
          <table className="requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Тип заявки</th>
                <th>Оборудование</th>
                <th>Описание</th>
                <th>Статус</th>
                <th>Дата закрытия</th>
                <th>Инженер</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {closedRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.id}</td>
                  <td>{request.type}</td>
                  <td>{request.equipment}</td>
                  <td>{request.description}</td>
                  <td><span className="status-badge completed">{request.status}</span></td>
                  <td>{request.date}</td>
                  <td>{request.engineer}</td>
                  <td>
                    <button className="icon-btn-small" onClick={() => handleViewRequest(request)}>
                      <span className="material-icons">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <Link to="/access" className="tab">
          <span className="material-icons">sensor_door</span>
          <span>СКУД</span>
        </Link>
        <button className="tab active">
          <span className="material-icons">assignment</span>
          <span>Заявки</span>
        </button>
      </div>

      {/* Модальные окна */}
      {newRequestModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Создание новой заявки</h3>
              <button className="close-btn" onClick={() => setNewRequestModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <form>
              <div className="form-group">
                <label>Тип заявки</label>
                <select>
                  <option>Выберите тип</option>
                  <option>Обслуживание</option>
                  <option>Ремонт</option>
                  <option>Замена</option>
                  <option>Настройка</option>
                </select>
              </div>
              <div className="form-group">
                <label>Оборудование</label>
                <input type="text" placeholder="Введите оборудование" />
              </div>
              <div className="form-group">
                <label>Приоритет</label>
                <select>
                  <option>Выберите приоритет</option>
                  <option>Низкий</option>
                  <option>Средний</option>
                  <option>Высокий</option>
                </select>
              </div>
              <div className="form-group">
                <label>Описание проблемы</label>
                <textarea rows="4" placeholder="Опишите проблему"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setNewRequestModalOpen(false)}>
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

      {viewRequestModalOpen && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Просмотр заявки {selectedRequest.id}</h3>
              <button className="close-btn" onClick={() => setViewRequestModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="request-details">
              <div className="detail-item">
                <span className="detail-label">Тип заявки:</span>
                <span className="detail-value">{selectedRequest.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Оборудование:</span>
                <span className="detail-value">{selectedRequest.equipment}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Описание:</span>
                <span className="detail-value">{selectedRequest.description}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Статус:</span>
                <span className="detail-value">
                  <span className={`status-badge ${
                    selectedRequest.status === 'Создана' ? 'new' : 
                    selectedRequest.status === 'В работе' ? 'in-progress' : 'completed'
                  }`}>
                    {selectedRequest.status}
                  </span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Приоритет:</span>
                <span className="detail-value">
                  <span className={`priority-badge ${
                    selectedRequest.priority === 'Высокий' ? 'high' : 
                    selectedRequest.priority === 'Средний' ? 'medium' : 'low'
                  }`}>
                    {selectedRequest.priority}
                  </span>
                </span>
              </div>
              {selectedRequest.date && (
                <div className="detail-item">
                  <span className="detail-label">Дата создания:</span>
                  <span className="detail-value">{selectedRequest.date}</span>
                </div>
              )}
              {selectedRequest.engineer && (
                <div className="detail-item">
                  <span className="detail-label">Инженер:</span>
                  <span className="detail-value">{selectedRequest.engineer}</span>
                </div>
              )}
              {selectedRequest.closedDate && (
                <div className="detail-item">
                  <span className="detail-label">Дата закрытия:</span>
                  <span className="detail-value">{selectedRequest.closedDate}</span>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setViewRequestModalOpen(false)}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {takeRequestModalOpen && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Взять заявку в работу</h3>
              <button className="close-btn" onClick={() => setTakeRequestModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <p>Вы уверены, что хотите взять заявку {selectedRequest.id} в работу?</p>
              <div className="form-group">
                <label>Назначить инженера</label>
                <select>
                  <option>Петров И.С.</option>
                  <option>Сидоров А.В.</option>
                  <option>Козлов Д.М.</option>
                  <option>Федоров С.П.</option>
                  <option>Николаев В.Г.</option>
                  <option>Белов А.К.</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setTakeRequestModalOpen(false)}>
                  Отмена
                </button>
                <button type="button" className="submit-btn" onClick={() => setTakeRequestModalOpen(false)}>
                  Взять в работу
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {progressModalOpen && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Обновление прогресса заявки {selectedRequest.id}</h3>
              <button className="close-btn" onClick={() => setProgressModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <form>
              <div className="form-group">
                <label>Статус выполнения</label>
                <select>
                  <option>В работе</option>
                  <option>На паузе</option>
                  <option>Ожидание запчастей</option>
                </select>
              </div>
              <div className="form-group">
                <label>Процент выполнения</label>
                <input type="range" min="0" max="100" defaultValue="50" />
                <span className="percentage">50%</span>
              </div>
              <div className="form-group">
                <label>Комментарии к прогрессу</label>
                <textarea rows="3" placeholder="Добавьте комментарий"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setProgressModalOpen(false)}>
                  Отмена
                </button>
                <button type="submit" className="submit-btn">
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {closeRequestModalOpen && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Закрытие заявки {selectedRequest.id}</h3>
              <button className="close-btn" onClick={() => setCloseRequestModalOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <p>Вы уверены, что хотите закрыть заявку {selectedRequest.id}?</p>
              <div className="form-group">
                <label>Решение проблемы</label>
                <textarea rows="3" placeholder="Опишите решение проблемы"></textarea>
              </div>
              <div className="form-group">
                <label>Дополнительные заметки</label>
                <textarea rows="3" placeholder="Добавьте заметки"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setCloseRequestModalOpen(false)}>
                  Отмена
                </button>
                <button type="button" className="submit-btn" onClick={() => setCloseRequestModalOpen(false)}>
                  Закрыть заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestsPage;