-- 1. Custom Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    name TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Quizzes Table
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    points INTEGER DEFAULT 10,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Options Table
CREATE TABLE IF NOT EXISTS public.options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    total_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Attempt Answers Table
CREATE TABLE IF NOT EXISTS public.attempt_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_option_id UUID NOT NULL REFERENCES public.options(id) ON DELETE CASCADE,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Indexes for Performance
CREATE INDEX idx_questions_quiz_id ON public.questions(quiz_id);
CREATE INDEX idx_options_question_id ON public.options(question_id);
CREATE INDEX idx_attempts_user_id ON public.quiz_attempts(user_id);
CREATE INDEX idx_attempts_quiz_id ON public.quiz_attempts(quiz_id);
CREATE INDEX idx_attempt_answers_attempt_id ON public.attempt_answers(attempt_id);

-- 8. View for User Stats (N+1 Prevention)
CREATE OR REPLACE VIEW public.user_quiz_stats AS
SELECT 
    user_id,
    COUNT(id) as total_attempts,
    AVG(total_score::float / max_score * 100) as avg_percentage,
    MAX(total_score) as highest_score,
    COUNT(CASE WHEN category = 'Advanced' THEN 1 END) as advanced_count
FROM public.quiz_attempts
GROUP BY user_id;

-- 9. RLS Session Bridge
-- This function allows NextAuth to pass the user ID to Postgres
-- Usage: SELECT set_config('app.current_user_id', 'uuid-here', true);
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see/modify their own data
CREATE POLICY user_self_access ON public.users
    USING (id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY attempt_self_access ON public.quiz_attempts
    USING (user_id = current_setting('app.current_user_id', true)::uuid);

CREATE POLICY answer_self_access ON public.attempt_answers
    USING (attempt_id IN (
        SELECT id FROM public.quiz_attempts 
        WHERE user_id = current_setting('app.current_user_id', true)::uuid
    ));

-- Public access policies for Quiz structure
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;

CREATE POLICY quiz_read_access ON public.quizzes FOR SELECT USING (true);
CREATE POLICY question_read_access ON public.questions FOR SELECT USING (true);
CREATE POLICY option_read_access ON public.options FOR SELECT USING (true);

-- 10. RPC Helper for RLS Bridge
CREATE OR REPLACE FUNCTION public.set_session_user(user_id UUID)
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.current_user_id', user_id::TEXT, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
