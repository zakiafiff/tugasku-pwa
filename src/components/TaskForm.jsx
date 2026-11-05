import { useState } from 'react'
import { X } from 'lucide-react'

const EMPTY = { title: '', course: '', deadline: '', priority: 'Sedang', note: '' }

/** Modal form untuk Create & Update. `task` null = mode tambah. */
export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task ? { ...EMPTY, ...task } : EMPTY)
  const [error, setError] = useState('')

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (form.title.trim().length < 3) return setError('Judul tugas minimal 3 karakter.')
    if (!form.course.trim()) return setError('Mata kuliah wajib diisi.')
    onSave({
      title: form.title.trim(),
      course: form.course.trim(),
      deadline: form.deadline,
      priority: form.priority,
      note: form.note.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-md space-y-3 overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{task ? 'Edit Tugas' : 'Tambah Tugas'}</h2>
          <button type="button" onClick={onClose} aria-label="Tutup"><X size={20} /></button>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <label className="block text-sm font-medium">Judul tugas
          <input name="title" value={form.title} onChange={set} className="input mt-1" placeholder="cth: Laporan Praktikum 5" />
        </label>
        <label className="block text-sm font-medium">Mata kuliah
          <input name="course" value={form.course} onChange={set} className="input mt-1" placeholder="cth: Pemrograman Web" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium">Deadline
            <input type="date" name="deadline" value={form.deadline} onChange={set} className="input mt-1" />
          </label>
          <label className="block text-sm font-medium">Prioritas
            <select name="priority" value={form.priority} onChange={set} className="input mt-1">
              <option>Rendah</option><option>Sedang</option><option>Tinggi</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">Catatan
          <textarea name="note" rows={3} value={form.note} onChange={set} className="input mt-1" />
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="btn btn-outline">Batal</button>
          <button type="submit" className="btn btn-primary">{task ? 'Simpan Perubahan' : 'Tambah'}</button>
        </div>
      </form>
    </div>
  )
}
