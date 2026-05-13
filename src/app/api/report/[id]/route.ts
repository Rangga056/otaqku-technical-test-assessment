import { auth } from "@/auth"
import { getAuthenticatedSupabase } from "@/lib/supabase"
import { renderToStream } from "@react-pdf/renderer"
import { PDFReport } from "@/components/report/PDFTemplate"
import { NextResponse } from "next/server"
import React from "react"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 })

  const supabase = await getAuthenticatedSupabase(session.user.id)
  
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
    .eq("id", params.id)
    .single()

  if (error || !attempt) return new NextResponse("Not Found", { status: 404 })

  // @ts-ignore - renderToStream returns a node stream, we convert to web stream
  const stream = await renderToStream(React.createElement(PDFReport, { attempt }))

  return new NextResponse(stream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="report-${params.id}.pdf"`,
    },
  })
}
