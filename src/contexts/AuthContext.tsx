'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Define a basic User type
type User = {
  id: string;
  email: string;
} | null;

// Define the AuthContext type
type AuthContextType = {
  user: User;
  loading: boolean;
  signOut: () => Promise<void>;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext)

// AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for a user
    const checkUser = async () => {
      try {
        // In a real implementation, this would check for a user session
        // For now, we'll just set loading to false
        setLoading(false)
      } catch (error) {
        console.error('Error checking user:', error)
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  // Sign out function
  const signOut = async () => {
    // In a real implementation, this would sign the user out
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
} 