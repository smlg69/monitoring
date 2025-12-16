import React from 'react';

function EquipmentCard() {
  const equipmentList = [
    { name: 'Насосная станция №1', system: 'ЖКХ', lastServiceDate: '15.03.2023', status: 'Требует обслуживания' },
    { name: 'Контроллер доступа №5', system: 'СКУД', lastServiceDate: '22.03.2023', status: 'В работе' },
    { name: 'Камера наблюдения №12', system: 'Видеонаблюдение', lastServiceDate: '10.03.2023', status: 'Требует обслуживания' },
    { name: 'Тепловой узел №3', system: 'ЖКХ', lastServiceDate: '18.02.2023', status: 'Плановый осмотр' },
    { name: 'Сервер архивации', system: 'Видеонаблюдение', lastServiceDate: '05.03.2023', status: 'В норме' }
  ];

  return (
    <div className="equipment-card">
      <div className="card-header">
        <span className="material-icons">build</span>
        <h3>Оборудование к обслуживанию</h3>
      </div>
      
      <table className="equipment-table">
        <thead>
          <tr>
            <th>Оборудование</th>
            <th>Система</th>
            <th>Дата последнего обслуживания</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {equipmentList.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.system}</td>
              <td>{item.lastServiceDate}</td>
              <td>
                <span className={`status-badge ${item.status === 'Требует обслуживания' ? 'warning' : 
                                item.status === 'В работе' ? 'info' : 
                                item.status === 'Плановый осмотр' ? 'planned' : 'normal'}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentCard;