import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SystemPages.css';

function ReportsPage() {
  const [activeTab, setActiveTab] = useState('requests');
  const [ticketsReportOpen, setTicketsReportOpen] = useState(false);
  const [equipmentReportOpen, setEquipmentReportOpen] = useState(false);
  const [kpiReportOpen, setKpiReportOpen] = useState(false);

  const reportsHistory = [
    { name: 'Отчет по заявкам за июнь 2023', type: 'Заявки', period: '01.06.2023 - 30.06.2023', created: '01.07.2023' },
    { name: 'Отчет по заявкам за май 2023', type: 'Заявки', period: '01.05.2023 - 31.05.2023', created: '01.06.2023' },
    { name: 'KPI систем за июнь 2023', type: 'KPI', period: '01.06.2023 - 30.06.2023', created: '01.07.2023' },
    { name: 'KPI систем за май 2023', type: 'KPI', period: '01.05.2023 - 31.05.2023', created: '01.06.2023' },
    { name: 'KPI систем за апрель 2023', type: 'KPI', period: '01.04.2023 - 30.04.2023', created: '01.05.2023' },
    { name: 'Анализ оборудования за 2 квартал 2023', type: 'Оборудование', period: '01.04.2023 - 30.06.2023', created: '05.07.2023' },
    { name: 'Анализ оборудования за 1 квартал 2023', type: 'Оборудование', period: '01.01.2023 - 31.03.2023', created: '05.04.2023' },
    { name: 'Отчет по видеонаблюдению за май 2023', type: 'Видеонаблюдение', period: '01.05.2023 - 31.05.2023', created: '03.06.2023' },
    { name: 'Отчет по СКУД за май 2023', type: 'СКУД', period: '01.05.2023 - 31.05.2023', created: '02.06.2023' },
    { name: 'Отчет по ЖКХ за май 2023', type: 'ЖКХ', period: '01.05.2023 - 31.05.2023', created: '01.06.2023' },
  ];

  return (
    <div className="system-page">
      <div className="system-header-card">
        <div className="system-header-left">
          <span className="material-icons system-main-icon">assessment</span>
          <div>
            <h2>Отчеты и аналитика</h2>
            <p>Генерация и просмотр отчетов по работе систем</p>
          </div>
        </div>
      </div>

      <div className="reports-cards">
        <div className="report-card">
          <div className="report-header">
            <span className="material-icons">summarize</span>
            <h3>Отчет по заявкам</h3>
          </div>
          <p>Статистика по заявкам на обслуживание за выбранный период</p>
          <button className="create-report-btn" onClick={() => setTicketsReportOpen(true)}>
            <span className="material-icons">description</span>
            Создать отчет
          </button>
        </div>

        <div className="report-card">
          <div className="report-header">
            <span className="material-icons">monitoring</span>
            <h3>Отчет по оборудованию</h3>
          </div>
          <p>Анализ работоспособности и статистика отказов оборудования</p>
          <button className="create-report-btn" onClick={() => setEquipmentReportOpen(true)}>
            <span className="material-icons">description</span>
            Создать отчет
          </button>
        </div>

        <div className="report-card">
          <div className="report-header">
            <span className="material-icons">trending_up</span>
            <h3>KPI отчет</h3>
          </div>
          <p>Ключевые показатели эффективности работы систем</p>
          <button className="create-report-btn" onClick={() => setKpiReportOpen(true)}>
            <span className="material-icons">description</span>
            Создать отчет
          </button>
        </div>
      </div>

      <div className="history-card">
        <div className="card-header">
          <h3><span className="material-icons">history</span> История отчетов</h3>
        </div>
        <table className="history-table">
          <thead>
            <tr>
              <th>Название отчета</th>
              <th>Тип</th>
              <th>Период</th>
              <th>Дата создания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {reportsHistory.map((report, index) => (
              <tr key={index}>
                <td>{report.name}</td>
                <td>{report.type}</td>
                <td>{report.period}</td>
                <td>{report.created}</td>
                <td>
                  <button className="icon-btn-small">
                    <span className="material-icons">download</span>
                    Скачать
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <Link to="/access" className="tab">
          <span className="material-icons">sensor_door</span>
          <span>СКУД</span>
        </Link>
        <button className="tab active">
          <span className="material-icons">assessment</span>
          <span>Отчеты</span>
        </button>
      </div>

      {/* Модальные окна отчетов */}
      {ticketsReportOpen && (
        <div className="modal-overlay">
          <div className="modal wide-modal">
            <div className="modal-header">
              <h3><span className="material-icons">summarize</span> Отчет по заявкам</h3>
              <button className="close-btn" onClick={() => setTicketsReportOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <div className="filters-section">
                <h4>Фильтры отчета</h4>
                <div className="filter-grid">
                  <div className="form-group">
                    <label>Период с</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Период по</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Статус заявки</label>
                    <select>
                      <option>Все</option>
                      <option>Новые</option>
                      <option>В работе</option>
                      <option>Завершенные</option>
                      <option>Отмененные</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Тип заявки</label>
                    <select>
                      <option>Все</option>
                      <option>Ремонт</option>
                      <option>Обслуживание</option>
                      <option>Консультация</option>
                    </select>
                  </div>
                </div>
              </div>

              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID заявки</th>
                    <th>Тип</th>
                    <th>Статус</th>
                    <th>Дата создания</th>
                    <th>Приоритет</th>
                    <th>Исполнитель</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#REQ-230601</td>
                    <td>Ремонт</td>
                    <td><span className="status-badge completed">Завершена</span></td>
                    <td>02.06.2023</td>
                    <td><span className="priority-high">Высокий</span></td>
                    <td>Иванов А.С.</td>
                  </tr>
                  <tr>
                    <td>#REQ-230602</td>
                    <td>Обслуживание</td>
                    <td><span className="status-badge in-progress">В работе</span></td>
                    <td>03.06.2023</td>
                    <td><span className="priority-medium">Средний</span></td>
                    <td>Петров В.И.</td>
                  </tr>
                  <tr>
                    <td>#REQ-230603</td>
                    <td>Консультация</td>
                    <td><span className="status-badge new">Новая</span></td>
                    <td>05.06.2023</td>
                    <td><span className="priority-low">Низкий</span></td>
                    <td>Не назначен</td>
                  </tr>
                  <tr>
                    <td>#REQ-230604</td>
                    <td>Ремонт</td>
                    <td><span className="status-badge completed">Завершена</span></td>
                    <td>07.06.2023</td>
                    <td><span className="priority-high">Высокий</span></td>
                    <td>Сидоров П.К.</td>
                  </tr>
                  <tr>
                    <td>#REQ-230605</td>
                    <td>Обслуживание</td>
                    <td><span className="status-badge cancelled">Отменена</span></td>
                    <td>10.06.2023</td>
                    <td><span className="priority-medium">Средний</span></td>
                    <td>Иванов А.С.</td>
                  </tr>
                </tbody>
              </table>

              <div className="export-buttons">
                <button className="export-btn">
                  <span className="material-icons">picture_as_pdf</span>
                  Сохранить в PDF
                </button>
                <button className="export-btn">
                  <span className="material-icons">table_chart</span>
                  Сохранить в XLS
                </button>
                <button className="export-btn">
                  <span className="material-icons">print</span>
                  Печать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {equipmentReportOpen && (
        <div className="modal-overlay">
          <div className="modal wide-modal">
            <div className="modal-header">
              <h3><span className="material-icons">monitoring</span> Отчет по оборудованию</h3>
              <button className="close-btn" onClick={() => setEquipmentReportOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <div className="filters-section">
                <h4>Фильтры отчета</h4>
                <div className="filter-grid">
                  <div className="form-group">
                    <label>Период с</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Период по</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Тип оборудования</label>
                    <select>
                      <option>Все</option>
                      <option>Серверы</option>
                      <option>Сетевое оборудование</option>
                      <option>Видеонаблюдение</option>
                      <option>СКУД</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Статус</label>
                    <select>
                      <option>Все</option>
                      <option>Рабочее</option>
                      <option>На обслуживании</option>
                      <option>Неисправное</option>
                    </select>
                  </div>
                </div>
              </div>

              <table className="report-table">
                <thead>
                  <tr>
                    <th>Оборудование</th>
                    <th>Тип</th>
                    <th>Статус</th>
                    <th>Время работы (ч)</th>
                    <th>Кол-во сбоев</th>
                    <th>Дата последнего ТО</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Сервер #1</td>
                    <td>Сервер</td>
                    <td><span className="status-badge normal">Рабочее</span></td>
                    <td>720</td>
                    <td>0</td>
                    <td>15.05.2023</td>
                  </tr>
                  <tr>
                    <td>Маршрутизатор Core</td>
                    <td>Сетевое</td>
                    <td><span className="status-badge normal">Рабочее</span></td>
                    <td>720</td>
                    <td>1</td>
                    <td>20.04.2023</td>
                  </tr>
                  <tr>
                    <td>Камера Входная</td>
                    <td>Видеонаблюдение</td>
                    <td><span className="status-badge warning">На обслуживании</span></td>
                    <td>650</td>
                    <td>3</td>
                    <td>10.06.2023</td>
                  </tr>
                  <tr>
                    <td>Контроллер СКУД</td>
                    <td>СКУД</td>
                    <td><span className="status-badge normal">Рабочее</span></td>
                    <td>720</td>
                    <td>0</td>
                    <td>05.05.2023</td>
                  </tr>
                  <tr>
                    <td>Сервер #2</td>
                    <td>Сервер</td>
                    <td><span className="status-badge critical">Неисправное</span></td>
                    <td>480</td>
                    <td>5</td>
                    <td>12.03.2023</td>
                  </tr>
                </tbody>
              </table>

              <div className="export-buttons">
                <button className="export-btn">
                  <span className="material-icons">picture_as_pdf</span>
                  Сохранить в PDF
                </button>
                <button className="export-btn">
                  <span className="material-icons">table_chart</span>
                  Сохранить в XLS
                </button>
                <button className="export-btn">
                  <span className="material-icons">print</span>
                  Печать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {kpiReportOpen && (
        <div className="modal-overlay">
          <div className="modal wide-modal">
            <div className="modal-header">
              <h3><span className="material-icons">trending_up</span> KPI отчет</h3>
              <button className="close-btn" onClick={() => setKpiReportOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-content">
              <div className="filters-section">
                <h4>Фильтры отчета</h4>
                <div className="filter-grid">
                  <div className="form-group">
                    <label>Период с</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Период по</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Система</label>
                    <select>
                      <option>Все системы</option>
                      <option>ЖКХ</option>
                      <option>СКУД</option>
                      <option>Видеонаблюдение</option>
                      <option>Серверы</option>
                    </select>
                  </div>
                </div>
              </div>

              <table className="kpi-table">
                <thead>
                  <tr>
                    <th>Показатель</th>
                    <th>Система ЖКХ</th>
                    <th>Система СКУД</th>
                    <th>Видеонаблюдение</th>
                    <th>Серверы</th>
                    <th>Общий</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Доступность (%)</td>
                    <td>99.8%</td>
                    <td>99.5%</td>
                    <td>98.7%</td>
                    <td>99.9%</td>
                    <td>99.5%</td>
                  </tr>
                  <tr>
                    <td>Время реакции (мин)</td>
                    <td>15</td>
                    <td>12</td>
                    <td>18</td>
                    <td>8</td>
                    <td>13.3</td>
                  </tr>
                  <tr>
                    <td>Кол-во инцидентов</td>
                    <td>3</td>
                    <td>5</td>
                    <td>8</td>
                    <td>1</td>
                    <td>17</td>
                  </tr>
                  <tr>
                    <td>Среднее время устранения (ч)</td>
                    <td>2.5</td>
                    <td>1.8</td>
                    <td>3.2</td>
                    <td>4.0</td>
                    <td>2.9</td>
                  </tr>
                  <tr>
                    <td>Удовлетворенность (%)</td>
                    <td>96%</td>
                    <td>94%</td>
                    <td>92%</td>
                    <td>98%</td>
                    <td>95%</td>
                  </tr>
                </tbody>
              </table>

              <div className="export-buttons">
                <button className="export-btn">
                  <span className="material-icons">picture_as_pdf</span>
                  Сохранить в PDF
                </button>
                <button className="export-btn">
                  <span className="material-icons">table_chart</span>
                  Сохранить в XLS
                </button>
                <button className="export-btn">
                  <span className="material-icons">print</span>
                  Печать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportsPage;