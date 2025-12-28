# Настройка Telegram Webhook для Windows

## Вариант 1: Использование ngrok (Рекомендуется для локального тестирования)

### Шаг 1: Установка ngrok

1. Скачайте ngrok с официального сайта: https://ngrok.com/download
2. Разархивируйте ngrok.exe в любую папку (например, `C:\ngrok`)
3. Зарегистрируйтесь на ngrok.com и получите authtoken
4. Откройте PowerShell и выполните:
```powershell
cd C:\ngrok
.\ngrok config add-authtoken ВАШ_AUTHTOKEN
```

### Шаг 2: Запуск проекта

1. Запустите ваш Next.js проект:
```powershell
cd C:\path\to\smm-portfolio
npm run dev
```

2. Убедитесь что проект работает на http://localhost:3000

### Шаг 3: Запуск ngrok

В новом окне PowerShell:
```powershell
cd C:\ngrok
.\ngrok http 3000
```

Вы увидите что-то вроде:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

Скопируйте URL (например, `https://abc123.ngrok.io`)

### Шаг 4: Установка webhook

В PowerShell выполните:
```powershell
$botToken = "ВАШ_BOT_TOKEN"
$ngrokUrl = "https://abc123.ngrok.io"  # Замените на ваш ngrok URL

$webhookUrl = "$ngrokUrl/api/telegram/webhook"

Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/setWebhook" `
  -Method Post `
  -ContentType "application/json" `
  -Body (@{url=$webhookUrl} | ConvertTo-Json)
```

### Шаг 5: Проверка webhook

Проверьте что webhook установлен:
```powershell
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getWebhookInfo"
```

## Вариант 2: Production (Vercel/Railway/etc)

Когда ваш сайт развернут на продакшене:

```powershell
$botToken = "ВАШ_BOT_TOKEN"
$productionUrl = "https://ваш-домен.com"

$webhookUrl = "$productionUrl/api/telegram/webhook"

Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/setWebhook" `
  -Method Post `
  -ContentType "application/json" `
  -Body (@{url=$webhookUrl} | ConvertTo-Json)
```

## Как это работает

1. **Новое обращение** → Telegram получает уведомление с кнопками статусов
2. **Нажатие кнопки** → Telegram отправляет callback_query на ваш webhook
3. **Webhook обрабатывает** → Обновляет статус в базе данных
4. **Обратная связь** → Telegram показывает уведомление и обновляет сообщение

## Альтернатива: Управление через админ-панель

Вы также можете менять статусы напрямую через админ-панель:
- Зайдите на `/admin`
- Откройте вкладку "Обращения"
- Нажмите на кнопки статусов под каждым обращением

Это работает БЕЗ настройки webhook!

## Переменные окружения

Убедитесь что в `.env` файле есть:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

## Отладка

Если webhook не работает:

1. Проверьте логи в консоли Next.js
2. Проверьте webhook info:
```powershell
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getWebhookInfo"
```

3. Удалите webhook и попробуйте снова:
```powershell
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/deleteWebhook"
```
