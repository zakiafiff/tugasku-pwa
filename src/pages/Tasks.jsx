import { useState, useMemo } from 'react'
import { Plus, Search, PackageOpen } from 'lucide-react'
import TaskItem from '../components/TaskItem'
import TaskForm from '../components/TaskForm'

const FILTERS = ['Semua', 'Belum', 'Selesai']

export default function Tasks({ tasks, addTask, updateTask, toggleDone, deleteTask }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Semua')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const list = useMemo(() => {
    const q = search.toLowerCase()
    return tasks.filter((t) => {
      const okSearch = t.title.toLowerCase().includes(q) || t.course.toLowerCase().includes(q)
      const okFilter = filter === 'Semua' || (filter === 'Selesai' ? t.done : !t.done)
      return okSearch && okFilter
    })
  }, [tasks, search, filter])

  const openAdd = () => { setEditing(null); setFormOpen(true) }
  const openEdit = (t) => { setEditing(t); setFormOpen(true) }
  const handleSave = (data) => {
    editing ? updateTask(editing.id, data) : addTask(data)
    setFormOpen(false)
  }
  const handleDelete = (t) => {
    if (window.confirm(`Hapus tugas "${t.title}"?`)) deleteTask(t.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold">Daftar Tugas</h2>
        <button onClick={openAdd} className="btn btn-primary"><Plus size={16} /> Tambah</button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari judul / mata kuliah…" className="input !pl-9" />
      </div>

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1 text-sm font-medium ${filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-300'}`}>
            {f}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 py-10 text-slate-500">
          <PackageOpen size={32} />
          <p>Belum ada tugas yang cocok.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {list.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={toggleDone} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </ul>
      )}

      {formOpen && <TaskForm task={editing} onSave={handleSave} onClose={() => setFormOpen(false)} />}
    </div>
  )
}
