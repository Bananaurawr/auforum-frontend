import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const TIMEOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export default function useSessionTimeout() {
  const navigate = useNavigate()

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    let timer

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(logout, TIMEOUT_DURATION)
    }

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => window.addEventListener(event, resetTimer))

    resetTimer() // start the timer on mount

    return () => {
      clearTimeout(timer)
      events.forEach(event => window.removeEventListener(event, resetTimer))
    }
  }, [logout])
}