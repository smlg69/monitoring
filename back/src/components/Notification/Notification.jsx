import React, { useState, useEffect } from 'react';
import './Notification.css';

function Notification({ message, type = 'info', onClose, duration = 5000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification notification-${type}`}>
      <span className="material-icons">
        {type === 'success' ? 'check_circle' : 
         type === 'error' ? 'error' : 'info'}
      </span>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={() => {
        setIsVisible(false);
        onClose();
      }}>
        <span className="material-icons">close</span>
      </button>
    </div>
  );
}

export default Notification;