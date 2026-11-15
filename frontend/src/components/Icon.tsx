type IconName = 'search' | 'sun' | 'moon' | 'arrow' | 'close' | 'check' | 'list' | 'split' | 'rows' | 'chevron' | 'back' | 'pencil'
const paths: Record<IconName, string> = {
  search: 'm21 21-4.5-4.5 M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0',
  sun: 'M12 3V1 M12 23v-2 M3 12H1 M23 12h-2 M5.6 5.6 4.2 4.2 M19.8 19.8l-1.4-1.4 M5.6 18.4l-1.4 1.4 M19.8 4.2l-1.4 1.4 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  moon: 'M21 13a9 9 0 0 1-10-10 9 9 0 1 0 10 10Z',
  arrow: 'M5 12h14 m-5-5 5 5-5 5', close: 'm6 6 12 12 M6 18 18 6', check: 'm5 12 4 4L19 6',
  list: 'M8 5h13 M8 12h13 M8 19h13 M3 5h.01 M3 12h.01 M3 19h.01',
  split: 'M3 3h18v18H3Z M10 3v18 M6 7h1 M6 12h1 M6 17h1',
  rows: 'M3 3h18v7H3Z M3 14h18v7H3Z M7 6h.01 M7 17h.01 M15 6h3 M15 17h3',
  chevron: 'm9 5 7 7-7 7', back: 'M19 12H5 m5-5-5 5 5 5',
  pencil: 'm16 3 5 5 M3 21l5-1L21 7a2 2 0 0 0-5-5L3 15Z M3 15l5 5',
}
export default function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}
