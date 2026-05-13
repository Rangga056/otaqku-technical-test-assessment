-- Seed Data for otaQku Quiz App with valid UUIDs

-- 1. Insert Quiz
INSERT INTO public.quizzes (id, title, description) 
VALUES ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'General Knowledge Quiz', 'Test your basic knowledge across various topics.')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Questions
INSERT INTO public.questions (id, quiz_id, question_text, points, order_index)
VALUES 
    ('a9b8c7d6-e5f4-4321-8a7b-6c5d4e3f2a10', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the capital of France?', 10, 0),
    ('b9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a11', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Which planet is known as the Red Planet?', 10, 1),
    ('c9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a12', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the largest ocean on Earth?', 10, 2)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Options
INSERT INTO public.options (id, question_id, option_text, is_correct)
VALUES 
    -- Q1 Options
    ('f9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a13', 'a9b8c7d6-e5f4-4321-8a7b-6c5d4e3f2a10', 'London', false),
    ('09a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a14', 'a9b8c7d6-e5f4-4321-8a7b-6c5d4e3f2a10', 'Paris', true),
    ('19a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a15', 'a9b8c7d6-e5f4-4321-8a7b-6c5d4e3f2a10', 'Berlin', false),
    
    -- Q2 Options
    ('29a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a16', 'b9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a11', 'Mars', true),
    ('39a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a17', 'b9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a11', 'Jupiter', false),
    ('49a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a18', 'b9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a11', 'Venus', false),

    -- Q3 Options
    ('59a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a19', 'c9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a12', 'Atlantic Ocean', false),
    ('69a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a20', 'c9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a12', 'Pacific Ocean', true),
    ('79a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a21', 'c9a8c7d6-e5f4-4321-8a7b-6c5d4e3f2a12', 'Indian Ocean', false)
ON CONFLICT (id) DO NOTHING;
