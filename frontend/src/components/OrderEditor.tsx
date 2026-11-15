import { useState } from 'react'
import type { CateringOrder } from '../types'
import StatusBadge from './StatusBadge'
import Icon from './Icon'

export default function OrderEditor({ order, onBack }: { order: CateringOrder; onBack: () => void }) {
  // Draft fields exist only for trying the interface. They never update the queue.
  const [draft, setDraft] = useState({
    customerName: order.customerName ?? '', customerPhone: order.customerPhone ?? '',
    pickupDay: order.pickupDate?.slice(0, 10) ?? '', pickupTime: order.pickupDate?.slice(11, 16) ?? '',
    numberOfPeople: String(order.numberOfPeople ?? ''), orderDetails: order.orderDetails ?? '', notes: order.notes ?? '',
  })
  const update = (field: keyof typeof draft, value: string) => setDraft(current => ({ ...current, [field]: value }))
  return <div className="full-page-editor">
    <button className="text-button editor-back" onClick={onBack}><Icon name="back" />Back to orders</button>
    <div className="editor-heading"><div><div className="eyebrow">ORDER #{order.id} / FICTIONAL SAMPLE</div><h1 id="editor-title" tabIndex={-1}>Edit order<span className="heading-dot">.</span></h1></div><span className="preview-pill">PREVIEW ONLY</span></div>
    <p className="editor-disclaimer" id="editor-disclaimer">Try the fields below. Changes are not saved and will be discarded when you leave. The order queue stays unchanged.</p>
    <form aria-label={`Preview editor for order ${order.id}`} aria-describedby="editor-disclaimer" onSubmit={event => event.preventDefault()}>
      <fieldset><legend>Customer information</legend><div className="editor-fields">
        <label>Customer name<input autoComplete="off" value={draft.customerName} onChange={event => update('customerName', event.target.value)} /></label>
        <label>Phone number<input type="tel" inputMode="tel" autoComplete="off" value={draft.customerPhone} onChange={event => update('customerPhone', event.target.value)} /></label>
      </div></fieldset>
      <fieldset><legend>Pickup & party size</legend><div className="editor-fields pickup-fields">
        <label>Pickup date<input type="date" value={draft.pickupDay} onInput={event => update('pickupDay', event.currentTarget.value)} onChange={event => update('pickupDay', event.target.value)} /></label>
        <label>Pickup time<input type="time" value={draft.pickupTime} onInput={event => update('pickupTime', event.currentTarget.value)} onChange={event => update('pickupTime', event.target.value)} /></label>
        <label>Number of people<input type="number" inputMode="numeric" min="1" step="1" value={draft.numberOfPeople} onChange={event => update('numberOfPeople', event.target.value)} /></label>
      </div></fieldset>
      <fieldset><legend>Order details & notes</legend><div className="editor-fields single-column">
        <label>Order details<textarea rows={5} maxLength={2000} value={draft.orderDetails} onChange={event => update('orderDetails', event.target.value)} /></label>
        <label>Pickup notes<textarea rows={4} maxLength={1000} value={draft.notes} onChange={event => update('notes', event.target.value)} /></label>
      </div></fieldset>
      <fieldset><legend>Order record</legend><p className="metadata-hint">Recorded metadata · read-only</p><div className="editor-fields">
        <label>Cashier name<input readOnly value={order.cashierName ?? ''} /></label>
        <label>Date placed<input type="datetime-local" readOnly value={order.datePlaced?.slice(0, 16) ?? ''} /></label>
      </div><div className="detail-statuses"><StatusBadge kind="paid" value={order.paid} /><StatusBadge kind="completed" value={order.completed} /></div><p className="metadata-hint">Use the order list to preview payment and completion changes.</p></fieldset>
      <div className="editor-bottom"><span>No changes will be saved.</span><button type="button" className="button" onClick={onBack}>Cancel & return to orders</button></div>
    </form>
  </div>
}
