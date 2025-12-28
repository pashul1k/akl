import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Создаем админ пользователя
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
    },
  })

  // Создаем профиль по умолчанию
  await prisma.profile.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'Марго',
      age: 24,
      title: 'SMM-маркетолог',
      description: 'Помогаю бизнесу расти через социальные сети в направлении психологии. Создаю контент, который вовлекает и продает.',
      photo: '/default-avatar.svg',
      location: 'Казахстан',
      telegram: '@margo_smm',
      instagram: '@margo.smm',
      threads: '@margo.smm',
    },
  })

  // Создаем примеры портфолио
  const portfolioItems = [
    {
      title: 'Продвижение психологического центра',
      description: 'Увеличение охватов на 300% за 3 месяца через Reels и сторис',
      image: '/portfolio/example1.svg',
      category: 'Instagram',
      clientName: 'Психологический центр "Гармония"',
      result: '+300% охватов, +150% записей на консультации',
      order: 1,
    },
    {
      title: 'Telegram-канал коуча',
      description: 'Рост подписчиков с 0 до 5000 за 4 месяца',
      image: '/portfolio/example2.svg',
      category: 'Telegram',
      clientName: 'Личный бренд коуча',
      result: '5000+ подписчиков, 25% вовлеченность',
      order: 2,
    },
    {
      title: 'SMM-стратегия для онлайн-школы',
      description: 'Комплексное продвижение в Instagram и Telegram',
      image: '/portfolio/example3.svg',
      category: 'Instagram',
      clientName: 'Онлайн-школа психологии',
      result: '+400% трафика на сайт, рост продаж на 250%',
      order: 3,
    },
  ]

  for (const item of portfolioItems) {
    await prisma.portfolio.create({
      data: item,
    })
  }

  console.log('✅ Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
