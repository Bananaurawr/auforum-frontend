import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login({ email, password })
    localStorage.setItem("token", res.data.access_token)
    localStorage.setItem("lastActivityTime", Date.now().toString())
    console.log(res.data)
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex overflow-hidden border border-gray-200">

        {/* Left - Illustration */}
        <div className="hidden md:flex w-1/2 bg-amber-100 items-center justify-center p-10 flex-col gap-4">
          <img
            src="https://undraw.co/api/illustrations/undraw_questions_re_1fy7.svg"
            alt="Forum illustration"
            className="w-72"
            onError={(e) => e.target.style.display='none'}
          />
          <h2 className="text-xl font-bold text-gray-700 text-center">Ask. Answer. Learn.</h2>
          <p className="text-gray-500 text-sm text-center">Created by Students for other Students</p>
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-1 text-gray-800">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-8">Sign in to your AUForum account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email address</label>
              <input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-orange-400 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-orange-400 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold text-sm"
            >
              Continue
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            No account?{' '}
            <Link to="/register" className="text-orange-500 font-medium">Register</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login