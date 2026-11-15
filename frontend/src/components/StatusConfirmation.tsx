import { useLayoutEffect, useRef } from 'react'
import type { CateringOrder, StatusField } from '../types'
import { statusLabel } from '../lib/orderUtils'

export interface StatusChange {
  order: CateringOrder
  field: StatusField
  before: boolean
  after: boolean
}
export default function StatusConfirmation({ change, open, onConfirm, onCancel }: {
  change: StatusChange; open: boolean; onConfirm: () => void; onCancel: () => void
}) {
  const cancelButton = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => {
    if (!open) return
    cancelButton.current?.focus({ preventScroll: true })
    // No transition-end event fires with reduced motion, so reveal focus immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cancelButton.current?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, change.field])
  return <div className="inline-confirmation" data-open={open} inert={!open} aria-hidden={!open}
    onTransitionEnd={event => {
      if (open && event.target === event.currentTarget && event.currentTarget.contains(document.activeElement)) cancelButton.current?.scrollIntoView({ block: 'nearest' })
    }}>
    <div className="inline-confirmation-clip">
      <section id={`order-confirmation-${change.order.id}`} className="status-confirmation" aria-labelledby={`confirm-title-${change.order.id}`} aria-describedby={`confirm-order-${change.order.id}`}
        onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onCancel() } }}>
        <div className="confirmation-copy"><h3 id={`confirm-title-${change.order.id}`}>Mark {statusLabel(change.field, change.after)}?</h3><p className="sr-only" id={`confirm-order-${change.order.id}`}>Order #{change.order.id}, {change.order.customerName || 'Unnamed customer'}. Fictional preview only.</p></div>
        <div className="confirmation-actions"><button ref={cancelButton} className="button" onClick={onCancel}>Cancel</button><button className="button primary" onClick={onConfirm}>Confirm</button></div>
      </section>
    </div>
  </div>
}
