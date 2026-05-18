import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQuestions, getUserProfile, voteQuestion } from '../api/api'
import QuestionCard from '../components/QuestionCard'
import useSessionTimeout from '../hooks/useSessionTimeout'

const TIMEOUT_DURATION = 15 * 60 * 1000 // 15 minutes

function Home() {
  const [questions, setQuestions] = useState([])
  const [search, setSearch] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useSessionTimeout()

  useEffect(() => {
    const hasToken = !!localStorage.getItem('token')
    setIsLoggedIn(hasToken)
    fetchData()
    if (hasToken) {
      fetchUserProfile()
    }
  }, [])

  const fetchData = async () => {
    const res = await getQuestions()
    setQuestions(res.data)
  }

  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile()
      setUser(res.data)
    } catch (err) {
      console.error('Failed to fetch user profile:', err.response?.data || err.message)
    }
  }

  const handleDelete = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleVote = async (id) => {
    try {
      const res = await voteQuestion(id)
      setQuestions(prev => prev.map(q =>
        q.id === id
          ? { ...q, votes: res.data.votes, user_voted: !q.user_voted }
          : q
      ))
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Failed to vote'}`)
    }
  }

  const filtered = questions.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AUForum</h1>
        <div className="flex gap-4 items-center">
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
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <span className="h-8 w-8 overflow-hidden rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center">
                  {user?.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={`${user.name}'s profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-blue-600">
                      {user?.name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  )}
                </span>
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
              onVote={handleVote}
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
