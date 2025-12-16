# IoT Monitor System

React приложение для мониторинга систем безопасности (СКУД, видеонаблюдение, ЖКХ).

## Функциональность

### ✅ Реализовано:
1. **AccessPage** - система контроля доступа (СКУД)
   - Таблица оборудования с пагинацией
   - SVG мнемосхема с интерактивными элементами
   - Графики параметров оборудования (температура, нагрузка, ошибки)
   - Интеграция с внешним API

2. **API интеграция**
   - Работа с токеном авторизации
   - Декодирование windows-1251
   - Преобразование данных API в формат приложения

3. **Компоненты**
   - AccessSchema - интерактивная SVG схема
   - ApiContext - управление токенами
   - Хуки для работы с оборудованием

### 📊 Особенности API:
- URL: `/rest/v1/contexts/users.admin.models.workerLimsN/functions/getTblDevicesF`
- Токен: Bearer авторизация
- Формат запроса: `[{ num: "15" }]` (массив!)
- Кодировка ответа: windows-1251

### 🎨 Стек технологий:
- React 18
- React Router DOM
- CSS Modules / Inline styles
- Fetch API
- SVG для схем

## Структура проекта

monitor-system/
├── src/
│ ├── components/
│ │ ├── Schemas/
│ │ │ └── AccessSchema.jsx # SVG мнемосхема с графиками
│ │ ├── Layout/ # Макет приложения
│ │ └── EquipmentTable/ # Таблица оборудования
│ ├── pages/
│ │ ├── AccessPage.jsx # Главная страница СКУД
│ │ ├── ApiContext.jsx # Контекст API
│ │ └── SystemPages.css # Общие стили
│ ├── hooks/
│ │ ├── useAccessEquipment.js # Хук для оборудования
│ │ └── useApiEquipment.js # Хук для API
│ └── services/
│ ├── api.js # Сервис API
│ └── accessService.js # Сервис доступа
├── public/
└── package.json


## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для production
npm run build
___________________________________________________________________________________

Конфигурация API
Настройки API находятся в:

src/pages/ApiContext.jsx - токен авторизации

src/services/api.js - настройки URL и запросов

Дальнейшее развитие
Добавить реальные библиотеки графиков (Chart.js/Recharts)

Реализовать WebSocket для реального времени

Добавить страницу администрирования

Экспорт данных в PDF/Excel

Уведомления в реальном времени

Автор
Разработано как часть проекта IoT мониторинга оборудования.

text

## 4. **Сохраните состояние проекта:**

```bash
# Добавляем README и .gitignore
git add README.md .gitignore

# Коммитим изменения
git commit -m "Add project documentation and gitignore"

# Проверяем историю коммитов
git log --oneline
5. Для резервного копирования:
Создайте архив:
bash
# Windows
powershell "Compress-Archive -Path . -DestinationPath monitor-system-backup.zip"

# Или через 7-Zip
7z a monitor-system-backup.zip . -r
Или создайте репозиторий на GitHub:
bash
# Создайте репозиторий на GitHub.com
# Затем добавьте remote и загрузите код:

git remote add origin https://github.com/ВАШ_АККАУНТ/iot-monitor-system.git
git branch -M main
git push -u origin main
6. Создайте файл конфигурации для будущих сессий:
project-snapshot.md:

markdown
# Snapshot: IoT Monitor System - 16.12.2025

## Текущее состояние
✅ Приложение запущено и работает
✅ AccessPage отображает таблицу оборудования (36 устройств из API)
✅ SVG мнемосхема отображается корректно
✅ Графики показываются при клике на оборудование
✅ API подключен (токен активен)
✅ Кодировка windows-1251 исправлена

## Архитектура
- Макет: схема слева, графики справа
- Компоненты: модульные, разделенные
- Стили: inline + CSS файлы
- Данные: локальные + внешний API

## Ключевые файлы
1. `src/pages/AccessPage.jsx` - главная страница
2. `src/components/Schemas/AccessSchema.jsx` - схема с графиками
3. `src/pages/ApiContext.jsx` - управление токеном
4. `src/services/api.js` - API сервис

## Для продолжения работы
1. Запустить: `npm start`
2. Открыть: `http://localhost:3000/access`
3. Кликнуть на элемент схемы для просмотра графиков


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
