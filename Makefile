# Запуск проекта в режиме разработки
dev:
	npm run dev

# Установка всех зависимостей
install:
	npm ci

# Проверка кода линтером
lint:
	npm run lint

# Автоматическое исправление ошибок линтера и форматирование кода
fix:
	npm run lint:fix
	npm run format

# Сборка проекта для продакшена
build:
	npm run build

.PHONY: dev install lint fix build
