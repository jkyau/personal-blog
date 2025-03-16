'use client'

import { useState } from 'react'

export default function ResendVerification() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email')
      }

      setMessage('Verification email sent! Please check your inbox.')
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-8 p-6 border border-black/5 rounded-sm">
      <h2 className="text-xl font-semibold mb-4">Resend Verification Email</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-4 text-sm">
          {error}
        </div>
      )}
      
      {message && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm mb-4 text-sm">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 text-base border border-black/5 focus:outline-none focus:border-black/10 transition-colors"
            placeholder="Enter your email address"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 text-base hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </button>
      </form>
    </div>
  )
} 