import { createSupabaseServerClient } from '@/lib/supabase/server'
import { TemporaryHome } from '@/components/temporary-home'
import { LoginForm } from '@/components/login-form'
import { GalleryVerticalEnd } from "lucide-react"

export default async function Home() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    return <TemporaryHome />
  }

  // Layout de login igual al ejemplo de shadcn/ui
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Planta Alta
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
