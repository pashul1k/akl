'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import Image from 'next/image'
import ImageUploader from './ImageUploader'

interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  clientName?: string | null
  result?: string | null
  order: number
}

export default function PortfolioEditor() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({})

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingId('new')
    setFormData({
      title: '',
      description: '',
      image: '',
      category: 'Instagram',
      clientName: '',
      result: '',
      order: items.length,
    })
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id)
    setFormData(item)
  }

  const handleSave = async () => {
    try {
      if (editingId === 'new') {
        const res = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (res.ok) {
          await fetchItems()
        }
      } else {
        const res = await fetch(`/api/portfolio/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (res.ok) {
          await fetchItems()
        }
      }

      setEditingId(null)
      setFormData({})
    } catch (error) {
      console.error('Error saving portfolio item:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот элемент портфолио?')) return

    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        await fetchItems()
      }
    } catch (error) {
      console.error('Error deleting portfolio item:', error)
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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold gradient-text">
          Редактор портфолио
        </h2>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 btn-gradient text-white rounded-2xl font-bold hover:shadow-glow hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          Добавить проект
        </button>
      </div>

      {/* Edit form */}
      {editingId && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-8 border-2 border-primary-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold gradient-text">
              {editingId === 'new' ? 'Новый проект' : 'Редактирование проекта'}
            </h3>
            <button
              onClick={() => {
                setEditingId(null)
                setFormData({})
              }}
              className="text-primary-500 hover:text-primary-700 hover:scale-110 transition-all"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Название
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Категория
              </label>
              <select
                value={formData.category || 'Instagram'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
              >
                <option value="Instagram">Instagram</option>
                <option value="Telegram">Telegram</option>
                <option value="Threads">Threads</option>
                <option value="SMM">SMM</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all resize-none text-soft-900 font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <ImageUploader
                currentImage={formData.image || ''}
                onImageChange={(url) => setFormData({ ...formData, image: url })}
                label="Изображение проекта"
                aspectRatio="aspect-video"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Клиент
              </label>
              <input
                type="text"
                value={formData.clientName || ''}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Результаты
              </label>
              <input
                type="text"
                value={formData.result || ''}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
                placeholder="+300% охватов, +150% конверсия"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 flex items-center gap-2 px-8 py-4 btn-gradient text-white rounded-2xl font-bold hover:shadow-glow hover:scale-105 transition-all text-lg"
          >
            <Save className="w-5 h-5" />
            Сохранить
          </button>
        </motion.div>
      )}

      {/* Items list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            className="bg-gray-50 dark:bg-soft-700 rounded-xl overflow-hidden"
          >
            <div className="relative aspect-video bg-primary-100 dark:bg-soft-600">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-soft-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-soft-800 font-semibold">
                    {item.category}
                  </p>
                </div>
              </div>

              <p className="text-sm text-soft-800 mb-4 line-clamp-2 font-medium">
                {item.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Изменить
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Удалить
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {items.length === 0 && !editingId && (
        <div className="text-center py-12">
          <p className="text-soft-900 font-semibold">
            Нет проектов в портфолио. Добавьте первый проект!
          </p>
        </div>
      )}
    </div>
  )
}
