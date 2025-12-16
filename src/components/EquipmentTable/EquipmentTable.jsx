// src/components/EquipmentTable/EquipmentTable.jsx
import React from 'react';

const EquipmentTable = ({ equipment, loading, error, title }) => {
  if (loading) {
    return (
      <div className="equipment-table-card">
        <div className="loading-spinner">
          <span className="material-icons spin">sync</span>
          Загрузка оборудования...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="equipment-table-card">
        <div className="error-message">
          <span className="material-icons">error</span>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="equipment-table-card">
      <div className="card-header">
        <h4>{title}</h4>
        <div className="card-controls">
          <div className="items-count">
            Всего: {equipment.length} единиц
          </div>
        </div>
      </div>

      {equipment.length === 0 ? (
        <div className="no-data">
          <span className="material-icons">info</span>
          <p>Нет данных об оборудовании</p>
        </div>
      ) : (
        <table className="equipment-table">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Тип</th>
              <th>Статус</th>
              <th>Расположение</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item, index) => (
              <tr key={item.id || index}>
                <td>
                  <strong>{item.name || `Оборудование ${index + 1}`}</strong>
                  {item.id && <div className="equipment-id">ID: {item.id}</div>}
                </td>
                <td>{item.type || 'Не указан'}</td>
                <td>
                  <span className={`status-badge ${
                    item.status === 'active' || item.status === 'Активен' || item.status === 'Норма' ? 'normal' : 
                    item.status === 'warning' || item.status === 'Внимание' ? 'warning' : 
                    item.status === 'critical' || item.status === 'Критично' ? 'critical' : 'unknown'
                  }`}>
                    {item.status || 'Неизвестно'}
                  </span>
                </td>
                <td>{item.location || 'Не указано'}</td>
                <td>{item.description || 'Нет описания'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EquipmentTable;