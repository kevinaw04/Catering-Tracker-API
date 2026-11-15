import { useCallback, useEffect, useRef, useState } from 'react'
import type { CateringOrder, ConceptProps, StatusField } from '../types'
import { formatDate, formatTime, statusLabel } from '../lib/orderUtils'
import OrderDetails from '../components/OrderDetails'
import OrderEditor from '../components/OrderEditor'
import StatusConfirmation from '../components/StatusConfirmation'
import type { StatusChange } from '../components/StatusConfirmation'
import UndoNotice from '../components/UndoNotice'
import StatusBadge from '../components/StatusBadge'
import Icon from '../components/Icon'
import '../styles/hybrid.css'

interface HybridProps extends ConceptProps {
  editingOrder?: CateringOrder
  onEdit: (id: number) => void
  onBack: () => void
  setStatus: (id: number, field: StatusField, value: boolean) => void
}

export default function HybridOperations({ orders, selected, select, editingOrder, onEdit, onBack, setStatus }: HybridProps) {
  const details = useRef<HTMLDialogElement>(null)
  const [pending, setPending] = useState<(StatusChange & { anchor: HTMLButtonElement }) | null>(null)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [notice, setNotice] = useState<{ message: string; undo?: StatusChange; key: number } | null>(null)
  const sequence = useRef(0)
  const selectedId = selected?.id
  useEffect(() => {
    const node = details.current
    if (selectedId !== undefined && !node?.open) node?.showModal()
    if (selectedId === undefined && node?.open) node.close()
  }, [selectedId])
  const dismissNotice = useCallback(() => setNotice(null), [])
  function editOrder(id: number) {
    setConfirmationOpen(false)
    onEdit(id)
  }
  function viewOrder(id: number) {
    setConfirmationOpen(false)
    select(id)
  }
  function requestStatus(order: CateringOrder, field: StatusField, anchor: HTMLButtonElement) {
    setPending({ order, field, before: order[field], after: !order[field], anchor })
    setConfirmationOpen(true)
  }
  function closeConfirmation() {
    setConfirmationOpen(false)
    pending?.anchor.focus({ preventScroll: true })
  }
  function confirmStatus() {
    if (!pending) return
    setStatus(pending.order.id, pending.field, pending.after)
    setNotice({ message: `Order #${pending.order.id} · ${pending.order.customerName} marked ${statusLabel(pending.field, pending.after)}. Preview only.`, undo: pending, key: ++sequence.current })
    closeConfirmation()
  }
  function undoStatus() {
    const change = notice?.undo
    if (!change) return
    setStatus(change.order.id, change.field, change.before)
    setNotice({ message: `Change undone. Order #${change.order.id} is ${statusLabel(change.field, change.before)} again. Preview only.`, key: ++sequence.current })
    // The Undo button is removed; return focus to the affected queue control.
    document.querySelector<HTMLButtonElement>(`[data-status-order="${change.order.id}-${change.field}"]`)?.focus({ preventScroll: true })
  }
  if (editingOrder) return <OrderEditor key={editingOrder.id} order={editingOrder} onBack={onBack} />
  return <>
    <div className="operations"><div className="operations-heading"><span>Pickup sequence</span><span>Status changes require confirmation · preview only</span></div>
      {orders.map(order => <article className={`operation-row ${selectedId === order.id ? 'expanded' : ''}`} key={order.id} aria-label={`Order ${order.id}`}>
        <div className="operation-main">
          <div className="operation-statuses" aria-label={`Current statuses for order ${order.id}`}><StatusBadge kind="paid" value={order.paid} /><StatusBadge kind="completed" value={order.completed} label={order.completed ? 'Complete' : 'Incomplete'} /></div>
          <button className="operation-view" onClick={() => viewOrder(order.id)} aria-label={`View order ${order.id} details for ${order.customerName}`} aria-haspopup="dialog">
            <span className="operation-time"><strong>{formatTime(order.pickupDate)}</strong><span>{formatDate(order.pickupDate)}</span></span>
            <span className="operation-customer"><span className="operation-customer-title">{order.customerName}<span className="order-id">#{order.id}</span></span><span className="operation-phone">{order.customerPhone}</span><span className="operation-summary">{order.orderDetails}</span><span className="operation-meta">{order.numberOfPeople} people <span aria-hidden="true">·</span> {order.notes ? 'Pickup note included' : 'No additional notes'}</span></span>
          </button>
          <div className="operation-tools">
            <button className="icon-button edit-order" data-edit-order={order.id} aria-label={`Edit order ${order.id}`} title="Edit order" onClick={() => editOrder(order.id)}><Icon name="pencil" size={19} /></button>
          </div>
          <div className="operation-actions">
            {(['paid', 'completed'] as const).map(field => <button key={field} className="button quick-action" data-status-order={`${order.id}-${field}`} aria-label={`Mark ${statusLabel(field, !order[field])} for order ${order.id}`} aria-controls={`order-confirmation-${order.id}`} aria-expanded={confirmationOpen && pending?.order.id === order.id && pending.field === field} onClick={event => requestStatus(order, field, event.currentTarget)}>Mark {statusLabel(field, !order[field])}</button>)}
          </div>
        </div>
        <StatusConfirmation change={pending?.order.id === order.id ? pending : { order, field: 'paid', before: order.paid, after: !order.paid }} open={confirmationOpen && pending?.order.id === order.id} onConfirm={confirmStatus} onCancel={closeConfirmation} />
      </article>)}
    </div>
    <dialog ref={details} className="hybrid-details-dialog" aria-labelledby="hybrid-detail-title" onCancel={() => select(null)} onClose={() => select(null)}>
      <div className="panel-heading"><h2 id="hybrid-detail-title">Order details <span className="muted small">· Read-only</span></h2><button className="icon-button" aria-label="Close order details" onClick={() => select(null)} autoFocus><Icon name="close" /></button></div>
      {selected && <OrderDetails key={selected.id} order={selected} onEdit={() => editOrder(selected.id)} />}
    </dialog>
    {notice && <UndoNotice key={notice.key} message={notice.message} onUndo={notice.undo ? undoStatus : undefined} onDismiss={dismissNotice} />}
  </>
}
