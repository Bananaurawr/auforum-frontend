import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQuestions } from '../api/api'
import QuestionCard from '../components/QuestionCard'
import useSessionTimeout from '../hooks/useSessionTimeout'

const TIMEOUT_DURATION = 15 * 60 * 1000 // 15 minutes

function Home() {
  const [questions, setQuestions] = useState([])
  const [search, setSearch] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  useSessionTimeout()

  useEffect(() => {
    // Always logout on page reload
    localStorage.removeItem('token')
    localStorage.removeItem('lastActivityTime')
    navigate('/login')
  }, [])

  const fetchData = async () => {
    const res = await getQuestions()
    setQuestions(res.data)
  }

  const handleDelete = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const filtered = questions.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AUForum</h1>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/ask')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                + Ask Question
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('lastActivityTime')
                  setIsLoggedIn(false)
                  navigate('/login')
                }}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto p-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6 outline-none focus:border-blue-400"
        />

        {/* Stats */}
        <p className="text-gray-400 text-sm mb-4">{filtered.length} questions found</p>

        {/* Question List */}
        <div className="space-y-4">
          {filtered.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              onDelete={handleDelete}
            />
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-400">No questions found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home