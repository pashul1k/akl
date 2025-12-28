'use client'

import { useState, useRef } from 'react'
import { Upload, X, Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageUploaderProps {
  currentImage?: string
  onImageChange: (url: string) => void
  label?: string
  aspectRatio?: string
}

export default function ImageUploader({
  currentImage,
  onImageChange,
  label = 'Изображение',
  aspectRatio = 'aspect-square'
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [preview, setPreview] = useState(currentImage || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setSuccess(false)
    setUploading(true)

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Файл слишком большой. Максимум 5MB')
      setUploading(false)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение')
      setUploading(false)
      return
    }

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to server
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Ошибка загрузки')
      }

      const data = await res.json()
      onImageChange(data.url)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки')
      setPreview(currentImage || '')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview('')
    onImageChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-soft-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">
        {/* Preview or Upload Zone */}
        <div
          className={`relative ${aspectRatio} w-full max-w-xs overflow-hidden rounded-2xl border-2 border-dashed border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 transition-all hover:border-primary-400 dark:hover:border-primary-600 ${
            preview ? 'border-solid' : ''
          }`}
        >
          {preview ? (
            // Image Preview
            <div className="relative w-full h-full group">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-white/90 rounded-full hover:bg-white transition-all shadow-lg hover:scale-110"
                >
                  <Upload className="w-5 h-5 text-primary-600" />
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-3 bg-red-500/90 rounded-full hover:bg-red-500 transition-all shadow-lg hover:scale-110"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              {/* Success indicator */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-3 right-3 p-2 bg-green-500 rounded-full shadow-lg"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Upload Zone
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full h-full flex flex-col items-center justify-center p-6 text-center hover:bg-primary-100/50 dark:hover:bg-primary-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-3" />
                  <p className="text-sm text-primary-700 dark:text-primary-300 font-medium">
                    Загрузка...
                  </p>
                </>
              ) : (
                <>
                  <div className="p-4 bg-primary-200 dark:bg-primary-800 rounded-full mb-3">
                    <Upload className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-sm text-soft-700 dark:text-gray-300 font-medium mb-1">
                    Нажмите для загрузки
                  </p>
                  <p className="text-xs text-soft-500 dark:text-soft-400">
                    PNG, JPG, WEBP до 5MB
                  </p>
                </>
              )}
            </button>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg"
            >
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
