import { useState } from 'react'
import type { CateringOrder, StatusField } from '../types'
import { formatDate, formatTime } from '../lib/orderUtils'
import StatusBadge from './StatusBadge'
import EditorPreview from './EditorPreview'
import Icon from './Icon'

export default function OrderDetails({ order, toggle, onEdit }: { order: CateringOrder; toggle?: (id: number, field: StatusField) => void; onEdit?: () => void }) {
  const [editorOpen, setEditorOpen] = useState(false)
  return <div className="order-details">
    <div className="detail-kicker"><span>ORDER #{order.id}</span><span>Fictional sample</span></div>
    <h2>{order.customerName || 'Unnamed customer'}</h2><p className="customer-contact">{order.customerPhone || 'No phone recorded'}</p>
    <div className="detail-statuses"><StatusBadge kind="paid" value={order.paid} /><StatusBadge kind="completed" value={order.completed} /></div>
    <div className="pickup-summary"><div><span className="section-label">PICKUP</span><strong>{formatTime(order.pickupDate)}</strong><span>{formatDate(order.pickupDate, !!onEdit)}</span></div><div><span className="section-label">PARTY SIZE</span><strong>{order.numberOfPeople ?? '—'}</strong><span>people</span></div></div>
    <section className="detail-section"><h3>Order details</h3><p>{order.orderDetails || 'No order details recorded.'}</p></section>
    <section className="detail-section notes-section"><h3>Pickup notes</h3><p>{order.notes || 'No additional notes.'}</p></section>
    <dl className="record-meta"><div><dt>Recorded by</dt><dd>{order.cashierName || 'Not recorded'}</dd></div><div><dt>Date placed</dt><dd>{formatDate(order.datePlaced, !!onEdit)} · {formatTime(order.datePlaced)}</dd></div></dl>
    {onEdit ? <button className="button primary details-edit" onClick={onEdit}><Icon name="pencil" />Edit order</button> : <>
      {toggle && <div className="detail-actions"><span className="section-label">PREVIEW ACTIONS · LOCAL ONLY</span><div className="action-pair"><button className="button" onClick={() => toggle(order.id, 'paid')}>{order.paid ? 'Mark unpaid' : 'Mark paid'}</button><button className="button primary" onClick={() => toggle(order.id, 'completed')}><Icon name="check" size={16} />{order.completed ? 'Mark pending' : 'Mark completed'}</button></div></div>}
      <button className="editor-toggle text-button" aria-expanded={editorOpen} onClick={() => setEditorOpen(!editorOpen)}>{editorOpen ? 'Hide editor preview' : 'Preview editor layout'}<Icon name="arrow" size={16} /></button>
      {editorOpen && <EditorPreview order={order} />}
    </>}
  </div>
}
