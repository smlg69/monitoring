import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ sidebarOpen, setSidebarOpen, currentPath }) {
  const isActive = (path) => currentPath === path;

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
      <div className="logo-section">
        <span className="material-icons">monitoring</span>
        {sidebarOpen && <h1>Мониторинг систем</h1>}
      </div>
      
      <div className="nav-section">
        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <span className="material-icons">dashboard</span>
          {sidebarOpen && <span>Сводный экран</span>}
        </Link>
      </div>
      
      <div className="nav-section">
        <div className="nav-header">
          <span className="material-icons">engineering</span>
          {sidebarOpen && (
            <>
              <span>Инженерные системы</span>
              <span className="material-icons">expand_more</span>
            </>
          )}
        </div>
        
        <Link to="/hvac" className={`nav-subitem ${isActive('/hvac') ? 'active' : ''}`}>
          <span className="material-icons">ac_unit</span>
          {sidebarOpen && <span>Система ЖКХ</span>}
        </Link>
        
        <Link to="/access" className={`nav-subitem ${isActive('/access') ? 'active' : ''}`}>
          <span className="material-icons">lock</span>
          {sidebarOpen && <span>Система СКУД</span>}
        </Link>
        
        <Link to="/cctv" className={`nav-subitem ${isActive('/cctv') ? 'active' : ''}`}>
          <span className="material-icons">videocam</span>
          {sidebarOpen && <span>Видеонаблюдение</span>}
        </Link>
      </div>
      
      <div className="nav-section">
        <Link to="/requests" className={`nav-item ${isActive('/requests') ? 'active' : ''}`}>
          <span className="material-icons">assignment</span>
          {sidebarOpen && <span>Заявки на обслуживание</span>}
        </Link>
        
        <Link to="/admin" className={`nav-item ${isActive('/admin') ? 'active' : ''}`}>
          <span className="material-icons">admin_panel_settings</span>
          {sidebarOpen && <span>Администрирование</span>}
        </Link>
        
        <Link to="/reports" className={`nav-item ${isActive('/reports') ? 'active' : ''}`}>
          <span className="material-icons">assessment</span>
          {sidebarOpen && <span>Отчеты</span>}
        </Link>
      </div>
      
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span className="material-icons">menu</span>
      </div>
    </div>
  );
}

export default Sidebar;