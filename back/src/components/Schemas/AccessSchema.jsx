import React from 'react';

function AccessSchema({ equipment = [], selectedEquipmentId, onEquipmentClick }) {
  const getEquipmentStatus = (id) => {
    const eq = equipment.find(e => e.id === id);
    return eq ? eq.status : 'unknown';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Норма':
      case 'active':
        return '#10b981'; // зеленый
      case 'Внимание':
      case 'warning':
        return '#f59e0b'; // желтый
      case 'Критично':
      case 'critical':
        return '#ef4444'; // красный
      default:
        return '#94a3b8'; // серый
    }
  };

  return (
    <div className="schema-container">
      <svg viewBox="0 0 800 500" className="schema-svg">
        {/* Фон - план здания */}
        <rect x="0" y="0" width="800" height="500" fill="#f8fafc" />
        
        {/* Стены */}
        <rect x="100" y="100" width="600" height="300" fill="none" stroke="#cbd5e1" strokeWidth="3" />
        
        {/* Главный вход */}
        <g 
          className={`schema-element ${selectedEquipmentId === 1 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(1)}
        >
          {/* Дверь */}
          <rect x="350" y="100" width="100" height="150" rx="2"
                fill={getStatusColor(getEquipmentStatus(1))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(1))} strokeWidth="2" />
          {/* Контроллер */}
          <rect x="370" y="260" width="60" height="40" rx="4"
                fill={getStatusColor(getEquipmentStatus(1))} fillOpacity="0.3"
                stroke={getStatusColor(getEquipmentStatus(1))} strokeWidth="2" />
          <text x="400" y="90" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="500">
            Главный вход
          </text>
          <text x="400" y="290" textAnchor="middle" fill="#64748b" fontSize="12">
            Контроллер #1
          </text>
        </g>

        {/* Считыватель */}
        <g 
          className={`schema-element ${selectedEquipmentId === 2 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(2)}
        >
          <circle cx="380" cy="170" r="15"
                  fill={getStatusColor(getEquipmentStatus(2))} fillOpacity="0.3"
                  stroke={getStatusColor(getEquipmentStatus(2))} strokeWidth="2" />
          <text x="380" y="155" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            RFID
          </text>
        </g>

        {/* Запасной выход */}
        <g 
          className={`schema-element ${selectedEquipmentId === 3 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(3)}
        >
          <rect x="100" y="200" width="80" height="100" rx="2"
                fill={getStatusColor(getEquipmentStatus(3))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(3))} strokeWidth="2" />
          <text x="140" y="190" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Запасной выход
          </text>
        </g>

        {/* Серверная */}
        <g 
          className={`schema-element ${selectedEquipmentId === 4 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(4)}
        >
          <rect x="600" y="150" width="80" height="100" rx="4"
                fill={getStatusColor(getEquipmentStatus(4))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(4))} strokeWidth="2" />
          <text x="640" y="140" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Серверная
          </text>
          {/* Сервер */}
          <rect x="610" y="170" width="60" height="20" rx="2" fill={getStatusColor(getEquipmentStatus(4))} />
          <rect x="610" y="195" width="60" height="20" rx="2" fill={getStatusColor(getEquipmentStatus(4))} />
        </g>

        {/* Лифт */}
        <g 
          className={`schema-element ${selectedEquipmentId === 5 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(5)}
        >
          <rect x="200" y="150" width="60" height="100" rx="4"
                fill={getStatusColor(getEquipmentStatus(5))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(5))} strokeWidth="2" />
          <text x="230" y="140" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Лифт
          </text>
        </g>

        {/* Коридор */}
        <rect x="200" y="200" width="400" height="50" fill="#f1f5f9" />
        
        {/* Офис 1 */}
        <g 
          className={`schema-element ${selectedEquipmentId === 6 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(6)}
        >
          <rect x="200" y="100" width="100" height="80" rx="4"
                fill={getStatusColor(getEquipmentStatus(6))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(6))} strokeWidth="2" />
          <text x="250" y="90" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Офис 101
          </text>
        </g>

        {/* Офис 2 */}
        <g 
          className={`schema-element ${selectedEquipmentId === 7 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(7)}
        >
          <rect x="500" y="100" width="100" height="80" rx="4"
                fill={getStatusColor(getEquipmentStatus(7))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(7))} strokeWidth="2" />
          <text x="550" y="90" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Офис 102
          </text>
        </g>

        {/* Соединительные линии */}
        <path d="M180,200 L100,200" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M300,200 L350,200" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M450,200 L500,200" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M600,200 L620,200" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Статусы оборудования */}
        <g transform="translate(20, 400)">
          <text x="0" y="-10" fill="#1e293b" fontSize="14" fontWeight="500">Статусы:</text>
          {equipment.slice(0, 4).map((eq, index) => (
            <g key={eq.id} transform={`translate(0, ${index * 25})`}>
              <circle cx="0" cy="0" r="6" fill={getStatusColor(eq.status)} />
              <text x="15" y="4" fill="#1e293b" fontSize="12">
                {eq.name}: {eq.status}
              </text>
            </g>
          ))}
        </g>

        {/* Легенда */}
        <g transform="translate(600, 400)">
          <text x="0" y="-10" fill="#1e293b" fontSize="14" fontWeight="500">Легенда:</text>
          <g transform="translate(0, 20)">
            <circle cx="0" cy="0" r="6" fill="#10b981" />
            <text x="15" y="4" fill="#1e293b" fontSize="12">Норма</text>
          </g>
          <g transform="translate(0, 45)">
            <circle cx="0" cy="0" r="6" fill="#f59e0b" />
            <text x="15" y="4" fill="#1e293b" fontSize="12">Внимание</text>
          </g>
          <g transform="translate(0, 70)">
            <circle cx="0" cy="0" r="6" fill="#ef4444" />
            <text x="15" y="4" fill="#1e293b" fontSize="12">Критично</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default AccessSchema;