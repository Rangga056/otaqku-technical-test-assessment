import { auth } from "@/auth"
import { getAuthenticatedSupabase } from "@/lib/db"
import { renderToBuffer } from "@react-pdf/renderer"
import { PDFReport } from "@/components/report/PDFTemplate"
import { NextResponse } from "next/server"

async function getAttemptData(id: string, userId: string) {
  const supabase = await getAuthenticatedSupabase(userId)
  
  const { data: attempt, error } = await supabase
    .from("quiz_attempts")
    .select(`
      *,
      quizzes(title),
      attempt_answers(
        *,
        questions(question_text),
        options(option_text)
      )
    `)
    .eq("id", id)
    .single()

  return { attempt, error }
}

/**
 * Generates a native PDF report for a quiz attempt.
 * No longer requires client-side screenshots.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })

  const { id } = await params
  const { attempt, error } = await getAttemptData(id, session.user.id)

  if (error || !attempt) return new NextResponse("Not Found", { status: 404 })

  try {
    // Render native PDF components to buffer
    const buffer = await renderToBuffer(PDFReport({ attempt }))

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="otaqku-report-${id}.pdf"`,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (err) {
    console.error("Native PDF Generation Error:", err)
    return new NextResponse("Error generating professional report", { status: 500 })
  }
}
