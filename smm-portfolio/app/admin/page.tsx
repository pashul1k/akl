'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LogOut, User, Briefcase, Mail, Home, Sparkles } from 'lucide-react'
import { signOut } from 'next-auth/react'
import ProfileEditor from '@/components/admin/ProfileEditor'
import PortfolioEditor from '@/components/admin/PortfolioEditor'
import ContactsViewer from '@/components/admin/ContactsViewer'

type Tab = 'profile' | 'portfolio' | 'contacts'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="gradient-text font-semibold text-lg">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const tabs = [
    { id: 'profile' as Tab, label: 'Профиль', icon: User },
    { id: 'portfolio' as Tab, label: 'Портфолио', icon: Briefcase },
    { id: 'contacts' as Tab, label: 'Обращения', icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-gradient-soft relative overflow-hidden">
      {/* Decorative background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-200 rounded-full blur-3xl"
      />

      {/* Header */}
      <header className="glass-card border-b border-primary-200/30 shadow-soft relative z-10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary-500 animate-pulse-soft" />
              <h1 className="text-3xl font-bold gradient-text">
                Админ-панель
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 glass-card rounded-xl font-bold text-gray-900 hover:shadow-soft transition-all hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span>На сайт</span>
              </a>

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-xl font-semibold hover:shadow-soft transition-all hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'btn-gradient text-white shadow-glow'
                    : 'glass-card text-gray-900 hover:shadow-soft'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          {activeTab === 'profile' && <ProfileEditor />}
          {activeTab === 'portfolio' && <PortfolioEditor />}
          {activeTab === 'contacts' && <ContactsViewer />}
        </motion.div>
      </div>
    </div>
  )
}
