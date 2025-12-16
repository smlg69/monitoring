// src/components/Schemas/AccessSchema/EquipmentChart/EquipmentChart.jsx
import React from 'react';
import { useEquipmentChart } from './useEquipmentChart';
import './EquipmentChart.css';

const EquipmentChart = ({ equipment, onClose }) => {
  const { chartData, loading, error } = useEquipmentChart(equipment);
  const equipmentName = equipment?.name || 'Неизвестное оборудование';

  return (
    <div className="equipment-chart-full">
      <div className="chart-header">
        <div className="header-left">
          <button className="back-btn" onClick={onClose}>
            <span className="material-icons">arrow_back</span>
            Назад к схеме
          </button>
          <div className="header-title">
            <h3>Аналитика оборудования</h3>
            <p>Графики параметров в реальном времени</p>
          </div>
        </div>
        <div className="header-right">
          <button className="header-btn">
            <span className="material-icons">refresh</span>
            Обновить
          </button>
          <button className="header-btn">
            <span className="material-icons">download</span>
            Экспорт
          </button>
        </div>
      </div>

      <div className="equipment-details-card">
        <div className="equipment-main-info">
          <div className="equipment-icon">
            <span className="material-icons">sensors</span>
          </div>
          <div className="equipment-text-info">
            <h4>{equipmentName}</h4>
            <div className="equipment-meta">
              <span className="meta-item">
                <span className="meta-label">Тип:</span>
                <span className="meta-value">{equipment?.type || 'Не указан'}</span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Статус:</span>
                <span className={`meta-value status-${equipment?.status?.toLowerCase() || 'unknown'}`}>
                  {equipment?.status || 'Неизвестно'}
                </span>
              </span>
              <span className="meta-item">
                <span className="meta-label">Расположение:</span>
                <span className="meta-value">{equipment?.location || 'Не указано'}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="equipment-stats">
          <div className="stat-card">
            <span className="stat-label">Температура</span>
            <span className="stat-value">42°C</span>
            <span className="stat-trend up">+2°C</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Нагрузка</span>
            <span className="stat-value">78%</span>
            <span className="stat-trend down">-5%</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Ошибки</span>
            <span className="stat-value">2</span>
            <span className="stat-trend stable">=</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Время работы</span>
            <span className="stat-value">14д 6ч</span>
            <span className="stat-trend up">+2ч</span>
          </div>
        </div>
      </div>

      <div className="charts-container">
        {loading ? (
          <div className="chart-loading">
            <span className="material-icons spin">sync</span>
            Загрузка данных графиков...
          </div>
        ) : error ? (
          <div className="chart-error">
            <span className="material-icons">error</span>
            <div>
              <h5>Ошибка загрузки</h5>
              <p>{error}</p>
            </div>
          </div>
        ) : chartData ? (
          <>
            {/* Основной график - Температура */}
            <div className="main-chart-card">
              <div className="chart-card-header">
                <h4>Температура оборудования</h4>
                <div className="chart-period">
                  <button className="period-btn active">24ч</button>
                  <button className="period-btn">7д</button>
                  <button className="period-btn">30д</button>
                </div>
              </div>
              <div className="chart-visual-large">
                {/* Здесь будет большой SVG график */}
                <div className="chart-placeholder-large">
                  <div className="chart-grid">
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                    <div className="grid-line"></div>
                  </div>
                  <div className="chart-line">
                    {/* Имитация линии графика */}
                    <svg width="100%" height="100%" viewBox="0 0 100 60">
                      <path d="M0,50 L10,45 L20,48 L30,40 L40,35 L50,30 L60,25 L70,20 L80,22 L90,18 L100,15" 
                            fill="none" stroke="#3b82f6" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="chart-labels">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>23:59</span>
                  </div>
                </div>
              </div>
              <div className="chart-stats">
                <div className="chart-stat">
                  <span className="stat-label">Средняя:</span>
                  <span className="stat-value">38°C</span>
                </div>
                <div className="chart-stat">
                  <span className="stat-label">Максимум:</span>
                  <span className="stat-value">52°C</span>
                </div>
                <div className="chart-stat">
                  <span className="stat-label">Минимум:</span>
                  <span className="stat-value">22°C</span>
                </div>
              </div>
            </div>

            {/* Второй ряд - Мини графики */}
            <div className="mini-charts-row">
              <div className="mini-chart-card">
                <h5>Загрузка ЦП (%)</h5>
                <div className="mini-chart-visual">
                  <div className="bar-chart">
                    {[65, 78, 82, 70, 85, 78, 90].map((value, i) => (
                      <div key={i} className="bar" style={{height: `${value}%`}}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mini-chart-card">
                <h5>Использование памяти</h5>
                <div className="mini-chart-visual">
                  <div className="donut-chart">
                    <div className="donut-segment" style={{'--percentage': '65'}}></div>
                    <div className="donut-center">65%</div>
                  </div>
                </div>
              </div>
              
              <div className="mini-chart-card">
                <h5>Ошибки за день</h5>
                <div className="mini-chart-visual">
                  <div className="error-chart">
                    <div className="error-bar low"></div>
                    <div className="error-bar medium"></div>
                    <div className="error-bar high"></div>
                    <div className="error-bar low"></div>
                    <div className="error-bar medium"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Таблица данных */}
            <div className="data-table-card">
              <h5>История параметров</h5>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Время</th>
                      <th>Температура</th>
                      <th>Нагрузка</th>
                      <th>Ошибки</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.slice(0, 8).map((item, index) => (
                      <tr key={index}>
                        <td>{item.time}</td>
                        <td>{item.value}°C</td>
                        <td>{Math.floor(Math.random() * 30 + 70)}%</td>
                        <td>{Math.floor(Math.random() * 5)}</td>
                        <td>
                          <span className={`status-badge ${item.status}`}>
                            {item.status === 'normal' ? 'Норма' : 'Внимание'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="no-data">
            <span className="material-icons">insights</span>
            <h5>Нет данных для отображения</h5>
            <p>Данные об оборудовании отсутствуют или недоступны</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentChart;