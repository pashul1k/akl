'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Award, Users, Heart, Home, Target, TrendingUp, Sparkles, X } from 'lucide-react'
import Image from 'next/image'

const iconMap: { [key: string]: any } = {
  BookOpen,
  Award,
  Users,
  Heart,
  Home,
  Target,
  TrendingUp,
  Sparkles
}

interface Certificate {
  id: string
  title: string
  organization: string
  date: string
  image: string
  order: number
}

interface AboutMeProps {
  data: {
    title: string
    items: string[]
  }
  certificates: Certificate[]
}

export default function AboutMe({ data, certificates }: AboutMeProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  // Иконки для каждого пункта
  const icons = [
    BookOpen, // Образование
    Award,    // Курсы
    Users,    // НАДПО
    Heart,    // Трансформационные игры
    Heart,    // Мама
    Home,     // Онлайн/Оффлайн
    Target,   // Опыт
    TrendingUp, // Таргетированная реклама
    Sparkles  // Феникс
  ]

  return (
    <section id="about-me" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-peach-50/30 to-white">
      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-10 w-64 h-64 bg-primary-200 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10 right-10 w-72 h-72 bg-secondary-200 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="relative w-16 h-16">
              <Image src="/logo.svg" alt="Phoenix" fill className="object-contain animate-pulse-soft" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              {data.title}
            </h2>
            <div className="relative w-16 h-16">
              <Image src="/logo.svg" alt="Phoenix" fill className="object-contain animate-pulse-soft" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-900 max-w-3xl mx-auto font-medium"
          >
            Мой путь в маркетинге начался с психологии и работы с людьми
          </motion.p>
        </motion.div>

        {/* Items grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.items.map((item, index) => {
            const Icon = icons[index] || Sparkles
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card p-6 rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-primary-500 to-primary-600' :
                    index % 3 === 1 ? 'from-secondary-500 to-secondary-600' :
                    'from-peach-500 to-peach-600'
                  } flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-900 font-medium leading-relaxed flex-1">
                    {item}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Certificates Section */}
        {certificates && certificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-6xl mx-auto"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-3 inline-flex items-center gap-3">
                <Award className="w-8 h-8" />
                Мои сертификаты
                <Award className="w-8 h-8" />
              </h3>
              <p className="text-gray-900 font-medium text-lg">
                Подтверждение квалификации и непрерывного обучения
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  onClick={() => setSelectedCertificate(cert)}
                  className="glass-card p-3 rounded-2xl shadow-soft hover:shadow-glow cursor-pointer transition-all duration-300 group"
                >
                  <div className="relative aspect-[3/4] mb-3 rounded-xl overflow-hidden bg-white">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-gray-700 font-medium mb-1">
                    {cert.organization}
                  </p>
                  <p className="text-xs text-gray-600">
                    {cert.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-white rounded-3xl p-6 shadow-glow-purple"
              >
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold gradient-text mb-2">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-lg text-gray-900 font-semibold mb-1">
                    {selectedCertificate.organization}
                  </p>
                  <p className="text-gray-700 font-medium">
                    {selectedCertificate.date}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Special highlight for Phoenix */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="glass p-10 rounded-3xl shadow-glow-purple relative overflow-hidden">
            {/* Background phoenix */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10">
              <Image src="/logo.svg" alt="Phoenix" fill className="object-contain" />
            </div>

            <div className="flex items-center gap-6 relative z-10">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image src="/logo.svg" alt="Phoenix" fill className="object-contain animate-pulse-soft" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-3">
                  Птица Феникс - символ моей жизни
                </h3>
                <p className="text-lg text-gray-900 font-medium leading-relaxed">
                  Возрождение из пепла, трансформация через сложности, постоянный рост.
                  Каждый вызов делает меня сильнее, каждый опыт - мудрее.
                  Именно это я приношу в ваш бизнес - способность к трансформации и возрождению.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
