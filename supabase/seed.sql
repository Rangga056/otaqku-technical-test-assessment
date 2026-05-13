-- Seed Data for otaQku Quiz App

-- 1. Insert Quiz
INSERT INTO public.quizzes (id, title, description) 
VALUES ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'General Knowledge Quiz', 'Test your basic knowledge across various topics.')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Questions
INSERT INTO public.questions (id, quiz_id, question_text, points, order_index)
VALUES 
    ('e1d9b6a7-9304-4e2b-8a88-2c2a05d8f6d1', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the capital of France?', 10, 0),
    ('f3c8a5b9-1234-5678-90ab-cdef12345678', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Which planet is known as the Red Planet?', 10, 1),
    ('a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6', 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the largest ocean on Earth?', 10, 2)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Options
INSERT INTO public.options (id, question_id, option_text, is_correct)
VALUES 
    -- Q1 Options
    ('b1a2c3d4-e5f6-4a5b-9c0d-e1f2a3b4c5d6', 'e1d9b6a7-9304-4e2b-8a88-2c2a05d8f6d1', 'London', false),
    ('c1d2e3f4-g5h6-4a5b-9c0d-e1f2a3b4c5d7', 'e1d9b6a7-9304-4e2b-8a88-2c2a05d8f6d1', 'Paris', true),
    ('d1e2f3g4-h5i6-4a5b-9c0d-e1f2a3b4c5d8', 'e1d9b6a7-9304-4e2b-8a88-2c2a05d8f6d1', 'Berlin', false),
    
    -- Q2 Options
    ('e1f2g3h4-i5j6-4a5b-9c0d-e1f2a3b4c5d9', 'f3c8a5b9-1234-5678-90ab-cdef12345678', 'Mars', true),
    ('f1g2h3i4-j5k6-4a5b-9c0d-e1f2a3b4c5e0', 'f3c8a5b9-1234-5678-90ab-cdef12345678', 'Jupiter', false),
    ('g1h2i3j4-k5l6-4a5b-9c0d-e1f2a3b4c5e1', 'f3c8a5b9-1234-5678-90ab-cdef12345678', 'Venus', false),

    -- Q3 Options
    ('h1i2j3k4-l5m6-4a5b-9c0d-e1f2a3b4c5e2', 'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6', 'Atlantic Ocean', false),
    ('i1j2k3l4-m5n6-4a5b-9c0d-e1f2a3b4c5e3', 'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6', 'Pacific Ocean', true),
    ('j1k2l3m4-n5o6-4a5b-9c0d-e1f2a3b4c5e4', 'a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6', 'Indian Ocean', false)
ON CONFLICT (id) DO NOTHING;
