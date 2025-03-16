import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignupForm from '@/components/SignupForm'

export default async function SignupPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-white text-black font-['Times_New_Roman'] flex flex-col">
      <header className="fixed top-0 inset-x-0 bg-white border-b border-black/5 z-50">
        <div className="max-w-3xl mx-auto h-10 flex items-center justify-between">
          <Link href="/" className="text-lg tracking-wider">
            <span className="tracking-tight">jk</span>
            <span className="tracking-tighter">Y</span>
            <span className="tracking-tight">
              <span className="inline-block transform -rotate-12 mx-[0.5px]">a</span>u
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-16 px-4 pb-16 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
            <SignupForm />
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-black hover:text-gray-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-black/5">
        <div className="max-w-3xl mx-auto h-10 flex items-center">
          <div className="text-lg tracking-wider">
            <span className="tracking-tight">jk</span>
            <span className="tracking-tighter">Y</span>
            <span className="tracking-tight">
              <span className="inline-block transform -rotate-12 mx-[0.5px]">a</span>u
            </span>
          </div>
          <div className="text-sm text-gray-600 ml-2">© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  )
} 