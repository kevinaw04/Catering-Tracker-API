import { useTheme } from '../hooks/useTheme'
import Icon from './Icon'
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}><Icon name={theme === 'light' ? 'moon' : 'sun'} /><span>{theme === 'light' ? 'Dark' : 'Light'} mode</span></button>
}
