import { signupAction } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100-64px)] flex items-center justify-center p-6 py-20">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl border border-gray-100 elevation-2">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to home
          </Link>
          <h1 className="text-3xl font-black tracking-tight mb-2">Create an account</h1>
          <p className="text-gray-500 text-sm">Start your precision learning journey today.</p>
        </div>

        <form action={signupAction} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                name="name" 
                type="text" 
                required 
                placeholder="John Doe"
                className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="john@example.com"
                className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="Min. 8 characters"
                className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl text-sm font-bold">
            Create Account
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
