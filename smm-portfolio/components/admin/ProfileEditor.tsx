'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import ImageUploader from './ImageUploader'

export default function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    age: 24,
    title: '',
    description: '',
    photo: '',
    location: '',
    telegram: '',
    instagram: '',
    threads: '',
    email: '',
    phone: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      const data = await res.json()
      setProfile({
        ...data,
        telegram: data.telegram || '',
        instagram: data.instagram || '',
        threads: data.threads || '',
        email: data.email || '',
        phone: data.phone || '',
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (res.ok) {
        setMessage('Профиль успешно обновлен!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Ошибка при сохранении')
      }
    } catch {
      setMessage('Ошибка при сохранении')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="glass rounded-3xl p-8 shadow-glow">
      <h2 className="text-3xl font-bold mb-8 gradient-text">
        Редактирование профиля
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Имя
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Возраст
          </label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
          />
        </div>

        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Должность
          </label>
          <input
            type="text"
            value={profile.title}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Описание
          </label>
          <textarea
            value={profile.description}
            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            rows={4}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all resize-none text-gray-900 font-medium"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Местоположение
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <ImageUploader
            currentImage={profile.photo}
            onImageChange={(url) => setProfile({ ...profile, photo: url })}
            label="Фото профиля"
            aspectRatio="aspect-square"
          />
        </div>

        {/* Social Links */}
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold mb-6 gradient-text">
            Социальные сети
          </h3>
        </div>

        <div>
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Telegram
          </label>
          <input
            type="text"
            value={profile.telegram}
            onChange={(e) => setProfile({ ...profile, telegram: e.target.value })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
            placeholder="@username"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Instagram
          </label>
          <input
            type="text"
            value={profile.instagram}
            onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
            placeholder="@username"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Threads
          </label>
          <input
            type="text"
            value={profile.threads}
            onChange={(e) => setProfile({ ...profile, threads: e.target.value })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
            placeholder="@username"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-primary-700 mb-2">
            Email (необязательно)
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-gray-900 font-medium"
          />
        </div>
      </div>

      {/* Save button */}
      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-8 py-4 btn-gradient text-white rounded-2xl font-bold hover:shadow-glow hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Сохранение...' : 'Сохранить изменения'}
        </button>

        {message && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`font-bold text-lg ${
              message.includes('успешно')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  )
}
