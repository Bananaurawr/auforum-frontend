import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const mockQuestions = [
  { id: 1, title: 'How does useEffect work in React?', body: 'I am confused about the dependency array. Can someone explain when it runs and what the array does?', tag: 'React', author: 'Ali', votes: 12 },
  { id: 2, title: 'What is the difference between SQL and NoSQL?', body: 'When should I use one over the other? Are there performance differences?', tag: 'Database', author: 'Ayse', votes: 8 },
  { id: 3, title: 'How to center a div in CSS?', body: 'I have tried many things but nothing works. What is the modern way to do this?', tag: 'CSS', author: 'Mehmet', votes: 20 },
  { id: 4, title: 'What is JWT authentication?', body: 'How is it different from session auth? Which one should I use for a REST API?', tag: 'Security', author: 'Zeynep', votes: 6 },
]

const mockAnswers = {
  1: [
    { id: 1, body: 'useEffect runs after every render by default. The dependency array controls when it re-runs.', author: 'Mehmet', votes: 5 },
    { id: 2, body: 'If the dependency array is empty [], it only runs once on mount.', author: 'Zeynep', votes: 3 },
  ],
  2: [
    { id: 1, body: 'SQL is great for structured data with relationships. NoSQL is better for flexible or large-scale data.', author: 'Ali', votes: 7 },
  ],
  3: [
    { id: 1, body: 'Use flexbox: display: flex; justify-content: center; align-items: center;', author: 'Ayse', votes: 15 },
  ],
  4: [],
}

function QuestionPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const question = mockQuestions.find(q => q.id === parseInt(id))
  const answers = mockAnswers[id] || []
  const [newAnswer, setNewAnswer] = useState('')

  if (!question) return <div className="p-8">Question not found.</div>

  const handleAnswer = (e) => {
    e.preventDefault()
    // Later: call Flask API here
    alert('Answer submitted!')
    setNewAnswer('')
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
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
            {question.tag}
          </span>
          <h1 className="text-2xl font-bold mt-3 mb-2">{question.title}</h1>
          <p className="text-gray-600 mb-4">{question.body}</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>by {question.author}</span>
            <span>▲ {question.votes} votes</span>
          </div>
        </div>

        {/* Answers */}
        <h2 className="text-lg font-bold mb-4">{answers.length} Answers</h2>
        <div className="space-y-4 mb-8">
          {answers.map(answer => (
            <div key={answer.id} className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-700 mb-3">{answer.body}</p>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>by {answer.author}</span>
                <span>▲ {answer.votes} votes</span>
              </div>
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