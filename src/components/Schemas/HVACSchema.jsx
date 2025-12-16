import React from 'react';

function HVACSchema({ equipment = [], selectedEquipmentId, onEquipmentClick }) {
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
        {/* Фон схемы */}
        <rect x="0" y="0" width="800" height="500" fill="#f8fafc" />
        
        {/* Тепловой узел */}
        <g 
          className={`schema-element ${selectedEquipmentId === 1 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(1)}
        >
          <rect x="100" y="150" width="120" height="80" rx="8" 
                fill={getStatusColor(getEquipmentStatus(1))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(1))} strokeWidth="2" />
          <circle cx="160" cy="190" r="20" fill={getStatusColor(getEquipmentStatus(1))} />
          <text x="160" y="140" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="500">
            Тепловой узел
          </text>
          <text x="160" y="250" textAnchor="middle" fill="#64748b" fontSize="12">
            Температура: 65°C
          </text>
        </g>

        {/* Насосная станция */}
        <g 
          className={`schema-element ${selectedEquipmentId === 2 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(2)}
        >
          <circle cx="350" cy="200" r="40" 
                  fill={getStatusColor(getEquipmentStatus(2))} fillOpacity="0.2"
                  stroke={getStatusColor(getEquipmentStatus(2))} strokeWidth="2" />
          <path d="M350,180 L340,200 L360,200 Z" fill={getStatusColor(getEquipmentStatus(2))} />
          <text x="350" y="260" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="500">
            Насосная станция
          </text>
          <text x="350" y="280" textAnchor="middle" fill="#64748b" fontSize="12">
            Давление: 4.2 бар
          </text>
        </g>

        {/* Вентиляционная установка */}
        <g 
          className={`schema-element ${selectedEquipmentId === 3 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(3)}
        >
          <rect x="500" y="150" width="120" height="80" rx="8"
                fill={getStatusColor(getEquipmentStatus(3))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(3))} strokeWidth="2" />
          <path d="M540,170 L580,170 L560,190 Z" fill={getStatusColor(getEquipmentStatus(3))} />
          <text x="560" y="140" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="500">
            Вентиляция
          </text>
          <text x="560" y="250" textAnchor="middle" fill="#64748b" fontSize="12">
            Расход: 12.5 м³/ч
          </text>
        </g>

        {/* Трубопроводы */}
        <path d="M220,190 L310,200" stroke="#3b82f6" strokeWidth="3" fill="none" />
        <path d="M390,200 L480,190" stroke="#3b82f6" strokeWidth="3" fill="none" />
        <path d="M350,240 L350,300" stroke="#3b82f6" strokeWidth="3" fill="none" />
        
        {/* Теплообменник */}
        <g 
          className={`schema-element ${selectedEquipmentId === 4 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(4)}
        >
          <rect x="300" y="300" width="100" height="60" rx="6"
                fill={getStatusColor(getEquipmentStatus(4))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(4))} strokeWidth="2" />
          <text x="350" y="320" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Теплообменник
          </text>
        </g>

        {/* Насос циркуляционный */}
        <g 
          className={`schema-element ${selectedEquipmentId === 5 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(5)}
        >
          <circle cx="200" cy="350" r="25"
                  fill={getStatusColor(getEquipmentStatus(5))} fillOpacity="0.2"
                  stroke={getStatusColor(getEquipmentStatus(5))} strokeWidth="2" />
          <text x="200" y="390" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Насос циркуляционный
          </text>
        </g>

        {/* Котел */}
        <g 
          className={`schema-element ${selectedEquipmentId === 6 ? 'selected' : ''}`}
          onClick={() => onEquipmentClick && onEquipmentClick(6)}
        >
          <rect x="450" y="300" width="80" height="60" rx="6"
                fill={getStatusColor(getEquipmentStatus(6))} fillOpacity="0.2"
                stroke={getStatusColor(getEquipmentStatus(6))} strokeWidth="2" />
          <text x="490" y="320" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="500">
            Котел
          </text>
        </g>

        {/* Стрелки потока */}
        <path d="M250,190 L240,190" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <path d="M420,200 L410,200" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <path d="M350,280 L350,270" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        
        {/* Определение стрелки */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Статусы */}
        {equipment.map((eq, index) => (
          <g key={eq.id}>
            <circle 
              cx={50} 
              cy={50 + index * 30} 
              r="6" 
              fill={getStatusColor(eq.status)}
            />
            <text x={70} y={55 + index * 30} fill="#1e293b" fontSize="12">
              {eq.name}: {eq.status}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default HVACSchema;