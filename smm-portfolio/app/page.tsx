import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import About from '@/components/About'
import Portfolio from '@/components/Portfolio'
import ContactForm from '@/components/ContactForm'
import { prisma } from '@/lib/prisma'

async function getProfile() {
  let profile = await prisma.profile.findFirst()

  if (!profile) {
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

  return profile
}

async function getPortfolio() {
  const items = await prisma.portfolio.findMany({
    orderBy: { order: 'asc' },
  })

  return items
}

async function getAboutSections() {
  let sections = await prisma.aboutSection.findMany()

  // Создать дефолтные данные, если их нет
  if (sections.length === 0) {
    const aboutMeData = {
      type: 'aboutMe',
      title: 'Немного обо мне',
      items: JSON.stringify([
        'Педагог начальных классов, 6 лет работала репетитором с детьми и родителями',
        'Изучала психологию через курсы (с сертификатами)',
        'Являюсь студентом НАДПО, изучала глубоко семейную-детскую психологию',
        'Посещаю трансформационные игры, периодически нахожусь в терапии',
        'Являюсь мамой замечательной дочки',
        'Могу работать как в онлайн, так и в оффлайн формате',
        'Имею опыт работы в разных нишах (карго, интернет-магазины, личные блоги, кофейни)',
        'Дополнительно имею навык таргетированной рекламы',
        'Символ моей жизни - птица Феникс'
      ])
    }

    const whyMeData = {
      type: 'whyMe',
      title: 'Почему именно я?',
      items: JSON.stringify([
        'Психология продаж - понимаю мотивацию вашей аудитории и создаю контент, который влюбляет в продукт',
        'Эмпатия к клиенту - вникаю в специфику вашего бизнеса и чувствую, что нужно вашим клиентам',
        'Человечный подход - не просто цифры и охваты, строю настоящие отношения между брендом и людьми',
        'Точность стратегии - каждое действие обосновано, никакого хаоса, только продуманная работа',
        'Реальные результаты - рост продаж и вовлеченности уже в первый месяц',
        'Креатив с душой - контент, который не просто красивый, но трогает сердца и мотивирует к действию'
      ])
    }

    await prisma.aboutSection.createMany({
      data: [aboutMeData, whyMeData]
    })

    sections = await prisma.aboutSection.findMany()
  }

  // Преобразовать JSON строки в массивы
  return sections.map(section => ({
    ...section,
    items: JSON.parse(section.items)
  }))
}

export default async function Home() {
  const [profile, portfolioItems, aboutSections] = await Promise.all([
    getProfile(),
    getPortfolio(),
    getAboutSections(),
  ])

  // Разделить секции на aboutMe и whyMe
  const aboutMeSection = aboutSections.find(s => s.type === 'aboutMe') || {
    title: 'Немного обо мне',
    items: []
  }
  const whyMeSection = aboutSections.find(s => s.type === 'whyMe') || {
    title: 'Почему именно я?',
    items: []
  }

  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
      <AboutMe data={aboutMeSection} />
      <About data={whyMeSection} />
      <Portfolio items={portfolioItems} />
      <ContactForm
        socialLinks={{
          telegram: profile.telegram,
          instagram: profile.instagram,
          threads: profile.threads,
        }}
      />
    </main>
  )
}
