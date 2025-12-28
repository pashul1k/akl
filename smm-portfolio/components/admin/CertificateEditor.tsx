'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Award } from 'lucide-react'
import Image from 'next/image'
import ImageUploader from './ImageUploader'

interface Certificate {
  id: string
  title: string
  organization: string
  date: string
  image: string
  order: number
}

export default function CertificateEditor() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Certificate>>({})

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const res = await fetch('/api/certificates')
      const data = await res.json()
      setCertificates(data)
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingId('new')
    setFormData({
      title: '',
      organization: '',
      date: '',
      image: '',
      order: certificates.length,
    })
  }

  const handleEdit = (cert: Certificate) => {
    setEditingId(cert.id)
    setFormData(cert)
  }

  const handleSave = async () => {
    try {
      if (editingId === 'new') {
        const res = await fetch('/api/certificates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (res.ok) {
          await fetchCertificates()
        }
      } else {
        const res = await fetch('/api/certificates', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingId }),
        })

        if (res.ok) {
          await fetchCertificates()
        }
      }

      setEditingId(null)
      setFormData({})
    } catch (error) {
      console.error('Error saving certificate:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот сертификат?')) return

    try {
      const res = await fetch('/api/certificates', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        await fetchCertificates()
      }
    } catch (error) {
      console.error('Error deleting certificate:', error)
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
        <h2 className="text-3xl font-bold gradient-text inline-flex items-center gap-3">
          <Award className="w-8 h-8" />
          Управление сертификатами
        </h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 btn-gradient text-white rounded-2xl font-bold hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          Добавить сертификат
        </button>
      </div>

      {/* Edit Form */}
      {editingId && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl mb-8 border-2 border-primary-300"
        >
          <h3 className="text-xl font-bold mb-4 gradient-text">
            {editingId === 'new' ? 'Новый сертификат' : 'Редактирование сертификата'}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Название курса/программы *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
                placeholder="Например: Психолог дошкольных учреждений"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Организация *
              </label>
              <input
                type="text"
                value={formData.organization || ''}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
                placeholder="Например: Expert X"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Дата получения *
              </label>
              <input
                type="text"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
                placeholder="Например: 23.06.2024"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2">
                Порядок отображения
              </label>
              <input
                type="number"
                value={formData.order ?? 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                className="w-full px-5 py-3 glass-card border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all text-soft-900 font-medium"
              />
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <ImageUploader
                currentImage={formData.image || ''}
                onImageChange={(url) => setFormData({ ...formData, image: url })}
                label="Изображение сертификата"
                aspectRatio="aspect-[3/4]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              disabled={!formData.title || !formData.organization || !formData.date || !formData.image}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              Сохранить
            </button>
            <button
              onClick={() => {
                setEditingId(null)
                setFormData({})
              }}
              className="flex items-center gap-2 px-6 py-3 bg-soft-300 hover:bg-soft-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
            >
              <X className="w-5 h-5" />
              Отмена
            </button>
          </div>
        </motion.div>
      )}

      {/* Certificates Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4 rounded-2xl shadow-soft hover:shadow-glow transition-all group"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] mb-3 rounded-xl overflow-hidden bg-white">
              {cert.image ? (
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100">
                  <Award className="w-12 h-12 text-soft-400" />
                </div>
              )}
            </div>

            {/* Info */}
            <h4 className="text-sm font-bold text-soft-900 mb-1 line-clamp-2">
              {cert.title}
            </h4>
            <p className="text-xs text-soft-700 font-medium mb-1">
              {cert.organization}
            </p>
            <p className="text-xs text-soft-600 mb-3">
              {cert.date}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cert)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all"
              >
                <Edit2 className="w-3 h-3" />
                Изменить
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-soft-500 text-lg font-medium">
            Сертификаты не добавлены
          </p>
          <p className="text-soft-400 mt-2">
            Нажмите "Добавить сертификат" чтобы начать
          </p>
        </div>
      )}
    </div>
  )
}
