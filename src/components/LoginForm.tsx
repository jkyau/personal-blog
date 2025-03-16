'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/auth/sign-in', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // Redirect will be handled by the server
        router.refresh()
      } else {
        const data = await response.text()
        const searchParams = new URL(data).searchParams
        const error = searchParams.get('error')
        setError(error || 'An error occurred during sign in')
      }
    } catch (error) {
      setError('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-900 text-sm rounded">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isLoading}
          className="w-full p-2 text-base border border-black/5 focus:outline-none focus:border-black/10 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          disabled={isLoading}
          className="w-full p-2 text-base border border-black/5 focus:outline-none focus:border-black/10 transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white p-2 text-base hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
} 