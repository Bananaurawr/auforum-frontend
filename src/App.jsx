import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import QuestionPage from './pages/QuestionPage'
import AskQuestion from './pages/AskQuestion'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App