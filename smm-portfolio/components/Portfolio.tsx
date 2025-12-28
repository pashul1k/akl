'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  clientName?: string | null
  result?: string | null
}

interface PortfolioProps {
  items: PortfolioItem[]
}

export default function Portfolio({ items }: PortfolioProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent dark:via-primary-950/30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Портфолио
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Проекты, которыми я горжусь
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
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{
                  marginBottom: index % 3 === 0 ? '2rem' : index % 3 === 1 ? '1rem' : '1.5rem'
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary-200 to-secondary-200 dark:from-primary-800 dark:to-secondary-800">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-sm font-semibold mb-2">{item.category}</p>
                      <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/90 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative aspect-video">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover rounded-t-3xl"
              />
            </div>

            <div className="p-8">
              <div className="mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-sm font-semibold">
                  {selectedItem.category}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {selectedItem.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedItem.description}
              </p>

              {selectedItem.clientName && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Клиент:</p>
                  <p className="text-lg text-gray-800 dark:text-gray-200">{selectedItem.clientName}</p>
                </div>
              )}

              {selectedItem.result && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Результаты:</p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {selectedItem.result}
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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
