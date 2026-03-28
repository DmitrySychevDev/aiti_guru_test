# Тестовое задание — Айти Гуру

Административная панель управления товарами. React 18 + TypeScript, архитектура FSD.

## Стек

- **React 18** + **TypeScript** (strict)
- **Vite** — сборка
- **Ant Design 5** — UI компоненты (обёрнуты в `shared/ui` для замены вендора)
- **TanStack Query v5** — запросы и кэш
- **Zustand** — стейт авторизации
- **React Router v6** — роутинг
- **Axios** — HTTP клиент
- **SCSS Modules** — стилизация
- **FSD** — Feature-Sliced Design архитектура

## Быстрый старт

### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить переменные окружения

Скопировать `.env.example` в `.env`:

```bash
cp .env.example .env
```

### 3. Запустить dev-сервер

```bash
npm run dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173)

### 4. Сборка для продакшена

```bash
npm run build
```

## Переменные окружения

| Переменная | Описание | Пример |
|---|---|---|
| `VITE_API_BASE_URL` | Базовый URL API | `https://dummyjson.com` |

> Файлы `.env`, `.env.production` и `.env.*.local` добавлены в `.gitignore` и не попадают в репозиторий. В git хранится только `.env.example` — шаблон без секретных значений.

### Как подставить env в разных окружениях

**Локально** — скопировать `.env.example` в `.env` и заполнить значения.

**Vercel / Netlify** — добавить переменные в настройках проекта в разделе Environment Variables.

**GitHub Actions:**
```yaml
- name: Build
  env:
    VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
  run: npm run build
```

**Docker:**
```bash
docker run -e VITE_API_BASE_URL=https://dummyjson.com my-app
```

## Авторизация

Для входа используются тестовые credentials от [DummyJSON](https://dummyjson.com/docs/auth):

```
username: emilys
password: emilyspass
```

- **Запомнить данные** ✅ — токен в `localStorage`, сессия живёт после закрытия браузера
- **Запомнить данные** ☐ — токен в `sessionStorage`, сброс при закрытии вкладки

## Структура проекта (FSD)

```
src/
├── app/          # Провайдеры, роутер, точка входа
├── pages/        # Страницы: /login, /products
├── widgets/      # Самодостаточные блоки: таблица товаров, модалка добавления
├── features/     # Фичи: форма входа, поиск товаров
├── entities/     # Бизнес-сущности: user (auth), product
└── shared/       # Переиспользуемое: UI обёртки, API клиент, утилиты
```

## Используемый ИИ

## Использование ИИ

  В процессе выполнения использовался **Claude Sonnet 4.6** (Anthropic).

  ИИ применялся как инструмент ускорения — генерация шаблонного кода (обёртки
  компонентов, типы, структура файлов), подбор CSS-значений из Figma-токенов.

  Все архитектурные решения принимались самостоятельно:
  - выбор FSD как структуры проекта и обоснование разбивки по слоям
  - решение хранить состояние сортировки в URL search params
  - выбор keepPreviousData для устранения мигания таблицы
  - разделение localStorage/sessionStorage для remember me логики
  - обёртка antd в shared/ui для возможности замены вендора

  Весь сгенерированный код проходил ревью, правился под требования макета
  и итеративно дорабатывался (рефакторинг кнопок в отдельные компоненты,
  фикс скролла страницы, стилизация под Figma-токены).
