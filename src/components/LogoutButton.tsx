'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LogoutButton() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <button 
      onClick={handleSignOut}
      className="flex items-center gap-1 hover:opacity-70 transition-opacity text-xs uppercase tracking-widest"
    >
      <LogOut size={12} />
      <span>Logout</span>
    </button>
  )
} 