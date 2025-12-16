import React from 'react';

function CTVSchema({ equipment = [], selectedEquipmentId, onEquipmentClick }) {
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
        {/* Фон - план охраняемой территории */}
        <rect x="0" y="0" width="800" height="500" fill="#f8fafc" />
        
        {/* Здание */}
        <rect x="100" y="100" width="400" height="200" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Парковка */}
        <rect x="550" y="100" width="200" height="150" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
        
        {/* Камера 1 - Входная группа */}
        <g 
          className={`schema-element ${selectedEquipmentId === 1 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(1)}
        >
          {/* Камера */}
          <circle cx="300" cy="80" r="20"
                  fill={getStatusColor(getEquipmentStatus(1))} fillOpacity="0.3"
                  stroke={getStatusColor(getEquipmentStatus(1))} strokeWidth="2" />
          {/* Основание камеры */}
          <rect x="290" y="80" width="20" height="15" fill={getStatusColor(getEquipmentStatus(1))} />
          {/* Объектив */}
          <circle cx="300" cy="70" r="8" fill="#1e293b" />
          {/* Зона обзора */}
          <path d="M300,80 L250,150 L350,150 Z" 
                fill={getStatusColor(getEquipmentStatus(1))} fillOpacity="0.1"
                stroke={getStatusColor(getEquipmentStatus(1))} strokeWidth="1" strokeDasharray="3,3" />
          <text x="300" y="120" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Камера #1
          </text>
        </g>

        {/* Камера 2 - Парковка */}
        <g 
          className={`schema-element ${selectedEquipmentId === 2 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(2)}
        >
          <circle cx="650" cy="80" r="20"
                  fill={getStatusColor(getEquipmentStatus(2))} fillOpacity="0.3"
                  stroke={getStatusColor(getEquipmentStatus(2))} strokeWidth="2" />
          <rect x="640" cy="80" width="20" height="15" fill={getStatusColor(getEquipmentStatus(2))} />
          <circle cx="650" cy="70" r="8" fill="#1e293b" />
          <path d="M650,80 L600,150 L700,150 Z" 
                fill={getStatusColor(getEquipmentStatus(2))} fillOpacity="0.1"
                stroke={getStatusColor(getEquipmentStatus(2))} strokeWidth="1" strokeDasharray="3,3" />
          <text x="650" y="120" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Камера #2
          </text>
        </g>

        {/* Камера 3 - Задний вход */}
        <g 
          className={`schema-element ${selectedEquipmentId === 3 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(3)}
        >
          <circle cx="200" cy="250" r="18"
                  fill={getStatusColor(getEquipmentStatus(3))} fillOpacity="0.3"
                  stroke={getStatusColor(getEquipmentStatus(3))} strokeWidth="2" />
          <rect x="191" y="250" width="18" height="12" fill={getStatusColor(getEquipmentStatus(3))} />
          <circle cx="200" cy="242" r="7" fill="#1e293b" />
          <text x="200" y="280" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Камера #3
          </text>
        </g>

        {/* Видеорегистратор */}
        <g 
          className={`schema-element ${selectedEquipmentId === 4 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(4)}
        >
          <rect x="500" y="300" width="100" height="60" rx="4"
                fill={getStatusColor(getEquipmentStatus(4))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(4))} strokeWidth="2" />
          {/* Диски */}
          <circle cx="525" cy="320" r="8" fill="#3b82f6" />
          <circle cx="545" cy="320" r="8" fill="#3b82f6" />
          <circle cx="565" cy="320" r="8" fill="#3b82f6" />
          <text x="550" y="340" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Регистратор
          </text>
        </g>

        {/* Сервер архивации */}
        <g 
          className={`schema-element ${selectedEquipmentId === 5 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(5)}
        >
          <rect x="650" y="300" width="100" height="60" rx="4"
                fill={getStatusColor(getEquipmentStatus(5))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(5))} strokeWidth="2" />
          {/* Индикаторы */}
          <circle cx="670" cy="320" r="5" fill={getEquipmentStatus(5) === 'Норма' ? '#10b981' : '#ef4444'} />
          <circle cx="685" cy="320" r="5" fill={getEquipmentStatus(5) === 'Норма' ? '#10b981' : '#ef4444'} />
          <circle cx="700" cy="320" r="5" fill={getEquipmentStatus(5) === 'Норма' ? '#10b981' : '#ef4444'} />
          <text x="700" y="340" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Сервер
          </text>
        </g>

        {/* Мониторы наблюдения */}
        <g 
          className={`schema-element ${selectedEquipmentId === 6 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(6)}
        >
          <rect x="150" y="350" width="250" height="80" rx="4"
                fill={getStatusColor(getEquipmentStatus(6))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(6))} strokeWidth="2" />
          
          {/* Монитор 1 */}
          <rect x="170" y="360" width="60" height="50" rx="2" fill="#1e293b" />
          <circle cx="200" cy="385" r="10" fill="#10b981" />
          
          {/* Монитор 2 */}
          <rect x="240" y="360" width="60" height="50" rx="2" fill="#1e293b" />
          <rect x="250" y="370" width="40" height="10" fill="#f59e0b" />
          <rect x="250" y="385" width="40" height="10" fill="#10b981" />
          
          {/* Монитор 3 */}
          <rect x="310" y="360" width="60" height="50" rx="2" fill="#1e293b" />
          <circle cx="340" cy="385" r="15" fill="#ef4444" />
          
          <text x="275" y="440" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Пост наблюдения
          </text>
        </g>

        {/* Соединительные линии */}
        <path d="M300,100 L300,120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M650,100 L650,120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M200,268 L200,290" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Сеть */}
        <path d="M300,120 L550,120 L550,300" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M650,120 L550,120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M200,290 L300,290 L300,350" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M550,330 L650,330" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />

        {/* Легенда */}
        <g transform="translate(20, 400)">
          <text x="0" y="-10" fill="#1e293b" fontSize="14" fontWeight="500">Состояние камер:</text>
          {equipment.filter(eq => eq.type === 'Камера наблюдения').slice(0, 3).map((eq, index) => (
            <g key={eq.id} transform={`translate(0, ${index * 25})`}>
              <circle cx="0" cy="0" r="6" fill={getStatusColor(eq.status)} />
              <text x="15" y="4" fill="#1e293b" fontSize="12">
                {eq.name}: {eq.status}
              </text>
            </g>
          ))}
        </g>

        {/* Параметры */}
        <g transform="translate(600, 400)">
          <text x="0" y="-10" fill="#1e293b" fontSize="14" fontWeight="500">Параметры:</text>
          <g transform="translate(0, 20)">
            <circle cx="0" cy="0" r="5" fill="#10b981" />
            <text x="15" y="4" fill="#1e293b" fontSize="12">В работе: 12</text>
          </g>
          <g transform="translate(0, 45)">
            <circle cx="0" cy="0" r="5" fill="#f59e0b" />
            <text x="15" y="4" fill="#1e293b" fontSize="12">Внимание: 2</text>
          </g>
          <g transform="translate(0, 70)">
            <circle cx="0" cy="0" r="5" fill="#ef4444" />
            <text x="15" y="4" fill="#1e293b" fontSize="12">Офлайн: 1</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default CTVSchema;