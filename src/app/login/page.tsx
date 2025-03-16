import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LoginForm from '@/components/LoginForm'

export default async function Login() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1919] flex flex-col">
      <header className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-[6px] border-b border-[#E6E1D7]/80 z-50">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="max-w-[60rem] mx-auto h-14 flex items-center justify-between">
            <Link href="/" className="text-[1.375rem] font-['Times_New_Roman'] tracking-tight hover:text-[#666666] transition-colors duration-200">
              <span className="tracking-tight">jk</span>
              <span className="tracking-tighter relative top-[0.5px]">Y</span>
              <span className="tracking-tight">
                <span className="inline-block transform -rotate-12 origin-[25%_40%] translate-y-[0.5px] -translate-x-[1px] mx-[0.5px]">a</span>u
              </span>
            </Link>
            <nav className="flex items-center gap-8">
              <Link href="/admin" className="text-[15px] font-sans text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20 pb-16">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="max-w-[42rem] mx-auto">
            <div className="max-w-sm mx-auto">
              <h1 className="font-sans text-[2rem] tracking-tight mb-8">Login</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/90 backdrop-blur-[6px] border-t border-[#E6E1D7]/80">
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="max-w-[60rem] mx-auto h-14 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="text-[1.375rem] font-['Times_New_Roman'] tracking-tight text-[#666666]">
                <span className="tracking-tight">jk</span>
                <span className="tracking-tighter relative top-[0.5px]">Y</span>
                <span className="tracking-tight">
                  <span className="inline-block transform -rotate-12 origin-[25%_40%] translate-y-[0.5px] -translate-x-[1px] mx-[0.5px]">a</span>u
                </span>
              </div>
              <div className="text-[15px] font-sans text-[#666666] tracking-tight">© {new Date().getFullYear()}</div>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/rss" className="text-[15px] font-sans text-[#666666] hover:text-[#1A1919] transition-colors duration-200">
                RSS
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
} 