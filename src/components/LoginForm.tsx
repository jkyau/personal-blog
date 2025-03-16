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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 text-[#E5484D] text-[15px] font-sans rounded-lg border border-red-100">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-[15px] font-sans text-[#666666] mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isLoading}
          className="w-full px-4 py-[10px] text-[15px] font-sans bg-white border border-[#E6E1D7] rounded-lg focus:outline-none focus:border-[#1A1919] transition-colors"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-[15px] font-sans text-[#666666] mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          disabled={isLoading}
          className="w-full px-4 py-[10px] text-[15px] font-sans bg-white border border-[#E6E1D7] rounded-lg focus:outline-none focus:border-[#1A1919] transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1A1919] text-white font-sans text-[15px] px-6 py-[10px] rounded-lg hover:bg-[#313131] transition-colors duration-200 disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
} 