'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const supabase = createClient()
  
  // Check if we're in the request phase or reset phase
  const resetToken = searchParams.get('token')
  
  // State for request phase (email input)
  const [email, setEmail] = useState('')
  
  // State for reset phase (new password input)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  // Shared state
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Handle password reset request (send email)
  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
        return
      }

      setMessage('Check your email for the password reset link')
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Handle password reset (set new password)
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      setMessage('Password updated successfully')
      
      // Redirect to login page after a delay
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="py-3 px-4 md:px-6 border-b border-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo font-mono text-lg tracking-tighter">
            <Link href="/" className="flex items-baseline">
              <span>jky</span>
              <span className="inline-block transform -rotate-6">a</span>
              <span>u</span>
            </Link>
          </div>
          <nav className="flex gap-5">
            <Link href="/" className="hover:opacity-70 transition-opacity text-xs uppercase tracking-widest">
              Journal
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-10 px-4 md:px-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-xl md:text-2xl font-normal mb-6 tracking-tight text-center">
            {resetToken ? 'Set New Password' : 'Reset Password'}
          </h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-6 text-sm">
              {error}
            </div>
          )}
          
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm mb-6 text-sm">
              {message}
            </div>
          )}
          
          {!resetToken ? (
            // Request phase - ask for email
            <form onSubmit={handleResetRequest} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-100 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded-sm px-3 py-2 text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            // Reset phase - set new password
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm mb-1">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-100 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-100 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded-sm px-3 py-2 text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Remember your password?{' '}
              <Link href="/login" className="text-black hover:underline">
                Login
              </Link>
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Link href="/" className="hover:opacity-70 transition-opacity text-xs uppercase tracking-widest">
              Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-4 px-4 md:px-6 border-t border-gray-100">
        <div className="container mx-auto max-w-2xl flex flex-col md:flex-row justify-between items-center">
          <div className="logo font-mono text-sm tracking-tighter mb-3 md:mb-0">
            <Link href="/" className="flex items-baseline">
              <span>jky</span>
              <span className="inline-block transform -rotate-6">a</span>
              <span>u</span>
            </Link>
          </div>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  )
} 