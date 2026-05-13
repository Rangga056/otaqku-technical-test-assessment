"use server"

import { getServiceSupabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { redirect } from "next/navigation"

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
})

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  try {
    SignupSchema.parse({ email, password, name })
    
    const password_hash = await bcrypt.hash(password, 10)
    const supabase = getServiceSupabase()
    
    const { error } = await supabase
      .from("users")
      .insert({
        email,
        password_hash,
        name,
      })

    if (error) {
      if (error.code === "23505") return { error: "Email already exists" }
      return { error: "Failed to create account" }
    }
  } catch (err) {
    return { error: "Invalid input data" }
  }

  redirect("/auth/signin?message=Account created! Please sign in.")
}
