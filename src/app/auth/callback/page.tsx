import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function AuthCallbackPage({ searchParams }: { searchParams: { code?: string; next?: string } }) {
  const supabase = createSupabaseServerClient()
  const code = searchParams.code
  let next = searchParams.next ?? '/'
  if (!next.startsWith('/')) next = '/'

  if (code) {
    // Intercambiar el código por la sesión
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Redirigir al destino final
      redirect(next)
    }
  }

  // Si hay error o no hay código, redirigir al login
  redirect('/login')
} 