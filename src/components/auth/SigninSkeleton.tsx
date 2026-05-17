import { Skeleton } from "@/components/ui/skeleton"

export function SigninSkeleton() {
  return (
    <div className="min-h-[calc(100-64px)] flex items-center justify-center p-6 py-20">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl border border-gray-100 elevation-2">
        <div className="flex flex-col items-center">
          {/* Back to home link placeholder */}
          <Skeleton className="h-4 w-24 mb-6" />
          
          {/* Title */}
          <Skeleton className="h-8 w-48 mb-2" />
          
          {/* Subtitle */}
          <Skeleton className="h-4 w-40 mb-8" />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            {/* Email field */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
            
            {/* Password field */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

          {/* Sign In button */}
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2">
              <Skeleton className="h-3 w-24" />
            </span>
          </div>
        </div>

        {/* Google button */}
        <Skeleton className="h-12 w-full rounded-xl" />

        {/* Sign up link */}
        <div className="flex justify-center pt-4">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  )
}
