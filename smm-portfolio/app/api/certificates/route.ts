import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(certificates)
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, organization, date, image, order } = await request.json()

    const certificate = await prisma.certificate.create({
      data: {
        title,
        organization,
        date,
        image,
        order: order ?? 0
      }
    })

    return NextResponse.json(certificate)
  } catch (error) {
    console.error('Error creating certificate:', error)
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, organization, date, image, order } = await request.json()

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        organization,
        date,
        image,
        order
      }
    })

    return NextResponse.json(certificate)
  } catch (error) {
    console.error('Error updating certificate:', error)
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()

    await prisma.certificate.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting certificate:', error)
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 })
  }
}
