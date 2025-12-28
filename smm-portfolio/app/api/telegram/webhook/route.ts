import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const update = await request.json()

    // Handle callback query (button press)
    if (update.callback_query) {
      const { callback_data, message, from } = update.callback_query

      // Parse callback data: status_<status>_<contactId>
      const match = callback_data.match(/^status_(\w+)_(.+)$/)

      if (match) {
        const [, status, contactId] = match

        // Update status in database
        await prisma.contactForm.update({
          where: { id: contactId },
          data: { status }
        })

        // Get status label
        const statusLabels: Record<string, string> = {
          pending: '⏳ На рассмотрении',
          contacted: '✅ Связалась',
          rejected: '❌ Отказ',
          working: '🚀 Начало работы'
        }

        // Answer callback query
        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              callback_query_id: update.callback_query.id,
              text: `Статус изменен: ${statusLabels[status]}`
            })
          }
        )

        // Update message with new status
        const originalText = message.text || ''
        const newText = originalText.includes('\n\n📊 Статус:')
          ? originalText.replace(/\n\n📊 Статус:.*$/s, `\n\n📊 Статус: ${statusLabels[status]}`)
          : `${originalText}\n\n📊 Статус: ${statusLabels[status]}`

        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/editMessageText`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: message.chat.id,
              message_id: message.message_id,
              text: newText,
              parse_mode: 'HTML',
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: '⏳ На рассмотрении',
                      callback_data: `status_pending_${contactId}`
                    },
                    {
                      text: '✅ Связалась',
                      callback_data: `status_contacted_${contactId}`
                    }
                  ],
                  [
                    {
                      text: '❌ Отказ',
                      callback_data: `status_rejected_${contactId}`
                    },
                    {
                      text: '🚀 Начало работы',
                      callback_data: `status_working_${contactId}`
                    }
                  ]
                ]
              }
            })
          }
        )
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return NextResponse.json({ ok: true }) // Always return ok to Telegram
  }
}
