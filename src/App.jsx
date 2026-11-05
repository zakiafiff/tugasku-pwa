import { useState } from 'react'
import Navbar from './components/Navbar'
import PWABadge from './components/PWABadge'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import { useTasks } from './hooks/useTasks'

export default function App() {
  const [page, setPage] = useState('home')
  const taskApi = useTasks()

  const navigate = (p) => {
    setPage(p)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen pb-24 sm:pb-8">
      <Navbar page={page} onNavigate={navigate} />
      <main className="mx-auto max-w-3xl px-4 py-6">
        {page === 'home' && <Home tasks={taskApi.tasks} onNavigate={navigate} />}
        {page === 'tasks' && <Tasks {...taskApi} />}
        {page === 'profile' && <Profile />}
      </main>
      <PWABadge />
    </div>
  )
}
