'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const supabase = createClient()

  useEffect(() => {
    async function testConnection() {
      try {
        // A simple query to test the connection
        const { data, error } = await supabase.from('_test').select('*').limit(1)
        
        if (error) throw error
        setStatus('connected')
      } catch (error) {
        console.error('Supabase connection error:', error)
        setStatus('error')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 border border-gray-200 rounded-sm">
      <h2 className="text-base font-normal mb-2">Supabase Connection Status</h2>
      <div className="flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${
            status === 'loading' ? 'bg-yellow-400' : 
            status === 'connected' ? 'bg-green-400' : 'bg-red-400'
          }`}
        ></div>
        <span className="text-sm">
          {status === 'loading' ? 'Testing connection...' : 
           status === 'connected' ? 'Connected to Supabase' : 'Connection error'}
        </span>
      </div>
    </div>
  )
} 