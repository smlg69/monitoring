import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SystemPages.css';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [language, setLanguage] = useState('Русский');
  const [timezone, setTimezone] = useState('Москва (UTC+3)');
  const [dateFormat, setDateFormat] = useState('DD.MM.YYYY');
  const [passwordLength, setPasswordLength] = useState('8 символов');
  const [passwordExpiry, setPasswordExpiry] = useState('90 дней');
  const [sessionTimeout, setSessionTimeout] = useState('1 час');

  return (
    <div className="system-page">
      <div className="system-header-card">
        <div className="system-header-left">
          <span className="material-icons system-main-icon">admin_panel_settings</span>
          <div>
            <h2>Администрирование системы</h2>
            <p>Управление пользователями, настройки безопасности и системные параметры</p>
          </div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <span className="material-icons">analytics</span>
          <h3>Статистика системы</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">156</span>
              <span className="stat-label">Всего пользователей</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Активных сессий</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98.5%</span>
              <span className="stat-label">Доступность системы</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2.3ТБ</span>
              <span className="stat-label">Использовано памяти</span>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <span className="material-icons">people</span>
          Управление пользователями
        </button>
        <button 
          className={`admin-tab ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <span className="material-icons">admin_panel_settings</span>
          Настройки ролей
        </button>
        <button 
          className={`admin-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <span className="material-icons">settings</span>
          Общие настройки
        </button>
        <button 
          className={`admin-tab ${activeTab === 'systems' ? 'active' : ''}`}
          onClick={() => setActiveTab('systems')}
        >
          <span className="material-icons">engineering</span>
          Настройки систем
        </button>
        <button 
          className={`admin-tab ${activeTab === 'access' ? 'active' : ''}`}
          onClick={() => setActiveTab('access')}
        >
          <span className="material-icons">security</span>
          Доступность разделов
        </button>
        <button 
          className={`admin-tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          <span className="material-icons">password</span>
          Политика паролей
        </button>
        <button 
          className={`admin-tab ${activeTab === 'session' ? 'active' : ''}`}
          onClick={() => setActiveTab('session')}
        >
          <span className="material-icons">timer</span>
          Настройки сессии
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'users' && (
          <div className="settings-card">
            <h3><span className="material-icons">manage_accounts</span> Управление пользователями</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <span className="material-icons">person_add</span>
                <div>
                  <h4>Создание пользователей</h4>
                  <p>Добавление новых пользователей в систему</p>
                </div>
              </div>
              <div className="setting-item">
                <span className="material-icons">edit</span>
                <div>
                  <h4>Редактирование профилей</h4>
                  <p>Изменение данных пользователей</p>
                </div>
              </div>
              <div className="setting-item">
                <span className="material-icons">block</span>
                <div>
                  <h4>Блокировка пользователей</h4>
                  <p>Временная или постоянная блокировка доступа</p>
                </div>
              </div>
              <div className="setting-item">
                <span className="material-icons">vpn_key</span>
                <div>
                  <h4>Сброс паролей</h4>
                  <p>Сброс и восстановление паролей пользователей</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="settings-card">
            <h3><span className="material-icons">groups</span> Управление ролями</h3>
            <div className="roles-list">
              <div className="role-item">
                <h4>Администратор</h4>
                <p>Полный доступ ко всем функциям системы</p>
              </div>
              <div className="role-item">
                <h4>Оператор</h4>
                <p>Доступ к мониторингу и управлению системами</p>
              </div>
              <div className="role-item">
                <h4>Просмотр</h4>
                <p>Только просмотр, без возможности изменений</p>
              </div>
              <div className="role-item">
                <h4>Гость</h4>
                <p>Ограниченный доступ к публичной информации</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="settings-card">
            <h3><span className="material-icons">settings</span> Общие настройки системы</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Язык интерфейса</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>Русский</option>
                  <option>English</option>
                </select>
              </div>
              <div className="form-group">
                <label>Часовой пояс</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                  <option>Москва (UTC+3)</option>
                  <option>Калининград (UTC+2)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Формат даты</label>
                <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                  <option>DD.MM.YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <button className="save-btn">
                <span className="material-icons">save</span>
                Сохранить настройки
              </button>
            </div>
          </div>
        )}

        {activeTab === 'systems' && (
          <div className="settings-card">
            <h3><span className="material-icons">tune</span> Настройки инженерных систем</h3>
            <div className="systems-list">
              <div className="system-settings-item">
                <span className="material-icons">ac_unit</span>
                <span>Система ЖКХ</span>
              </div>
              <div className="system-settings-item">
                <span className="material-icons">lock</span>
                <span>Система СКУД</span>
              </div>
              <div className="system-settings-item">
                <span className="material-icons">videocam</span>
                <span>Видеонаблюдение</span>
              </div>
              <div className="system-settings-item">
                <span className="material-icons">local_fire_department</span>
                <span>Пожарная сигнализация</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'access' && (
          <div className="settings-card">
            <h3><span className="material-icons">admin_panel_settings</span> Доступность разделов</h3>
            <div className="access-list">
              <div className="access-item">
                <input type="checkbox" id="dashboard" defaultChecked />
                <label htmlFor="dashboard">Сводный экран</label>
              </div>
              <div className="access-item">
                <input type="checkbox" id="engineering" defaultChecked />
                <label htmlFor="engineering">Инженерные системы</label>
              </div>
              <div className="access-item">
                <input type="checkbox" id="requests" defaultChecked />
                <label htmlFor="requests">Заявки на обслуживание</label>
              </div>
              <div className="access-item">
                <input type="checkbox" id="reports" defaultChecked />
                <label htmlFor="reports">Отчеты</label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="settings-card">
            <h3><span className="material-icons">password</span> Политика паролей</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Минимальная длина</label>
                <select value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)}>
                  <option>6 символов</option>
                  <option>8 символов</option>
                  <option>10 символов</option>
                </select>
              </div>
              <div className="form-group">
                <label>Срок действия</label>
                <select value={passwordExpiry} onChange={(e) => setPasswordExpiry(e.target.value)}>
                  <option>30 дней</option>
                  <option>90 дней</option>
                  <option>180 дней</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <input type="checkbox" id="complexity" defaultChecked />
                <label htmlFor="complexity">Сложность пароля (цифры, буквы, спецсимволы)</label>
              </div>
              <div className="form-group checkbox-group">
                <input type="checkbox" id="history" defaultChecked />
                <label htmlFor="history">История паролей</label>
              </div>
              <button className="save-btn">
                <span className="material-icons">lock</span>
                Сохранить политику
              </button>
            </div>
          </div>
        )}

        {activeTab === 'session' && (
          <div className="settings-card">
            <h3><span className="material-icons">timer</span> Настройки сессии</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Время сессии</label>
                <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)}>
                  <option>15 минут</option>
                  <option>30 минут</option>
                  <option>1 час</option>
                  <option>4 часа</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <input type="checkbox" id="autoLogout" defaultChecked />
                <label htmlFor="autoLogout">Автоматический выход по истечении времени</label>
              </div>
              <div className="form-group checkbox-group">
                <input type="checkbox" id="loginAttempts" defaultChecked />
                <label htmlFor="loginAttempts">Ограничение попыток входа</label>
              </div>
              <div className="form-group checkbox-group">
                <input type="checkbox" id="mfa" />
                <label htmlFor="mfa">Многофакторная аутентификация</label>
              </div>
              <button className="save-btn">
                <span className="material-icons">security</span>
                Сохранить настройки
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bottom-tabs">
        <Link to="/" className="tab">
          <span className="material-icons">dashboard</span>
          <span>Сводка</span>
        </Link>
        <Link to="/hvac" className="tab">
          <span className="material-icons">handyman</span>
          <span>ЖКХ</span>
        </Link>
        <Link to="/access" className="tab">
          <span className="material-icons">sensor_door</span>
          <span>СКУД</span>
        </Link>
        <button className="tab active">
          <span className="material-icons">admin_panel_settings</span>
          <span>Админ</span>
        </button>
      </div>
    </div>
  );
}

export default AdminPage;