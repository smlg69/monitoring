import React from 'react';

function Header({ title, sidebarOpen, setSidebarOpen }) {
  return (
    <header className="header">
      <div className="header-left">
        {!sidebarOpen && (
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-icons">menu</span>
          </button>
        )}
        <h2>{title}</h2>
      </div>
      
      <div className="header-right">
        <button className="icon-button">
          <span className="material-icons">dark_mode</span>
        </button>
        
        <button className="icon-button notification">
          <span className="material-icons">notifications</span>
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">АО</div>
          <div className="user-info">
            <span className="user-name">Администратор</span>
          </div>
        </div>
        
        <button className="icon-button">
          <span className="material-icons">settings</span>
        </button>
        
        <button className="icon-button">
          <span className="material-icons">logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;