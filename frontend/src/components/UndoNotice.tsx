import { useEffect, useState } from 'react'
import Icon from './Icon'

export default function UndoNotice({ message, onUndo, onDismiss }: { message: string; onUndo?: () => void; onDismiss: () => void }) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    if (hovered || focused) return
    const timer = window.setTimeout(onDismiss, 12000)
    return () => window.clearTimeout(timer)
  }, [hovered, focused, onDismiss])
  return <div className="undo-notice" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocused(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    <p role="status">{message}</p>
    {onUndo && <button className="button" onClick={onUndo}>Undo</button>}
    <button className="icon-button" aria-label="Dismiss status feedback" onClick={onDismiss}><Icon name="close" /></button>
  </div>
}
