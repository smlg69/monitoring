import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CalendarCard({ onAddTask }) {
  const [activeView, setActiveView] = useState('calendar');
  const [selectedStatus, setSelectedStatus] = useState('Все');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('Все');
  const [selectedResponsible, setSelectedResponsible] = useState('Все');

  const calendarTasks = [
    { day: 2, title: 'ТО-1: Вент. установка' },
    { day: 8, title: 'Проверка СКУД' },
    { day: 10, title: 'Диагностика чиллера' },
    { day: 10, title: 'Ремонт насоса' },
    { day: 18, title: 'Замена фильтров' }
  ];

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <div className="calendar-header-left">
          <span className="material-icons">calendar_today</span>
          <h3>Регламент обслуживания оборудования</h3>
          <span className="subtitle">Просмотр и управление плановыми работами</span>
        </div>
        
        <div className="calendar-controls">
          <div className="view-switch">
            <button 
              className={`view-btn ${activeView === 'calendar' ? 'active' : ''}`} 
              onClick={() => setActiveView('calendar')}
            >
              Календарь
            </button>
            <button 
              className={`view-btn ${activeView === 'list' ? 'active' : ''}`} 
              onClick={() => setActiveView('list')}
            >
              Список
            </button>
          </div>
          
          <div className="filters">
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option>Статус expand_more</option>
              <option>Все</option>
              <option>Запланировано</option>
              <option>В работе</option>
              <option>Завершено</option>
            </select>
            
            <select value={selectedEquipmentType} onChange={(e) => setSelectedEquipmentType(e.target.value)}>
              <option>Тип оборудования expand_more</option>
              <option>Все</option>
              <option>ЖКХ</option>
              <option>СКУД</option>
              <option>Видеонаблюдение</option>
            </select>
            
            <select value={selectedResponsible} onChange={(e) => setSelectedResponsible(e.target.value)}>
              <option>Ответственный expand_more</option>
              <option>Все</option>
              <option>Иванов А.С.</option>
              <option>Петров В.И.</option>
              <option>Сидоров П.К.</option>
            </select>
          </div>
          
          <button className="add-task-btn" onClick={onAddTask}>
            <span className="material-icons">add</span>
            Новая задача
          </button>
        </div>
      </div>
      
      <div className="calendar-container">
        <div className="calendar-navigation">
          <button className="nav-btn">
            <span className="material-icons">chevron_left</span>
          </button>
          
          <h4>Октябрь 2024</h4>
          
          <button className="nav-btn">
            <span className="material-icons">chevron_right</span>
          </button>
          
          <button className="today-btn">Сегодня</button>
        </div>
        
        <div className="weekdays">
          <div className="weekday">Пн</div>
          <div className="weekday">Вт</div>
          <div className="weekday">Ср</div>
          <div className="weekday">Чт</div>
          <div className="weekday">Пт</div>
          <div className="weekday">Сб</div>
          <div className="weekday">Вс</div>
        </div>
        
        <div className="calendar-grid">
          {/* Дни предыдущего месяца */}
          <div className="calendar-day other-month">30</div>
          
          {/* Дни октября */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const taskForDay = calendarTasks.filter(task => task.day === day);
            return (
              <div className="calendar-day" key={day}>
                <span className={`day-number ${day === 9 ? 'today' : ''}`}>{day}</span>
                {taskForDay.map((task, idx) => (
                  <div className="calendar-task" key={idx}>{task.title}</div>
                ))}
              </div>
            );
          })}
          
          {/* Дни следующего месяца */}
          <div className="calendar-day other-month">1</div>
          <div className="calendar-day other-month">2</div>
          <div className="calendar-day other-month">3</div>
        </div>
      </div>
      
      <div className="bottom-tabs">
        <Link to="/" className="tab active">
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
        <Link to="/cctv" className="tab">
          <span className="material-icons">videocam</span>
          <span>Видео</span>
        </Link>
      </div>
    </div>
  );
}

export default CalendarCard;