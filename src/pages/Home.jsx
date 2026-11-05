import { ListChecks, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import { PROFILE } from '../data/profile'
import { formatDate } from '../components/TaskItem'

export default function Home({ tasks, onNavigate }) {
  const done = tasks.filter((t) => t.done).length
  const pending = tasks.length - done
  const upcoming = tasks
    .filter((t) => !t.done)
    .sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'))
    .slice(0, 3)

  const stats = [
    { label: 'Total', value: tasks.length, icon: ListChecks, color: 'text-indigo-600' },
    { label: 'Belum', value: pending, icon: Clock, color: 'text-amber-600' },
    { label: 'Selesai', value: done, icon: CheckCircle2, color: 'text-emerald-600' },
  ]

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white">
        <p className="text-sm opacity-80">Halo, {PROFILE.nama.split(' ')[0]} 👋</p>
        <h2 className="mt-1 text-2xl font-extrabold">Atur tugas kuliahmu tanpa ribet.</h2>
        <p className="mt-2 text-sm opacity-90">Catat, pantau deadline, dan tandai selesai - bahkan saat offline.</p>
        <button onClick={() => onNavigate('tasks')} className="btn mt-4 bg-white text-indigo-700 hover:bg-indigo-50">
          Kelola Tugas <ArrowRight size={16} />
        </button>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card text-center">
            <Icon size={22} className={`mx-auto ${color}`} />
            <p className="mt-1 text-2xl font-bold">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="mb-3 font-bold">Tugas terdekat</h3>
        {upcoming.length === 0 ? (
          <p className="card text-center text-sm text-slate-500">Tidak ada tugas yang tertunda 🎉</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((t) => (
              <li key={t.id} className="card flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm text-slate-500">{t.course}</p>
                </div>
                <span className="text-xs text-slate-500">{formatDate(t.deadline)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
