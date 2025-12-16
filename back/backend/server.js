const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Мок-данные
let hvacEquipment = [
  { id: 1, name: 'Насосная станция №1', type: 'Насосное оборудование', status: 'Норма', location: 'Подвал, секция А' },
  { id: 2, name: 'Тепловой узел №3', type: 'Тепловой узел', status: 'Внимание', location: 'Цокольный этаж' },
  { id: 3, name: 'Вентиляционная установка', type: 'Вентиляция', status: 'Норма', location: 'Крыша, блок Б' },
];

// API для системы ЖКХ
app.get('/api/hvac/equipment', (req, res) => {
  res.json(hvacEquipment);
});

app.post('/api/hvac/equipment', (req, res) => {
  const newEquipment = {
    id: hvacEquipment.length + 1,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  
  hvacEquipment.push(newEquipment);
  res.status(201).json(newEquipment);
});

app.put('/api/hvac/equipment/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = hvacEquipment.findIndex(eq => eq.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Equipment not found' });
  }
  
  hvacEquipment[index] = { ...hvacEquipment[index], ...req.body };
  res.json(hvacEquipment[index]);
});

app.delete('/api/hvac/equipment/:id', (req, res) => {
  const id = parseInt(req.params.id);
  hvacEquipment = hvacEquipment.filter(eq => eq.id !== id);
  res.status(204).send();
});

// API для системы СКУД
let accessEquipment = [
  { id: 1, name: 'Контроллер доступа №1', type: 'Контроллер', status: 'Норма', location: 'Главный вход' },
  { id: 2, name: 'Считыватель №5', type: 'Считыватель', status: 'Внимание', location: 'Запасной выход' },
  { id: 3, name: 'Замок главного входа', type: 'Замок', status: 'Норма', location: 'Главный вход' },
];

app.get('/api/access/equipment', (req, res) => {
  res.json(accessEquipment);
});

app.post('/api/access/equipment', (req, res) => {
  const newEquipment = {
    id: accessEquipment.length + 1,
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  
  accessEquipment.push(newEquipment);
  res.status(201).json(newEquipment);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});