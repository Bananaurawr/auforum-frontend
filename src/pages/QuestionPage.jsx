import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuestionById, createAnswer, deleteAnswer, updateAnswer, deleteQuestion, updateQuestion } from '../api/api'

function QuestionPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [newAnswer, setNewAnswer] = useState('')
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [currentUserId, setCurrentUserId] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)
  const [editingQuestion, setEditingQuestion] = useState(false)
  const [editingQTitle, setEditingQTitle] = useState('')
  const [editingQBody, setEditingQBody] = useState('')
  const [menuOpenQuestion, setMenuOpenQuestion] = useState(false)

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await getQuestionById(id)
      setQuestion(res.data)
      setAnswers(res.data.answers || [])
    }

    fetchQuestion()

    // Decode JWT to get current user ID
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setCurrentUserId(parseInt(payload.sub))
      } catch (e) {
        setCurrentUserId(null)
      }
    }
  }, [id])

  const handleEditQuestion = () => {
    setEditingQuestion(true)
    setEditingQTitle(question.title)
    setEditingQBody(question.body)
    setMenuOpenQuestion(false)
  }

  const handleSaveQuestionEdit = async () => {
    try {
      const res = await updateQuestion(id, { title: editingQTitle, body: editingQBody })
      setQuestion({ ...question, title: editingQTitle, body: editingQBody })
      setEditingQuestion(false)
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Failed to update'}`)
    }
  }

  const handleDeleteQuestion = async () => {
    if (window.confirm('Delete this question?')) {
      try {
        await deleteQuestion(id)
        navigate('/home')
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || 'Failed to delete'})`)
      }
    }
  }

  if (!question) return <div className="p-8">Loading...</div>

  const handleAnswer = async (e) => {
    e.preventDefault()
    try {
      const res = await createAnswer(id, { body: newAnswer })
      setAnswers([...answers, res.data])
      setNewAnswer('')
    } catch (err) {
      alert(`Error posting answer: ${err.response?.data?.message || 'Failed to post answer'}`)
    }
  }

  const handleDeleteAnswer = async (answerId) => {
    if (window.confirm('Delete this answer?')) {
      try {
        await deleteAnswer(answerId)
        setAnswers(answers.filter(a => a.id !== answerId))
        setMenuOpen(null)
      } catch (err) {
        alert(`Error: ${err.response?.data?.message || 'Failed to delete'}`)
      }
    }
  }

  const handleEditAnswer = (answer) => {
    setEditingId(answer.id)
    setEditingText(answer.body)
    setMenuOpen(null)
  }

  const handleSaveEdit = async (answerId) => {
    try {
      const res = await updateAnswer(answerId, { body: editingText })
      setAnswers(answers.map(a => a.id === answerId ? res.data : a))
      setEditingId(null)
      setEditingText('')
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || 'Failed to update'}`)
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

      <div className="max-w-3xl mx-auto p-8">

        {/* Question */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          {editingQuestion ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editingQTitle}
                onChange={(e) => setEditingQTitle(e.target.value)}
                className="w-full text-2xl font-bold border p-2 rounded-lg outline-none focus:border-blue-400"
              />
              <textarea
                value={editingQBody}
                onChange={(e) => setEditingQBody(e.target.value)}
                className="w-full border p-3 rounded-lg h-32 outline-none resize-none focus:border-blue-400"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveQuestionEdit}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingQuestion(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                    {question.tag}
                  </span>
                  <h1 className="text-2xl font-bold mt-3 mb-2">{question.title}</h1>
                  <p className="text-gray-600 mb-4">{question.body}</p>
                </div>
                {currentUserId === question.author_id && (
                  <div className="relative ml-4">
                    <button
                      onClick={() => setMenuOpenQuestion(!menuOpenQuestion)}
                      className="text-gray-400 hover:text-gray-600 text-lg"
                    >
                      ⋯
                    </button>
                    {menuOpenQuestion && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                        <button
                          onClick={handleEditQuestion}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDeleteQuestion}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>by {question.author}</span>
                <span>▲ {question.votes} votes</span>
              </div>
            </>
          )}
        </div>

        {/* Answers */}
        <h2 className="text-lg font-bold mb-4">{answers.length} Answers</h2>
        <div className="space-y-4 mb-8">
          {answers.map(answer => (
            <div key={answer.id} className="bg-white p-5 rounded-xl shadow">
              {editingId === answer.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full border p-3 rounded-lg h-24 outline-none resize-none focus:border-blue-400"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(answer.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <p className="text-gray-700 mb-3 flex-1">{answer.body}</p>
                    {currentUserId === answer.author_id && (
                      <div className="relative">
                        <button
                          onClick={() => setMenuOpen(menuOpen === answer.id ? null : answer.id)}
                          className="text-gray-400 hover:text-gray-600 text-lg ml-2"
                        >
                          ⋯
                        </button>
                        {menuOpen === answer.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleEditAnswer(answer)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAnswer(answer.id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span>by {answer.author}</span>
                    <span>▲ {answer.votes} votes</span>
                  </div>
                </>
              )}
            </div>
          ))}
          {answers.length === 0 && (
            <p className="text-gray-400">No answers yet. Be the first!</p>
          )}
        </div>

        {/* Post Answer */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4">Your Answer</h2>
          <form onSubmit={handleAnswer} className="space-y-4">
            <textarea
              placeholder="Write your answer here..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="w-full border p-3 rounded-lg h-32 outline-none resize-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Post Answer
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default QuestionPage