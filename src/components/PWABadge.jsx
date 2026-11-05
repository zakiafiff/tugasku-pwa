import { useState, useEffect } from 'react'
import { Download, WifiOff, X } from 'lucide-react'

/** Banner status offline + tombol install PWA. */
export default function PWABadge() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [offline, setOffline] = useState(!navigator.onLine)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallPrompt(e) }
    const onInstalled = () => setInstallPrompt(null)
    const on = () => setOffline(false)
    const off = () => setOffline(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  const install = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  const base = 'fixed left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-xl px-4 py-2 text-sm shadow-lg bottom-20 sm:bottom-6'

  if (offline)
    return (
      <aside role="status" className={`${base} bg-amber-100 text-amber-900`}>
        <WifiOff size={16} /> Mode offline - data tetap tersimpan di perangkat.
      </aside>
    )

  if (installPrompt && !dismissed)
    return (
      <aside className={`${base} border border-slate-200 bg-white`}>
        <Download size={16} className="text-indigo-600" />
        <span>Install <b>TugasKu</b> di perangkatmu</span>
        <button onClick={install} className="btn btn-primary !px-3 !py-1">Install</button>
        <button onClick={() => setDismissed(true)} aria-label="Tutup"><X size={16} /></button>
      </aside>
    )

  return null
}
