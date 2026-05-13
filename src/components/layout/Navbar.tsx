import Link from "next/link"
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export async function Navbar() {
  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#DADCE0]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* We will replace this with the generated favicon later */}
          <div className="w-8 h-8 rounded-lg bg-[#4285F4] flex items-center justify-center text-white font-bold text-lg leading-none">
            Q
          </div>
          <span className="text-xl font-medium tracking-tight text-[#202124]">
            ota<span className="font-bold text-[#4285F4]">Qku</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-[#5F6368] hover:text-[#202124] px-3 py-2 rounded-full hover:bg-[#F8F9FA] transition-colors">
                Workspace
              </Link>
              <div className="flex items-center gap-3 pl-4 ml-2 border-l border-[#DADCE0]">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-[#202124]">{session.user?.name}</span>
                </div>
                <form action={async () => {
                  "use server"
                  await signOut()
                }}>
                  <Button variant="ghost" className="p-2 h-10 w-10 rounded-full text-[#5F6368] hover:text-[#EA4335] hover:bg-red-50">
                    <LogOut size={18} />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/auth/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
