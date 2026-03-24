import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/api'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const checks = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[_!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const allValid = Object.values(checks).every(Boolean)

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!allValid) return

    setLoading(true)
    setError('')
    try {
      await register({ name, email, password })
      navigate('/login')
    } catch (err) {
      console.error('Registration error:', err)
      console.error('Error response:', err.response?.data)
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const CheckItem = ({ ok, text }) => (
    <div className="flex items-center gap-2 text-sm">
      <span className={ok ? 'text-green-500' : 'text-red-400'}>
        {ok ? '✔' : '✖'}
      </span>
      <span className={ok ? 'text-green-600' : 'text-gray-500'}>
        {text}
      </span>
    </div>
  )

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex overflow-hidden border border-gray-200">

        <div className="hidden md:flex w-1/2 bg-amber-100 items-center justify-center p-10 flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-700 text-center">Create your account</h2>
          <p className="text-gray-500 text-sm text-center">Join AUForum and start asking questions</p>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-1 text-gray-800">Register</h1>
          <p className="text-gray-400 text-sm mb-8">Create your AUForum account</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-orange-400 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-orange-400 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-orange-400 text-sm"
              />
            </div>

            <div className="space-y-1 pt-1">
              <CheckItem ok={checks.length} text="At least 6 characters" />
              <CheckItem ok={checks.upper} text="One uppercase letter" />
              <CheckItem ok={checks.lower} text="One lowercase letter" />
              <CheckItem ok={checks.number} text="One number" />
              <CheckItem ok={checks.special} text="One special character" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!allValid || loading}
              className={`w-full py-3 rounded-lg font-semibold text-sm text-white ${
                allValid && !loading ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 font-medium">Login</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Register