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
          <h1 className="text-xl mb-6">Sign Up</h1>
          <SignupForm />
          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
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