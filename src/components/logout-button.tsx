'use client'

import { supabase } from '@/lib/supabase/client'

export function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
      Log out
    </button>
  )
}