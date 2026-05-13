import Link from "next/link"
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { LogOut, User as UserIcon } from "lucide-react"

export async function Navbar() {
  const session = await auth()

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-100">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter text-blue-600">
          otaQku
        </Link>

        <div className="flex items-center gap-6">
          {session ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-900">{session.user?.name}</span>
                  <span className="text-[10px] text-gray-500">{session.user?.email}</span>
                </div>
                <form action={async () => {
                  "use server"
                  await signOut()
                }}>
                  <Button variant="ghost" className="p-2 h-auto text-gray-400 hover:text-red-600">
                    <LogOut size={18} />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
