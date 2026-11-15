import { useEffect, useRef } from 'react'
import type { ConceptProps } from '../types'
import { formatDate, formatTime } from '../lib/orderUtils'
import StatusBadge from '../components/StatusBadge'
import OrderDetails from '../components/OrderDetails'
import Icon from '../components/Icon'

export default function PrecisionTable({ orders, selected, select, toggle }: ConceptProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const selectedId = selected?.id
  useEffect(() => {
    const node = dialog.current
    if (selectedId !== undefined && !node?.open) node?.showModal()
    if (selectedId === undefined && node?.open) node.close()
  }, [selectedId])
  return <>
    <div className="table-surface"><table className="orders-table"><caption className="sr-only">Fictional catering orders sorted by pickup time</caption><thead><tr><th scope="col">Order / Customer</th><th scope="col">Pickup</th><th scope="col" className="people-col">People</th><th scope="col" className="summary-col">Order summary</th><th scope="col">Payment</th><th scope="col" className="completion-col">Completion</th><th scope="col"><span className="sr-only">Details</span></th></tr></thead><tbody>{orders.map(order => <tr key={order.id} className={selectedId === order.id ? 'selected' : ''}>
      <td><button className="order-link" onClick={() => select(order.id)}><span className="order-id">#{order.id}</span><span>{order.customerName}</span></button><span className="phone-secondary">{order.customerPhone}</span></td>
      <td><strong className="pickup-time">{formatTime(order.pickupDate)}</strong><span className="cell-secondary">{formatDate(order.pickupDate)}</span></td><td className="people-col tabular">{order.numberOfPeople}</td>
      <td className="summary-col"><span className="table-summary">{order.orderDetails}</span></td><td><StatusBadge kind="paid" value={order.paid} /><span className="mobile-completion"><StatusBadge kind="completed" value={order.completed} /></span></td><td className="completion-col"><StatusBadge kind="completed" value={order.completed} /></td>
      <td><button className="icon-button row-open" onClick={() => select(order.id)} aria-label={`View order ${order.id} details`}><Icon name="arrow" size={17} /></button></td>
    </tr>)}</tbody></table><div className="surface-footer"><span>Sorted by pickup time</span><span>Select an order to view details <span aria-hidden="true">↗</span></span></div></div>
    <dialog ref={dialog} className="detail-dialog" aria-labelledby="drawer-title" onCancel={() => select(null)} onClose={() => select(null)} onClick={event => { if (event.target === event.currentTarget) select(null) }}>
      <div className="drawer-inner"><div className="panel-heading"><span id="drawer-title">Order details</span><button className="icon-button" aria-label="Close order details" onClick={() => select(null)} autoFocus><Icon name="close" /></button></div>{selected && <OrderDetails key={selected.id} order={selected} toggle={toggle} />}</div>
    </dialog>
  </>
}
