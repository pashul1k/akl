'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, ImagePlus, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import ImageUploader from './ImageUploader'

interface PortfolioItem {
  id: string
  postTitle: string
  images: string[]
  workDescription: string
  postLink?: string | null
  category: string
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
      postTitle: '',
      images: [],
      workDescription: '',
      postLink: '',
      category: 'Instagram',
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

  const addImage = () => {
    setFormData({
      ...formData,
      images: [...(formData.images || []), '']
    })
  }

  const updateImage = (index: number, url: string) => {
    const newImages = [...(formData.images || [])]
    newImages[index] = url
    setFormData({
      ...formData,
      images: newImages
    })
  }

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])]
    newImages.splice(index, 1)
    setFormData({
      ...formData,
      images: newImages
    })
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

          <div className="space-y-6">
            {/* Post Title */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Что за пост
              </label>
              <input
                type="text"
                value={formData.postTitle || ''}
                onChange={(e) => setFormData({ ...formData, postTitle: e.target.value })}
                placeholder="Например: Продвижение кофейни в Instagram"
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
              />
            </div>

            {/* Category */}
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

            {/* Work Description */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                В чем заключалась работа Марго
              </label>
              <textarea
                value={formData.workDescription || ''}
                onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
                rows={5}
                placeholder="Опишите детально, какую работу провела Марго для этого проекта..."
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all resize-none text-soft-900 font-medium"
              />
            </div>

            {/* Post Link */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Ссылка на пост (опционально)
              </label>
              <div className="relative">
                <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
                <input
                  type="url"
                  value={formData.postLink || ''}
                  onChange={(e) => setFormData({ ...formData, postLink: e.target.value })}
                  placeholder="https://instagram.com/p/..."
                  className="w-full pl-12 pr-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
                />
              </div>
            </div>

            {/* Images */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-primary-700">
                  Фотографии проекта ({(formData.images || []).length})
                </label>
                <button
                  type="button"
                  onClick={addImage}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-400 to-secondary-400 text-white rounded-xl font-semibold hover:scale-105 transition-all text-sm"
                >
                  <ImagePlus className="w-4 h-4" />
                  Добавить фото
                </button>
              </div>

              {(formData.images || []).length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-primary-300 rounded-xl">
                  <p className="text-soft-600 mb-3 font-medium">Нет загруженных фотографий</p>
                  <button
                    type="button"
                    onClick={addImage}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors font-semibold"
                  >
                    <ImagePlus className="w-4 h-4" />
                    Добавить первое фото
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {(formData.images || []).map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <ImageUploader
                            currentImage={imageUrl}
                            onImageChange={(url) => updateImage(index, url)}
                            label={`Фото ${index + 1}`}
                            aspectRatio="aspect-video"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="flex-shrink-0 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!formData.postTitle || !formData.workDescription}
            className="mt-6 flex items-center gap-2 px-8 py-4 btn-gradient text-white rounded-2xl font-bold hover:shadow-glow hover:scale-105 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
              {item.images && item.images.length > 0 ? (
                <>
                  <Image
                    src={item.images[0]}
                    alt={item.postTitle}
                    fill
                    className="object-cover"
                  />
                  {item.images.length > 1 && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-xs font-bold">
                      {item.images.length} фото
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-soft-400">
                  <ImagePlus className="w-12 h-12" />
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-soft-900">
                    {item.postTitle}
                  </h3>
                  <p className="text-sm text-soft-800 font-semibold">
                    {item.category}
                  </p>
                </div>
              </div>

              <p className="text-sm text-soft-800 mb-4 line-clamp-2 font-medium">
                {item.workDescription}
              </p>

              {item.postLink && (
                <a
                  href={item.postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 mb-3 font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  Ссылка на пост
                </a>
              )}

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
