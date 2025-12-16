import React, { useState } from 'react';

function TaskModal({ onClose }) {
  const [taskForm, setTaskForm] = useState({
    title: '',
    equipment: '',
    date: '',
    responsible: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Новая задача:', taskForm);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Создание новой задачи</h3>
          <button className="close-btn" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Название задачи</label>
            <input 
              type="text" 
              name="title"
              value={taskForm.title}
              onChange={handleInputChange}
              placeholder="Введите название задачи"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Оборудование</label>
            <select 
              name="equipment"
              value={taskForm.equipment}
              onChange={handleInputChange}
              required
            >
              <option value="">Выберите оборудование</option>
              <option value="Насосная станция №1">Насосная станция №1</option>
              <option value="Контроллер доступа №5">Контроллер доступа №5</option>
              <option value="Камера наблюдения №12">Камера наблюдения №12</option>
              <option value="Тепловой узел №3">Тепловой узел №3</option>
              <option value="Сервер архивации">Сервер архивации</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Дата выполнения</label>
            <input 
              type="date" 
              name="date"
              value={taskForm.date}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Ответственный</label>
            <select 
              name="responsible"
              value={taskForm.responsible}
              onChange={handleInputChange}
              required
            >
              <option value="">Выберите ответственного</option>
              <option value="Иванов А.С.">Иванов А.С.</option>
              <option value="Петров В.И.">Петров В.И.</option>
              <option value="Сидоров П.К.">Сидоров П.К.</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Описание задачи</label>
            <textarea 
              name="description"
              value={taskForm.description}
              onChange={handleInputChange}
              placeholder="Введите описание задачи"
              rows="4"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="submit-btn">
              Создать задачу
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;