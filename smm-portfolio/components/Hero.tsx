'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Sparkles, Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface HeroProps {
  profile: {
    name: string
    title: string
    description: string
    photo: string
    location: string
  }
}

// Плавающие частицы
const FloatingParticle = ({ delay, duration, size }: { delay: number; duration: number; size: number }) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
        x: [randomX, randomX + 50, randomX - 30],
        y: [randomY, randomY - 80, randomY + 40],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: size,
        height: size,
      }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-300 via-secondary-300 to-peach-300 blur-sm opacity-60" />
    </motion.div>
  )
}

export default function Hero({ profile }: HeroProps) {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      duration: 8 + Math.random() * 4,
      size: 10 + Math.random() * 30
    }))
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Мягкий градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-peach-50" />

      {/* Волновой фон */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(253, 164, 199, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(216, 180, 254, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(253, 186, 116, 0.1) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Плавающие частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <FloatingParticle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Декоративные бабочки */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-16 h-16 flutter opacity-30"
      >
        <Image src="/logo.svg" alt="butterfly" fill className="object-contain" />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-32 left-16 w-12 h-12 flutter opacity-20"
      >
        <Image src="/logo.svg" alt="butterfly" fill className="object-contain" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Текстовый контент */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left max-w-2xl"
          >
            {/* Логотип */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6"
            >
              <div className="relative w-24 h-24 flutter">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </motion.div>

            {/* Локация */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 glass rounded-full shadow-soft"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <p className="text-sm font-medium gradient-text">{profile.location}</p>
            </motion.div>

            {/* Имя */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight"
            >
              {profile.name}
            </motion.h1>

            {/* Должность */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {profile.title}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Heart className="w-5 h-5 text-primary-500 fill-current" />
                <span className="text-sm font-medium text-primary-600">Психология + SMM</span>
              </div>
            </motion.div>

            {/* Описание */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed"
            >
              {profile.description}
            </motion.p>

            {/* CTA кнопка */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 btn-gradient text-white rounded-full font-semibold text-lg overflow-hidden shadow-soft-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Начать сотрудничество
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Фото */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] mx-auto">
              {/* Внешнее кольцо с градиентом */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(45deg, #fda4c7, #d8b4fe, #fdba74, #fda4c7)',
                  backgroundSize: '400% 400%',
                }}
              >
                <motion.div
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'linear-gradient(45deg, #fda4c7, #d8b4fe, #fdba74)',
                    backgroundSize: '200% 200%',
                  }}
                />
              </motion.div>

              {/* Среднее кольцо */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full bg-gradient-to-br from-secondary-200 to-primary-200 opacity-50"
              />

              {/* Внутренний круг - белый */}
              <div className="absolute inset-6 rounded-full bg-white shadow-2xl" />

              {/* Контейнер фото */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-8 rounded-full overflow-hidden shadow-glow"
              >
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Декоративные элементы вокруг фото */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 blur-xl opacity-60" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 w-24 h-24"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-peach-300 to-primary-300 blur-xl opacity-50" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Индикатор прокрутки */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-sm font-medium text-gray-500">Узнать больше</span>
        <div className="p-2 rounded-full glass-hover">
          <ArrowDown className="w-5 h-5 text-primary-600" />
        </div>
      </motion.div>
    </section>
  )
}
