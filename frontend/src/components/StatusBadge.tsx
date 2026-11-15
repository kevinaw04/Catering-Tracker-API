export default function StatusBadge({ kind, value, label }: { kind: 'paid' | 'completed'; value: boolean; label?: string }) {
  return <span className={`status-badge ${kind} ${value ? 'positive' : 'pending'}`}><span className="status-dot" />{label ?? (kind === 'paid' ? (value ? 'Paid' : 'Unpaid') : (value ? 'Completed' : 'Pending'))}</span>
}
