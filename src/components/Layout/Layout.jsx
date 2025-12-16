import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Сводный экран оператора';
    if (path === '/hvac') return 'Система ЖКХ';
    if (path === '/access') return 'Система СКУД';
    if (path === '/cctv') return 'Система видеонаблюдения';
    if (path === '/admin') return 'Администрирование системы';
    if (path === '/reports') return 'Отчеты и аналитика';
    if (path === '/requests') return 'Заявки на обслуживание';
    return 'Мониторинг систем';
  };

  return (
    <div className="layout">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        currentPath={location.pathname}
      />
      <div className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
        <Header 
          title={getPageTitle()}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="content-wrapper">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;