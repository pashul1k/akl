'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock, MessageCircle, Instagram } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string | null
  social: string
  socialType: string
  message: string
  isRead: boolean
  status: string
  createdAt: string
}

const statusLabels: Record<string, { label: string; color: string; icon: string }> = {
  pending: { label: 'На рассмотрении', color: 'bg-yellow-500', icon: '⏳' },
  contacted: { label: 'Связалась', color: 'bg-green-500', icon: '✅' },
  rejected: { label: 'Отказ', color: 'bg-red-500', icon: '❌' },
  working: { label: 'Начало работы', color: 'bg-blue-500', icon: '🚀' }
}

export default function ContactsViewer() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

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

  const updateStatus = async (contactId: string, newStatus: string) => {
    setUpdatingStatus(contactId)
    try {
      const res = await fetch(`/api/contact/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        setContacts(contacts.map(contact =>
          contact.id === contactId
            ? { ...contact, status: newStatus }
            : contact
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdatingStatus(null)
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
                <div className="flex items-center gap-2 text-soft-900 font-medium">
                  {contact.socialType === 'telegram' ? (
                    <MessageCircle className="w-4 h-4 text-primary-600" />
                  ) : (
                    <Instagram className="w-4 h-4 text-primary-600" />
                  )}
                  <span>
                    {contact.socialType === 'telegram' ? 'Telegram' : 'Instagram'}: {contact.social}
                  </span>
                </div>
              </div>

              <div className="glass-card rounded-xl p-5 border-2 border-primary-100 mb-4">
                <p className="text-soft-900 whitespace-pre-wrap font-medium leading-relaxed">
                  {contact.message}
                </p>
              </div>

              {/* Current Status Badge */}
              <div className="mb-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-soft">
                  <span className="text-sm font-semibold text-soft-700">Статус:</span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${statusLabels[contact.status]?.color || 'bg-gray-500'} text-white text-sm font-bold`}>
                    <span>{statusLabels[contact.status]?.icon || '❓'}</span>
                    <span>{statusLabels[contact.status]?.label || contact.status}</span>
                  </span>
                </div>
              </div>

              {/* Status Change Buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusLabels).map(([status, { label, color, icon }]) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(contact.id, status)}
                    disabled={updatingStatus === contact.id || contact.status === status}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      contact.status === status
                        ? 'bg-soft-200 text-soft-500 cursor-not-allowed'
                        : updatingStatus === contact.id
                        ? 'bg-soft-200 text-soft-400 cursor-wait'
                        : 'glass-card text-soft-900 hover:shadow-soft hover:scale-105'
                    }`}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                    {updatingStatus === contact.id && (
                      <div className="w-3 h-3 border-2 border-soft-900 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
