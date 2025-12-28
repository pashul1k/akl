'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, Send, User, Heart, Instagram as InstagramIcon } from 'lucide-react'
import { useState } from 'react'

interface ContactFormProps {
  socialLinks: {
    telegram?: string | null
    instagram?: string | null
    threads?: string | null
  }
}

export default function ContactForm({ socialLinks }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    social: '',
    socialType: 'telegram' as 'telegram' | 'instagram',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    // Validate social field
    if (!formData.social.trim()) {
      setError('Пожалуйста, укажите ваш Telegram или Instagram')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          social: '',
          socialType: 'telegram',
          message: '',
        })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await res.json()
        setError(data.error || 'Произошла ошибка')
        setStatus('error')
      }
    } catch {
      setError('Произошла ошибка при отправке')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Мягкий фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-primary-50 to-peach-50" />

      {/* Декоративные элементы */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full blur-3xl opacity-30 animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-peach-300 to-primary-300 rounded-full blur-3xl opacity-30 animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Heart className="w-6 h-6 text-primary-500 fill-current animate-pulse-soft" />
            <span className="text-sm font-semibold gradient-text uppercase tracking-wider">Давайте работать вместе</span>
            <Heart className="w-6 h-6 text-primary-500 fill-current animate-pulse-soft" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Свяжитесь со мной
          </h2>
          <p className="text-gray-900 text-lg max-w-2xl mx-auto font-medium">
            Готова обсудить ваш проект и помочь вашему бизнесу расти через социальные сети
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Информация и соцсети */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass rounded-3xl p-8 shadow-soft-lg">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                Мои контакты
              </h3>

              <div className="space-y-4">
                {socialLinks.telegram && (
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={`https://t.me/${socialLinks.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl glass-hover group"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-glow group-hover:shadow-glow-purple transition-all">
                      <Send className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-bold">Telegram</p>
                      <p className="font-bold text-gray-900 text-lg group-hover:gradient-text transition-all">
                        {socialLinks.telegram}
                      </p>
                    </div>
                  </motion.a>
                )}

                {socialLinks.instagram && (
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={`https://instagram.com/${socialLinks.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl glass-hover group"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-glow group-hover:shadow-glow-purple transition-all">
                      <InstagramIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-bold">Instagram</p>
                      <p className="font-bold text-gray-900 text-lg group-hover:gradient-text transition-all">
                        {socialLinks.instagram}
                      </p>
                    </div>
                  </motion.a>
                )}

                {socialLinks.threads && (
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={`https://threads.net/${socialLinks.threads.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl glass-hover group"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-glow group-hover:shadow-glow-purple transition-all">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-bold">Threads</p>
                      <p className="font-bold text-gray-900 text-lg group-hover:gradient-text transition-all">
                        {socialLinks.threads}
                      </p>
                    </div>
                  </motion.a>
                )}
              </div>
            </div>

            {/* Преимущества работы */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-3xl p-8 shadow-soft-lg"
            >
              <h4 className="font-bold text-xl mb-4 gradient-text">Почему выбирают меня?</h4>
              <ul className="space-y-3">
                {[
                  'Психологический подход к продажам',
                  'Индивидуальная стратегия для каждого',
                  'Быстрая обратная связь',
                  'Результаты уже в первый месяц'
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500" />
                    <span className="text-gray-900 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Форма */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 shadow-soft-lg space-y-6">
              {/* Имя */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Ваше имя *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 input-soft bg-white/80 dark:bg-gray-800/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="Как вас зовут?"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 input-soft bg-white/80 dark:bg-gray-800/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Телефон (необязательно) */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Телефон
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 input-soft bg-white/80 dark:bg-gray-800/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                </div>
              </div>

              {/* Социальная сеть (ОБЯЗАТЕЛЬНО) */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Ваш Telegram или Instagram * <span className="text-primary-600 font-bold">(обязательно)</span>
                </label>

                {/* Переключатель типа */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, socialType: 'telegram' })}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                      formData.socialType === 'telegram'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-soft'
                        : 'glass-card text-gray-900'
                    }`}
                  >
                    <Send className="w-5 h-5 inline mr-2" />
                    Telegram
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, socialType: 'instagram' })}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                      formData.socialType === 'instagram'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-soft'
                        : 'glass-card text-gray-900'
                    }`}
                  >
                    <InstagramIcon className="w-5 h-5 inline mr-2" />
                    Instagram
                  </button>
                </div>

                <div className="relative">
                  {formData.socialType === 'telegram' ? (
                    <Send className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                  ) : (
                    <InstagramIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-500" />
                  )}
                  <input
                    type="text"
                    required
                    value={formData.social}
                    onChange={(e) => setFormData({ ...formData, social: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 input-soft bg-white/80 dark:bg-gray-800/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder={formData.socialType === 'telegram' ? '@username или ссылка' : '@username или ссылка'}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-800 font-medium">
                  Нужен для быстрой связи и согласования деталей проекта
                </p>
              </div>

              {/* Сообщение */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Расскажите о вашем проекте *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-4 input-soft bg-white/80 dark:bg-gray-800/50 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                  placeholder="Опишите ваши цели, задачи и ожидания от сотрудничества..."
                />
              </div>

              {/* Кнопка отправки */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 btn-gradient text-white rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-soft-lg relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'loading' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Отправить сообщение
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Сообщения статуса */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700 rounded-2xl"
                >
                  <p className="text-green-700 dark:text-green-300 font-semibold text-center">
                    ✨ Спасибо! Ваше сообщение отправлено. Свяжусь с вами в ближайшее время!
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-2xl"
                >
                  <p className="text-red-700 dark:text-red-300 font-semibold text-center">
                    {error || 'Произошла ошибка. Попробуйте еще раз.'}
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
