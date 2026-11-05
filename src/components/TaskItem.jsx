import { Pencil, Trash2, CalendarDays, CheckCircle2, Circle } from 'lucide-react'

const COLOR = {
  Tinggi: 'bg-red-100 text-red-700',
  Sedang: 'bg-amber-100 text-amber-700',
  Rendah: 'bg-emerald-100 text-emerald-700',
}

export const formatDate = (d) =>
  d ? new Date(d + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Tanpa deadline'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <li className="card flex items-start gap-3">
      <button onClick={() => onToggle(task.id)} aria-label="Tandai selesai" className="mt-0.5 text-indigo-600">
        {task.done ? <CheckCircle2 size={22} /> : <Circle size={22} className="text-slate-400" />}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`font-semibold ${task.done ? 'text-slate-400 line-through' : ''}`}>{task.title}</p>
        <p className="text-sm text-slate-500">{task.course}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-medium ${COLOR[task.priority]}`}>{task.priority}</span>
          <span className="flex items-center gap-1 text-slate-500"><CalendarDays size={13} />{formatDate(task.deadline)}</span>
        </div>
        {task.note && <p className="mt-2 text-sm text-slate-600">{task.note}</p>}
      </div>
      <div className="flex gap-1">
        <button onClick={() => onEdit(task)} aria-label="Edit" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Pencil size={16} /></button>
        <button onClick={() => onDelete(task)} aria-label="Hapus" className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
      </div>
    </li>
  )
}
