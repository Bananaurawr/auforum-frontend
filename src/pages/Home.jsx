import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const mockQuestions = [
  { id: 1, title: 'How does useEffect work in React?', body: 'I am confused about the dependency array...', tag: 'React', author: 'Ali', answers: 3, votes: 12 },
  { id: 2, title: 'What is the difference between SQL and NoSQL?', body: 'When should I use one over the other?', tag: 'Database', author: 'Ayse', answers: 5, votes: 8 },
  { id: 3, title: 'How to center a div in CSS?', body: 'I have tried many things but nothing works...', tag: 'CSS', author: 'Mehmet', answers: 7, votes: 20 },
  { id: 4, title: 'What is JWT authentication?', body: 'How is it different from session auth?', tag: 'Security', author: 'Zeynep', answers: 2, votes: 6 },
]

const tagColors = {
  React: 'bg-blue-100 text-blue-600',
  Database: 'bg-green-100 text-green-600',
  CSS: 'bg-pink-100 text-pink-600',
  Security: 'bg-yellow-100 text-yellow-600',
  Python: 'bg-purple-100 text-purple-600',
  Other: 'bg-gray-100 text-gray-600',
}

function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = mockQuestions.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">AUForum</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/ask')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            + Ask Question
          </button>
          <button
            onClick={() => navigate('/login')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Logout
          </button>
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
            <div
              key={q.id}
              onClick={() => navigate(`/question/${q.id}`)}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg mb-1">{q.title}</h2>
                  <p className="text-gray-400 text-sm mb-3">{q.body}</p>
                  <div className="flex gap-3 items-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${tagColors[q.tag] || tagColors.Other}`}>
                      {q.tag}
                    </span>
                    <span className="text-xs text-gray-400">by {q.author}</span>
                  </div>
                </div>
                <div className="text-center ml-4 min-w-[50px]">
                  <p className="text-blue-600 font-bold text-lg">{q.votes}</p>
                  <p className="text-gray-400 text-xs">votes</p>
                  <p className="text-green-600 font-semibold mt-1">{q.answers}</p>
                  <p className="text-gray-400 text-xs">answers</p>
                </div>
              </div>
            </div>
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