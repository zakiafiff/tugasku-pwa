import { User, IdCard, Users, GraduationCap, BookOpen } from 'lucide-react'
import { PROFILE } from '../data/profile'

export default function Profile() {
  const rows = [
    { icon: User, label: 'Nama', value: PROFILE.nama },
    { icon: IdCard, label: 'NIM', value: PROFILE.nim },
    { icon: Users, label: 'Kelompok', value: PROFILE.kelompok },
    { icon: GraduationCap, label: 'Program Studi', value: PROFILE.prodi },
    { icon: BookOpen, label: 'Mata Kuliah', value: PROFILE.mataKuliah },
  ]
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold">Profil</h2>
      <div className="card space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
            {PROFILE.nama.charAt(0)}
          </div>
          <div>
            <p className="text-lg font-bold">{PROFILE.nama}</p>
            <p className="text-sm text-slate-500">{PROFILE.nim}</p>
          </div>
        </div>
        <dl className="divide-y divide-slate-100">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3">
              <Icon size={18} className="text-indigo-500" />
              <dt className="w-32 text-sm text-slate-500">{label}</dt>
              <dd className="flex-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="text-center text-xs text-slate-400">TugasKu v1.0 · React + Vite + PWA</p>
    </div>
  )
}
