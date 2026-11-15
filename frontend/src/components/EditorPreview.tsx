import type { CateringOrder } from '../types'
export default function EditorPreview({ order }: { order: CateringOrder }) {
  return <section className="editor-preview" aria-label="Read-only editor preview">
    <div className="section-label">EDITOR LAYOUT</div><p className="muted small">Read-only design preview. Creating and saving orders comes after design selection.</p>
    <div className="form-grid">
      <label>Customer name<input readOnly value={order.customerName ?? ''} /></label>
      <label>Phone<input readOnly type="tel" value={order.customerPhone ?? ''} /></label>
      <label>Pickup date & time<input readOnly type="datetime-local" value={order.pickupDate?.slice(0, 16) ?? ''} /></label>
      <label>Number of people<input readOnly type="number" value={order.numberOfPeople ?? ''} /></label>
      <label>Recorded cashier<input readOnly value={order.cashierName ?? ''} /></label>
      <label>Date placed<input readOnly type="datetime-local" value={order.datePlaced?.slice(0, 16) ?? ''} /></label>
      <label className="full-width">Order details<textarea readOnly rows={4} value={order.orderDetails ?? ''} /></label>
      <label className="full-width">Notes<textarea readOnly rows={3} value={order.notes ?? ''} /></label>
    </div>
    <p className="small muted">Paid and completed controls above change this preview locally.</p>
  </section>
}
