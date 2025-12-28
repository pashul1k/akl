'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, X, GripVertical } from 'lucide-react'

interface AboutSection {
  id: string
  type: string
  title: string
  items: string[]
}

export default function AboutSectionEditor() {
  const [sections, setSections] = useState<AboutSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/about')
      const data = await res.json()
      setSections(data)
    } catch (error) {
      console.error('Error fetching sections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      // Обновить каждую секцию
      const promises = sections.map(section =>
        fetch('/api/about', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: section.id,
            title: section.title,
            items: section.items
          }),
        })
      )

      const responses = await Promise.all(promises)

      if (responses.every(res => res.ok)) {
        setMessage('Секции успешно обновлены!')
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

  const updateSection = (sectionId: string, updates: Partial<AboutSection>) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, ...updates }
        : section
    ))
  }

  const addItem = (sectionId: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, items: [...section.items, ''] }
        : section
    ))
  }

  const updateItem = (sectionId: string, itemIndex: number, value: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            items: section.items.map((item, idx) =>
              idx === itemIndex ? value : item
            )
          }
        : section
    ))
  }

  const removeItem = (sectionId: string, itemIndex: number) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? {
            ...section,
            items: section.items.filter((_, idx) => idx !== itemIndex)
          }
        : section
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const aboutMeSection = sections.find(s => s.type === 'aboutMe')
  const whyMeSection = sections.find(s => s.type === 'whyMe')

  return (
    <div className="space-y-8">
      {/* AboutMe Section */}
      {aboutMeSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 shadow-glow"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            Редактирование секции "Немного обо мне"
          </h2>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-primary-700 mb-2">
              Заголовок секции
            </label>
            <input
              type="text"
              value={aboutMeSection.title}
              onChange={(e) => updateSection(aboutMeSection.id, { title: e.target.value })}
              className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
            />
          </div>

          {/* Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-primary-700">
                Пункты ({aboutMeSection.items.length})
              </label>
              <button
                onClick={() => addItem(aboutMeSection.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-400 to-secondary-400 text-white rounded-xl font-semibold hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                Добавить пункт
              </button>
            </div>

            {aboutMeSection.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-3">
                  <GripVertical className="w-5 h-5 text-soft-400" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={item}
                    onChange={(e) => updateItem(aboutMeSection.id, index, e.target.value)}
                    rows={2}
                    placeholder={`Пункт ${index + 1}`}
                    className="w-full px-4 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all resize-none text-soft-900 font-medium"
                  />
                </div>
                <button
                  onClick={() => removeItem(aboutMeSection.id, index)}
                  className="flex-shrink-0 mt-2 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* WhyMe Section */}
      {whyMeSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 shadow-glow"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            Редактирование секции "Почему именно я?"
          </h2>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-primary-700 mb-2">
              Заголовок секции
            </label>
            <input
              type="text"
              value={whyMeSection.title}
              onChange={(e) => updateSection(whyMeSection.id, { title: e.target.value })}
              className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
            />
          </div>

          {/* Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-primary-700">
                Пункты ({whyMeSection.items.length})
              </label>
              <button
                onClick={() => addItem(whyMeSection.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-400 to-secondary-400 text-white rounded-xl font-semibold hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                Добавить пункт
              </button>
            </div>

            {whyMeSection.items.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-3">
                  <GripVertical className="w-5 h-5 text-soft-400" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={item}
                    onChange={(e) => updateItem(whyMeSection.id, index, e.target.value)}
                    rows={2}
                    placeholder={`Пункт ${index + 1}`}
                    className="w-full px-4 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all resize-none text-soft-900 font-medium"
                  />
                </div>
                <button
                  onClick={() => removeItem(whyMeSection.id, index)}
                  className="flex-shrink-0 mt-2 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-8 py-4 btn-gradient text-white rounded-2xl font-bold hover:shadow-glow hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Сохранение...' : 'Сохранить все изменения'}
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
