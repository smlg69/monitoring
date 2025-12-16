# Контекст проекта: IoT Monitor System

## Структура проекта

D:\Documents\IoT_arena\react\monitor-system
├── src/
│ ├── components/
│ │ ├── Schemas/AccessSchema/ # Мнемосхема с графиками
│ │ ├── EquipmentTable/ # Таблица оборудования
│ │ ├── Layout/ # Макет приложения
│ │ ├── Dashboard/ # Карточки дашборда
│ │ └── Notification/ # Уведомления
│ ├── pages/
│ │ ├── AccessPage.jsx # Главная страница СКУД
│ │ ├── ApiContext.jsx # Контекст API токена
│ │ └── SystemPages.css # Общие стили
│ ├── hooks/
│ │ ├── useAccessEquipment.js # Хук для оборудования
│ │ └── useApiEquipment.js # Хук для API
│ └── services/
│ ├── api.js # Сервис API
│ └── accessService.js # Сервис доступа

## Текущее состояние
✅ Работает:
- Страница AccessPage с переключением вкладок
- Таблица оборудования с данными из API (36 устройств)
- Правильная кодировка windows-1251
- Мнемосхема с SVG элементами
- Графики параметров при клике на SVG

🔄 В процессе:
- Клик на элемент SVG → отображение графиков справа
- Крупный макет: схема слева, аналитика справа

## API детали
- URL: `/rest/v1/contexts/users.admin.models.workerLimsN/functions/getTblDevicesF`
- Токен: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiNTFlMWY1Mi0xMDc4LTQ3NTAtODNjNy0xM2I3ZTg3NjUwZmEiLCJzdWIiOiJhZG1pbiIsImF1ZCI6InJlZnJlc2giLCJpYXQiOjE3NjU4Nzk3MTcsImV4cCI6MTc2NTk2NjExN30.q49X51NYgHgJuM8VJt6gSvJ1OFOWDmGKrxRR6JgydDQ`
- Формат запроса: `[{ num: "15" }]` (массив!)

## Следующие шаги
1. Добавить реальные графики с Chart.js или Recharts
2. Реализовать фильтрацию оборудования
3. Добавить страницу администрирования
4. Настроить WebSocket для реального времени
5. Добавить уведомления