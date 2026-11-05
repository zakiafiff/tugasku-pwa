import { useState, useEffect, useCallback } from 'react'

const KEY = 'tugasku_tasks_v1'

const SEED = [
  { id: 'seed-1', title: 'Laporan Modul 5 PWA', course: 'Praktikum PPB', deadline: '', priority: 'Tinggi', note: 'Deploy ke Vercel lalu kumpulkan link.', done: false },
  { id: 'seed-2', title: 'Baca bab React Hooks', course: 'Pemrograman Web', deadline: '', priority: 'Sedang', note: '', done: false },
]

const load = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : SEED
  } catch {
    return SEED
  }
}

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())

/** CRUD tugas, disimpan di localStorage (otomatis bisa dipakai offline). */
export function useTasks() {
  const [tasks, setTasks] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks))
    } catch {
      /* storage penuh / mode private */
    }
  }, [tasks])

  // CREATE
  const addTask = useCallback((data) => {
    setTasks((prev) => [{ ...data, id: newId(), done: false }, ...prev])
  }, [])
  // UPDATE
  const updateTask = useCallback((id, data) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
  }, [])
  const toggleDone = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }, [])
  // DELETE
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // READ = state `tasks`
  return { tasks, addTask, updateTask, toggleDone, deleteTask }
}
