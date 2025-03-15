import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Login() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <header className="py-3 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl tracking-tight font-['Times_New_Roman']">
            j<span className="mx-[0.5px]">k</span><span className="inline-block mx-[1px]">Y</span><span className="inline-block transform -rotate-12 mx-[0.5px]">a</span><span className="mx-[0.5px]">u</span>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-sm mx-auto">
          <h1 className="text-xl mb-6">Login</h1>
          <form action="/auth/sign-in" method="post">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-1 text-sm border border-gray-200"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-1 text-sm border border-gray-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 text-sm hover:bg-gray-800"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      
      <footer className="border-t border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="text-lg mb-1 font-['Times_New_Roman']">
            j<span className="mx-[0.5px]">k</span><span className="inline-block mx-[1px]">Y</span><span className="inline-block transform -rotate-12 mx-[0.5px]">a</span><span className="mx-[0.5px]">u</span>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
} 