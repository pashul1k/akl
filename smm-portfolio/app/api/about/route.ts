import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    let sections = await prisma.aboutSection.findMany()

    // Если нет данных, создать дефолтные
    if (sections.length === 0) {
      const aboutMeData = {
        type: 'aboutMe',
        title: 'Немного обо мне',
        items: JSON.stringify([
          'Педагог начальных классов, 6 лет работала репетитором с детьми и родителями',
          'Изучала психологию через курсы и сертификационные программы',
          'Студент НАДПО, изучала глубоко семейную-детскую психологию',
          'Посещаю трансформационные игры, периодически нахожусь в терапии',
          'Мама замечательной дочки',
          'Работаю как в онлайн, так и в оффлайн формате',
          'Опыт работы в разных нишах: карго, интернет-магазины, личные блоги, кофейни',
          'Дополнительно имею навык таргетированной рекламы',
          'Символ моей жизни - птица Феникс, символ трансформации и возрождения'
        ])
      }

      const whyMeData = {
        type: 'whyMe',
        title: 'Почему выбирают меня?',
        items: JSON.stringify([
          'Психологический подход к продажам',
          'Индивидуальная стратегия для каждого',
          'Быстрая обратная связь',
          'Результаты уже в первый месяц'
        ])
      }

      await prisma.aboutSection.createMany({
        data: [aboutMeData, whyMeData]
      })

      sections = await prisma.aboutSection.findMany()
    }

    return NextResponse.json(sections)
  } catch (error) {
    console.error('Error fetching about sections:', error)
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, title, items } = await request.json()

    const updated = await prisma.aboutSection.update({
      where: { id },
      data: {
        title,
        items: JSON.stringify(items)
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating about section:', error)
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 })
  }
}
