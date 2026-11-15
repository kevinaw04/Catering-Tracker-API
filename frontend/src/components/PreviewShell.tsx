import type { ReactNode } from 'react'
import type { ConceptId } from '../types'
import ThemeToggle from './ThemeToggle'
import Icon from './Icon'

const concepts = [
  { id: 'precision-table', letter: 'A', title: 'Precision Table', icon: 'list' },
  { id: 'split-workspace', letter: 'B', title: 'Split Workspace', icon: 'split' },
  { id: 'hybrid-operations', letter: 'C', title: 'Hybrid Operations', icon: 'rows' },
] as const
export default function PreviewShell({ concept, children }: { concept: ConceptId; children: ReactNode }) {
  return <>
    <a className="skip-link" href="#main">Skip to orders</a>
    <header className="topbar">
      <a href="/" className="brand" aria-label="Catering Tracker home"><span className="brand-mark">g<span>•</span></span><span>Gutbusters<span className="brand-sub">Catering Tracker</span></span></a>
      <span className="internal-label">Employee workspace <span className="preview-pill">DESIGN PREVIEW</span></span>
      <ThemeToggle />
    </header>
    <div className="preview-bar"><span><span className="preview-dot" />Preview — fictional data. Changes reset on reload.</span><span className="preview-bar-meta">Gutbusters Breakfast · Design exploration</span></div>
    <div className="concept-nav-wrap"><nav className="concept-nav" aria-label="Design concepts">{concepts.map(item => <a key={item.id} href={`/${item.id}`} aria-current={concept === item.id ? 'page' : undefined}><Icon name={item.icon} size={16} /><span><span className="concept-letter">{item.letter}</span> {item.title}</span></a>)}</nav><span className="concept-count">03 concepts / 01 workspace</span></div>
    {children}
    <footer className="page-footer"><span>Built around the pickup.</span><span>Preview only · No live orders or payment collection</span></footer>
  </>
}
