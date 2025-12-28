import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const items = await prisma.portfolio.findMany({
      orderBy: { order: 'asc' },
    })

    // Парсить JSON строки в массивы для images
    const parsedItems = items.map(item => ({
      ...item,
      images: JSON.parse(item.images)
    }))

    return NextResponse.json(parsedItems)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Сериализовать images в JSON если это массив
    const portfolioData = {
      ...data,
      images: Array.isArray(data.images) ? JSON.stringify(data.images) : data.images
    }

    const item = await prisma.portfolio.create({
      data: portfolioData,
    })

    // Вернуть с парсингом images
    return NextResponse.json({
      ...item,
      images: JSON.parse(item.images)
    })
  } catch (error) {
    console.error('Error creating portfolio item:', error)
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 })
  }
}
