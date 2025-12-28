'use client'

import { motion } from 'framer-motion'
import { Heart, Brain, Users, Sparkles, Target, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Психология продаж',
    description: 'Понимаю мотивацию вашей аудитории и создаю контент, который влюбляет в продукт',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: Heart,
    title: 'Эмпатия к клиенту',
    description: 'Вникаю в специфику вашего бизнеса и чувствую, что нужно вашим клиентам',
    color: 'from-secondary-500 to-secondary-600'
  },
  {
    icon: Users,
    title: 'Человечный подход',
    description: 'Не просто цифры и охваты - строю настоящие отношения между брендом и людьми',
    color: 'from-peach-500 to-peach-600'
  },
  {
    icon: Target,
    title: 'Точность стратегии',
    description: 'Каждое действие обосновано - никакого хаоса, только продуманная работа',
    color: 'from-primary-400 to-secondary-400'
  },
  {
    icon: TrendingUp,
    title: 'Реальные результаты',
    description: 'Рост продаж и вовлеченности уже в первый месяц - проверено клиентами',
    color: 'from-secondary-400 to-primary-400'
  },
  {
    icon: Sparkles,
    title: 'Креатив с душой',
    description: 'Контент, который не просто красивый, но трогает сердца и мотивирует к действию',
    color: 'from-peach-400 to-primary-400'
  }
]

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/50 to-white" />

      {/* Decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-10 w-64 h-64 bg-secondary-200 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl"
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
            <Heart className="w-10 h-10 text-primary-500 fill-current animate-pulse-soft" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Почему именно я?
            </h2>
            <Brain className="w-10 h-10 text-secondary-500 animate-pulse-soft" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-900 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Я не просто SMM-специалист. Я изучаю психологию человека,
            его потребности и мотивацию. Это помогает создавать контент,
            который не просто красивый, а <span className="font-bold gradient-text">продающий с душой</span>.
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card p-6 rounded-3xl shadow-soft hover:shadow-glow transition-all duration-500 group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 shadow-soft group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>

              <p className="text-gray-800 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="glass p-10 rounded-3xl shadow-glow max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Sparkles className="w-12 h-12 text-primary-500 flex-shrink-0 animate-pulse-soft" />
              <div>
                <p className="text-2xl md:text-3xl font-bold gradient-text mb-4 leading-relaxed">
                  &ldquo;Люди покупают не товары, а эмоции и решения своих проблем&rdquo;
                </p>
                <p className="text-lg text-gray-900 font-medium">
                  Именно поэтому я сначала изучаю вашу аудиторию, её боли и желания.
                  А потом создаю стратегию, которая говорит с людьми на их языке
                  и приводит к реальным продажам.
                </p>
              </div>
            </div>
          </div>

          {/* Floating hearts */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 text-primary-300"
          >
            <Heart className="w-16 h-16 fill-current opacity-60" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-8 -left-8 text-secondary-300"
          >
            <Heart className="w-20 h-20 fill-current opacity-50" />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {[
            { number: '24', label: 'года мне', suffix: '' },
            { number: '100', label: 'вовлеченность', suffix: '%' },
            { number: '∞', label: 'индивидуальный подход', suffix: '' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.1 }}
              className="text-center glass-card p-8 rounded-3xl shadow-soft"
            >
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-gray-900 font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
