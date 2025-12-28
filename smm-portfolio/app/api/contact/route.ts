import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Save to database
    const contact = await prisma.contactForm.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    })

    // Send Telegram notification if bot is configured
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const telegramMessage = `
🔔 Новое обращение с сайта!

👤 Имя: ${name}
📧 Email: ${email}
${phone ? `📱 Телефон: ${phone}\n` : ''}
💬 Сообщение:
${message}

🆔 ID: ${contact.id}
        `.trim()

        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: telegramMessage,
              parse_mode: 'HTML',
            }),
          }
        )
      } catch (telegramError) {
        console.error('Failed to send Telegram notification:', telegramError)
        // Don't fail the request if Telegram fails
      }
    }

    return NextResponse.json({ success: true, id: contact.id })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactForm.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
