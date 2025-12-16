import React from 'react';

function KPICard() {
  return (
    <div className="kpi-card">
      <div className="card-header">
        <span className="material-icons">trending_up</span>
        <h3>KPI по заявкам на обслуживание</h3>
      </div>
      
      <div className="kpi-stats">
        <div className="kpi-item">
          <span className="kpi-value">44</span>
          <span className="kpi-label">Всего активных заявок</span>
        </div>
        
        <div className="kpi-item">
          <span className="kpi-value">2.1ч</span>
          <span className="kpi-label">Среднее время реакции</span>
        </div>
        
        <div className="kpi-item">
          <span className="kpi-value">96%</span>
          <span className="kpi-label">Выполнено в срок</span>
        </div>
        
        <div className="kpi-item">
          <span className="kpi-value">3</span>
          <span className="kpi-label">Критических инцидентов</span>
        </div>
      </div>
    </div>
  );
}

export default KPICard;