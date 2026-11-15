import { useState } from 'react'
import { previewOrders, SAMPLE_DATE } from '../data/previewOrders'
import { filterOrders } from '../lib/orderUtils'
import type { StatusField } from '../types'

export function usePreviewOrders() {
  const [orders, setOrders] = useState(() => previewOrders.map(order => ({ ...order })))
  const [search, setSearch] = useState('')
  const [date, setDate] = useState(SAMPLE_DATE)
  const [selectedId, select] = useState<number | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const filtered = filterOrders(orders, search, date)
  const selected = filtered.find(order => order.id === selectedId)
  function setStatus(id: number, field: StatusField, value: boolean) {
    setOrders(current => current.map(item => item.id === id ? { ...item, [field]: value } : item))
    setAnnouncement(`Preview order ${id}: ${field === 'paid' ? (value ? 'paid' : 'unpaid') : (value ? 'completed' : 'pending')}. Changed locally only.`)
  }
  function toggle(id: number, field: StatusField) {
    const order = orders.find(order => order.id === id)
    if (!order) return
    setOrders(current => current.map(item => item.id === id ? { ...item, [field]: !item[field] } : item))
    setAnnouncement(`Preview order ${id}: ${field === 'paid' ? (order.paid ? 'unpaid' : 'paid') : (order.completed ? 'pending' : 'completed')}. Changed locally only.`)
  }
  return { orders: filtered, allOrders: orders, selected, select, toggle, setStatus, search, setSearch, date, setDate, announcement }
}
