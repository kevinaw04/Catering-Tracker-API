import type { CateringOrder, StatusField } from '../types'

export function statusLabel(field: StatusField, value: boolean) {
  return field === 'paid' ? (value ? 'paid' : 'unpaid') : (value ? 'complete' : 'incomplete')
}

// Parse as local wall-clock time, never append Z or convert through UTC.
export function formatTime(value: string | null) {
  return value ? new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : 'Not set'
}
export function formatDate(value: string | null, long = false) {
  return value ? new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString('en-US', {
    month: long ? 'long' : 'short', day: 'numeric', ...(long ? { weekday: 'long' as const, year: 'numeric' as const } : {}),
  }) : 'Not set'
}
export function filterOrders(orders: CateringOrder[], search: string, date: string) {
  const query = search.trim().toLowerCase()
  return orders.filter(order => (!date || order.pickupDate?.slice(0, 10) === date) &&
    [order.customerName, order.customerPhone, String(order.id), order.orderDetails].some(value => value?.toLowerCase().includes(query)))
    .sort((a, b) => (a.pickupDate ?? '').localeCompare(b.pickupDate ?? '') || a.id - b.id)
}
