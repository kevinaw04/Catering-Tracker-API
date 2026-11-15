import { useLayoutEffect, useRef, useState } from 'react'
import type { ConceptId } from './types'
import { usePreviewOrders } from './hooks/usePreviewOrders'
import { SAMPLE_DATE } from './data/previewOrders'
import { formatDate } from './lib/orderUtils'
import PreviewShell from './components/PreviewShell'
import OrderToolbar from './components/OrderToolbar'
import PrecisionTable from './concepts/PrecisionTable'
import SplitWorkspace from './concepts/SplitWorkspace'
import HybridOperations from './concepts/HybridOperations'
import Icon from './components/Icon'

const descriptions = {
  'precision-table': { letter: 'A', title: 'Precision Table', text: 'Every order, at a glance. The details, one click away.', Component: PrecisionTable },
  'split-workspace': { letter: 'B', title: 'Split Workspace', text: 'Browse the queue. Give each order your full attention.', Component: SplitWorkspace },
  'hybrid-operations': { letter: 'C', title: 'Hybrid Operations', text: 'A clear pickup sequence. The next action, within reach.', Component: HybridOperations },
}
export default function App() {
  const path = window.location.pathname.replace(/\/$/, '').slice(1)
  const concept: ConceptId = Object.hasOwn(descriptions, path) ? path as ConceptId : 'hybrid-operations'
  const { letter, title, text } = descriptions[concept]
  const state = usePreviewOrders()
  const [editingId, setEditingId] = useState<number | null>(null)
  const queuePosition = useRef(0)
  const returnOrderId = useRef<number | null>(null)
  const editingOrder = concept === 'hybrid-operations' ? state.allOrders.find(order => order.id === editingId) : undefined
  function openEditor(id: number) {
    queuePosition.current = window.scrollY
    returnOrderId.current = id
    state.select(null)
    setEditingId(id)
  }
  useLayoutEffect(() => {
    if (editingId !== null) {
      window.scrollTo(0, 0)
      document.getElementById('editor-title')?.focus({ preventScroll: true })
    } else if (returnOrderId.current !== null) {
      window.scrollTo(0, queuePosition.current)
      document.querySelector<HTMLButtonElement>(`[data-edit-order="${returnOrderId.current}"]`)?.focus({ preventScroll: true })
    }
  }, [editingId])
  return <PreviewShell concept={concept}><main id="main" className={`main-content concept-${concept}`}>
    {!editingOrder && <><div className="page-heading"><div><div className="eyebrow">ORDERS <span>/</span> CONCEPT {letter}</div><h1>Catering orders<span className="heading-dot">.</span></h1><p>{text}</p></div><div className="concept-caption"><span className="section-label">LAYOUT EXPLORATION {letter}</span><strong>{title}</strong><span>Desktop · Tablet · Phone</span></div></div>
    <div className="date-heading"><h2>{state.date ? formatDate(state.date, true) : 'All pickup dates'}</h2><span className="sample-date">{state.date === SAMPLE_DATE ? 'Sample pickup day' : 'Sample data'}</span></div>
    <OrderToolbar search={state.search} setSearch={state.setSearch} date={state.date} setDate={state.setDate} count={state.orders.length} /></>}
    {concept === 'hybrid-operations' && <HybridOperations orders={state.orders} selected={state.selected} select={state.select} toggle={state.toggle} editingOrder={editingOrder} onEdit={openEditor} onBack={() => setEditingId(null)} setStatus={state.setStatus} />}
    {concept === 'precision-table' && state.orders.length > 0 && <PrecisionTable orders={state.orders} selected={state.selected} select={state.select} toggle={state.toggle} />}
    {concept === 'split-workspace' && state.orders.length > 0 && <SplitWorkspace orders={state.orders} selected={state.selected} select={state.select} toggle={state.toggle} />}
    {!editingOrder && state.orders.length === 0 && <div className="empty-state"><Icon name="search" size={25} /><h2>No matching sample orders</h2><p>Try a different search or pickup date.</p><button className="button" onClick={() => { state.setSearch(''); state.setDate('') }}>Show all sample orders</button></div>}
    <p className="workspace-note"><span className="preview-dot" />All names, numbers, and orders shown here are fictional.</p><div className="sr-only" role="status" aria-live="polite">{state.announcement}</div>
  </main></PreviewShell>
}
