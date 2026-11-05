import { Home, ListChecks, User } from 'lucide-react'

const ITEMS = [
  { id: 'home', label: 'Beranda', icon: Home },
  { id: 'tasks', label: 'Tugas', icon: ListChecks },
  { id: 'profile', label: 'Profil', icon: User },
]

export default function Navbar({ page, onNavigate }) {
  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-extrabold text-indigo-600">TugasKu</h1>
          <nav className="hidden gap-1 sm:flex">
            {ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  page === id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Bottom nav (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] sm:hidden">
        {ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-1 py-2 text-xs font-medium ${
              page === id ? 'text-indigo-600' : 'text-slate-500'
            }`}
          >
            <Icon size={20} /> {label}
          </button>
        ))}
      </nav>
    </>
  )
}
