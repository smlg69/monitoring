import React from 'react';

function SystemCards() {
  const systems = [
    { icon: 'ac_unit', name: 'Система ЖКХ', status: '98%', activeTickets: 24, avgResponseTime: '2.1ч', completedOnTime: '96%' },
    { icon: 'lock', name: 'Система СКУД', status: '99%', activeTickets: 12, avgResponseTime: '1.8ч', completedOnTime: '98%' },
    { icon: 'videocam', name: 'Видеонаблюдение', status: '97%', activeTickets: 8, avgResponseTime: '2.4ч', completedOnTime: '94%' }
  ];

  return (
    <div className="dashboard-cards">
      {systems.map((system, index) => (
        <div className="system-card" key={index}>
          <div className="system-header">
            <span className="material-icons system-icon">{system.icon}</span>
            <h3>{system.name}</h3>
          </div>
          
          <div className="system-stats">
            <div className="stat-main">
              <span className="stat-value">{system.status}</span>
              <span className="stat-label">Работоспособность</span>
            </div>
            
            <div className="stat-grid">
              <div className="stat-item">
                <span className="stat-number">{system.activeTickets}</span>
                <span className="stat-desc">Активные заявки</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-number">{system.avgResponseTime}</span>
                <span className="stat-desc">Ср. время реакции</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-number">{system.completedOnTime}</span>
                <span className="stat-desc">Выполнено в срок</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SystemCards;