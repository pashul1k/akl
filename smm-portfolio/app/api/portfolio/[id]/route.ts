import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    // Сериализовать images в JSON если это массив
    const portfolioData = {
      ...data,
      images: Array.isArray(data.images) ? JSON.stringify(data.images) : data.images
    }

    const item = await prisma.portfolio.update({
      where: { id: params.id },
      data: portfolioData,
    })

    // Вернуть с парсингом images
    return NextResponse.json({
      ...item,
      images: JSON.parse(item.images)
    })
  } catch (error) {
    console.error('Error updating portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to update portfolio item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.portfolio.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting portfolio item:', error)
    return NextResponse.json(
      { error: 'Failed to delete portfolio item' },
      { status: 500 }
    )
  }
}
