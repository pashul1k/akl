import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()

    const contact = await prisma.contactForm.update({
      where: { id: params.id },
      data: { status }
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error updating contact status:', error)
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
  }
}
