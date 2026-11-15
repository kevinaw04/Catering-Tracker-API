import { useEffect, useRef } from 'react'
import type { ConceptProps } from '../types'
import { formatDate, formatTime } from '../lib/orderUtils'
import StatusBadge from '../components/StatusBadge'
import OrderDetails from '../components/OrderDetails'
import Icon from '../components/Icon'

export default function SplitWorkspace({ orders, selected, select, toggle }: ConceptProps) {
  const panelTitle = useRef<HTMLHeadingElement>(null)
  const lastButton = useRef<HTMLButtonElement | null>(null)
  const selectedId = selected?.id
  useEffect(() => {
    if (window.matchMedia('(max-width: 699px)').matches) {
      if (selectedId !== undefined) panelTitle.current?.focus()
      else lastButton.current?.focus()
    }
  }, [selectedId])
  return <div className={`split-workspace ${selected ? 'has-selection' : ''}`}>
    <section className="split-list" aria-label="Select a sample order"><div className="list-heading"><span>PICKUP QUEUE</span><span>{orders.length} orders</span></div><div className="split-order-scroll">{orders.map(order => <button key={order.id} className={`split-order ${selected?.id === order.id ? 'selected' : ''}`} aria-pressed={selected?.id === order.id} onClick={event => { lastButton.current = event.currentTarget; select(order.id) }}>
      <span className="split-order-top"><span className="pickup-time">{formatTime(order.pickupDate)}<span className="split-date"> · {formatDate(order.pickupDate)}</span></span><span className="order-id">#{order.id}</span></span>
      <span className="split-customer">{order.customerName}<Icon name="chevron" size={15} /></span><span className="split-summary">{order.orderDetails}</span>
      <span className="split-order-bottom"><span>{order.numberOfPeople} people</span><span className="badge-pair"><StatusBadge kind="paid" value={order.paid} /><StatusBadge kind="completed" value={order.completed} /></span></span>
    </button>)}</div></section>
    <section className="split-detail" aria-label="Selected order details"><div className="panel-heading"><button className="text-button mobile-back" onClick={() => select(null)}><Icon name="back" size={16} />Back to orders</button><h2 ref={panelTitle} tabIndex={-1}>Order workspace</h2><span className="small muted desktop-only">Fictional sample</span></div>
      {selected ? <OrderDetails key={selected.id} order={selected} toggle={toggle} /> : <div className="detail-placeholder"><span className="placeholder-icon"><Icon name="split" size={26} /></span><h2>A little room to focus.</h2><p>Select an order on the left to view its details<br className="desktop-only" /> and preview cashier actions.</p><span className="small muted">The list stays right where you left it.</span></div>}
    </section>
  </div>
}
