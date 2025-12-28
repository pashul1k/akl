import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    let profile = await prisma.profile.findFirst()

    if (!profile) {
      // Create default profile if none exists
      profile = await prisma.profile.create({
        data: {
          id: 'default',
          name: 'Марго',
          age: 24,
          title: 'SMM-маркетолог',
          description: 'Помогаю бизнесу расти через социальные сети в направлении психологии',
          photo: '/default-avatar.jpg',
          location: 'Казахстан',
        },
      })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const profile = await prisma.profile.findFirst()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data,
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
