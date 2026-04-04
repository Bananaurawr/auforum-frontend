import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createQuestion } from '../api/api'

function AskQuestion() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('React')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createQuestion({ title, body, tag })
      navigate('/home')
    } catch (err) {
      console.error('Create question error:', err.response?.data)
      alert(`Error: ${err.response?.data?.message || 'Failed to create question'}`)
    }
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
                placeholder="e.g. Which course should I take for the 5th semester?"
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
                <option>Yemek</option>
                <option>Ders</option>
                <option>Üniversite</option>
                <option>Genel</option>
                <option>Diğer</option>
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