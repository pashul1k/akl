'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { Heart, Sparkles, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

interface PortfolioItem {
  id: string
  postTitle: string
  images: string[]
  workDescription: string
  postLink?: string | null
  category: string
}

interface PortfolioProps {
  items: PortfolioItem[]
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video bg-gradient-to-br from-primary-100 via-secondary-100 to-peach-100 flex items-center justify-center">
        <Sparkles className="w-16 h-16 text-soft-300" />
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative aspect-video group">
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        fill
        className="object-cover"
      />

      {/* Navigation arrows - only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg z-10"
          >
            <ChevronLeft className="w-6 h-6 text-soft-900" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 shadow-lg z-10"
          >
            <ChevronRight className="w-6 h-6 text-soft-900" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Portfolio({ items }: PortfolioProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [modalImageIndex, setModalImageIndex] = useState(0)

  const nextModalImage = () => {
    if (!selectedItem) return
    setModalImageIndex((prev) => (prev + 1) % selectedItem.images.length)
  }

  const prevModalImage = () => {
    if (!selectedItem) return
    setModalImageIndex((prev) => (prev - 1 + selectedItem.images.length) % selectedItem.images.length)
  }

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-soft" />

      {/* Floating hearts */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-[10%] text-primary-300"
      >
        <Heart className="w-12 h-12 fill-current" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-32 right-[15%] text-secondary-300"
      >
        <Sparkles className="w-10 h-10" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <Sparkles className="w-8 h-8 text-primary-500" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Портфолио
            </h2>
            <Sparkles className="w-8 h-8 text-secondary-500" />
          </motion.div>
          <p className="text-soft-900 text-lg font-semibold">
            Проекты, которыми я горжусь ✨
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div
                onClick={() => {
                  setSelectedItem(item)
                  setModalImageIndex(0)
                }}
                className="group relative overflow-hidden rounded-3xl cursor-pointer glass hover:shadow-glow transition-all duration-500 hover:scale-[1.02]"
                style={{
                  marginBottom: index % 3 === 0 ? '2rem' : index % 3 === 1 ? '1rem' : '1.5rem'
                }}
              >
                {/* Image Carousel */}
                <div className="relative overflow-hidden bg-gradient-to-br from-primary-100 via-secondary-100 to-peach-100">
                  <ImageCarousel images={item.images} />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/90 via-secondary-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-white fill-current" />
                        <p className="text-white text-sm font-semibold">{item.category}</p>
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2">{item.postTitle}</h3>
                      <p className="text-white/95 text-sm line-clamp-2">{item.workDescription}</p>
                      {item.images.length > 1 && (
                        <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                          <span className="text-white text-xs font-semibold">{item.images.length} фото</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4 px-4 py-2 glass-card rounded-full text-sm font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-soft group-hover:scale-110 transition-transform">
                  {item.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for selected item */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-glow-purple"
          >
            {/* Image Carousel in Modal */}
            <div className="relative">
              {selectedItem.images.length > 0 ? (
                <div className="relative aspect-video bg-gradient-to-br from-primary-100 via-secondary-100 to-peach-100">
                  <Image
                    src={selectedItem.images[modalImageIndex]}
                    alt={`${selectedItem.postTitle} - фото ${modalImageIndex + 1}`}
                    fill
                    className="object-cover rounded-t-3xl"
                  />

                  {/* Navigation for multiple images */}
                  {selectedItem.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevModalImage()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                      >
                        <ChevronLeft className="w-7 h-7 text-soft-900" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          nextModalImage()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg"
                      >
                        <ChevronRight className="w-7 h-7 text-soft-900" />
                      </button>

                      {/* Image counter */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                        {modalImageIndex + 1} / {selectedItem.images.length}
                      </div>

                      {/* Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedItem.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              setModalImageIndex(index)
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              index === modalImageIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="relative aspect-video bg-gradient-to-br from-primary-100 via-secondary-100 to-peach-100 flex items-center justify-center rounded-t-3xl">
                  <Sparkles className="w-20 h-20 text-soft-300" />
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent rounded-t-3xl" />
            </div>

            <div className="p-8 bg-gradient-soft">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2 btn-gradient text-white rounded-full text-sm font-bold shadow-soft">
                  <Heart className="w-4 h-4 fill-current" />
                  {selectedItem.category}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 gradient-text">
                {selectedItem.postTitle}
              </h3>

              <div className="mb-6 p-5 glass-card rounded-2xl bg-gradient-to-r from-primary-50 to-secondary-50">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <p className="text-sm font-bold text-primary-700">Описание работы:</p>
                </div>
                <p className="text-soft-900 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                  {selectedItem.workDescription}
                </p>
              </div>

              {selectedItem.postLink && (
                <a
                  href={selectedItem.postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mb-4 w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-bold hover:shadow-glow hover:scale-[1.02] transition-all text-lg flex items-center justify-center gap-3"
                >
                  <ExternalLink className="w-5 h-5" />
                  Посмотреть пост
                </a>
              )}

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full px-8 py-4 glass-card text-soft-900 rounded-2xl font-bold hover:shadow-soft hover:scale-[1.02] transition-all text-lg"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
