import Hero from '@/components/Hero'
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

export default async function Home() {
  const [profile, portfolioItems] = await Promise.all([
    getProfile(),
    getPortfolio(),
  ])

  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
      <About />
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
