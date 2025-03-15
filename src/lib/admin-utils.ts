import { supabaseAdmin } from '@/lib/supabase/admin'

export async function getAllUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers()
  
  if (error) {
    throw error
  }
  
  return data.users
}

export async function deleteUser(userId: string) {
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
  
  if (error) {
    throw error
  }
  
  return true
}

export async function assignUserRole(userId: string, role: string) {
  // This is an example - the actual implementation depends on how you're storing roles
  const { error } = await supabaseAdmin
    .from('user_roles')
    .upsert({ user_id: userId, role })
  
  if (error) {
    throw error
  }
  
  return true
} 