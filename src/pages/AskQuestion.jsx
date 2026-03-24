import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AskQuestion() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('React')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Later: call Flask API here
    alert('Question posted!')
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate('/home')}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          AUForum
        </h1>
        <button
          onClick={() => navigate('/home')}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back
        </button>
      </nav>

      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-white p-8 rounded-xl shadow">
          <h1 className="text-2xl font-bold mb-6">Ask a Question</h1>
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                placeholder="e.g. How does useEffect work?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-3 rounded-lg outline-none focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
              <textarea
                placeholder="Explain your question in detail..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border p-3 rounded-lg h-40 outline-none resize-none focus:border-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full border p-3 rounded-lg outline-none focus:border-blue-400"
              >
                <option>React</option>
                <option>Python</option>
                <option>Database</option>
                <option>CSS</option>
                <option>Security</option>
                <option>Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Post Question
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion