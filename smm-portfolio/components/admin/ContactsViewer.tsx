'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string | null
  message: string
  isRead: boolean
  createdAt: string
}

export default function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredContacts = contacts.filter((contact) => {
    if (filter === 'unread') return !contact.isRead
    return true
  })

  const unreadCount = contacts.filter((c) => !c.isRead).length

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
        <div>
          <h2 className="text-3xl font-bold gradient-text">
            Обращения
          </h2>
          {unreadCount > 0 && (
            <p className="text-sm text-soft-900 font-bold mt-2">
              Непрочитанных: {unreadCount}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${
              filter === 'all'
                ? 'btn-gradient text-white shadow-glow'
                : 'glass-card text-soft-900 hover:shadow-soft'
            }`}
          >
            Все ({contacts.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${
              filter === 'unread'
                ? 'btn-gradient text-white shadow-glow'
                : 'glass-card text-soft-900 hover:shadow-soft'
            }`}
          >
            Непрочитанные ({unreadCount})
          </button>
        </div>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-soft-900 font-semibold">
            {filter === 'unread' ? 'Нет непрочитанных обращений' : 'Нет обращений'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl p-6 ${
                contact.isRead
                  ? 'glass-card'
                  : 'glass-card border-2 border-primary-300 shadow-glow'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl shadow-soft">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-soft-900 flex items-center gap-2 text-lg">
                      {contact.name}
                      {!contact.isRead && (
                        <span className="px-3 py-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs rounded-full font-bold">
                          Новое
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-soft-800 font-medium mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary-600" />
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-soft-900 font-medium">
                  <Mail className="w-4 h-4 text-primary-600" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary-700 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2 text-soft-900 font-medium">
                    <Phone className="w-4 h-4 text-primary-600" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-primary-700 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="glass-card rounded-xl p-5 border-2 border-primary-100">
                <p className="text-soft-900 whitespace-pre-wrap font-medium leading-relaxed">
                  {contact.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
