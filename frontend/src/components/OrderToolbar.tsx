import Icon from './Icon'
import { SAMPLE_DATE } from '../data/previewOrders'

export default function OrderToolbar({ search, setSearch, date, setDate, count }: {
  search: string; setSearch: (value: string) => void; date: string; setDate: (value: string) => void; count: number
}) {
  return <div className="order-toolbar">
    <label className="search-field"><Icon name="search" size={17} /><span className="sr-only">Search orders</span><input type="search" placeholder="Search name, phone, order…" value={search} onChange={event => setSearch(event.target.value)} /></label>
    <div className="date-controls"><label className="date-field"><span>Pickup date</span><input aria-label="Pickup date" type="date" value={date} onInput={event => setDate(event.currentTarget.value)} onChange={event => setDate(event.target.value)} /></label><button className={`button ${!date ? 'is-active' : ''}`} onClick={() => setDate('')}>All dates</button></div>
    {(search || date !== SAMPLE_DATE) && <button className="text-button reset-filters" onClick={() => { setSearch(''); setDate(SAMPLE_DATE) }}>Reset filters</button>}
    <span className="result-count" role="status">{count} {count === 1 ? 'order' : 'orders'}</span>
  </div>
}
