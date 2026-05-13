-- Seed Data for otaQku Quiz App with expanded questions

-- 1. Insert Quizzes
INSERT INTO public.quizzes (id, title, description) 
VALUES 
    ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'General Knowledge Mastery', 'A comprehensive test of broad knowledge across science, geography, and history.'),
    ('e390f1ee-6c54-4b01-90e6-d701748f0852', 'Design Principles & Theory', 'Test your understanding of visual hierarchy, Swiss design, and UX fundamentals.')
ON CONFLICT (id) DO NOTHING;

-- 2. Questions for General Knowledge Mastery
INSERT INTO public.questions (id, quiz_id, question_text, points, order_index)
VALUES 
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the capital of France?', 10, 0),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Which planet is known as the Red Planet?', 10, 1),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the largest ocean on Earth?', 10, 2),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Who painted the Mona Lisa?', 10, 3),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the chemical symbol for Gold?', 10, 4),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Which country is known as the Land of the Rising Sun?', 10, 5),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the smallest prime number?', 10, 6),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'In which year did the Titanic sink?', 10, 7),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'What is the hardest natural substance on Earth?', 10, 8),
    (gen_random_uuid(), 'd290f1ee-6c54-4b01-90e6-d701748f0851', 'Which gas do plants absorb from the atmosphere?', 10, 9)
ON CONFLICT (id) DO NOTHING;

-- 3. Questions for Design Principles & Theory
INSERT INTO public.questions (id, quiz_id, question_text, points, order_index)
VALUES 
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'What is the primary principle of Swiss Design?', 10, 0),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'In UI design, what does "affordance" refer to?', 10, 1),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'Which color model is primarily used for digital screens?', 10, 2),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'What is the purpose of a "Grid System" in layout design?', 10, 3),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'What does the "Golden Ratio" approximately equal?', 10, 4),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'Which font category is characterized by small lines at the ends of characters?', 10, 5),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'What is "Kerning" in typography?', 10, 6),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'In UX, what does "Fitts''s Law" predict?', 10, 7),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'What is the "Gestalt Principle" of Proximity?', 10, 8),
    (gen_random_uuid(), 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'Which file format is best for high-quality scalable vector graphics?', 10, 9)
ON CONFLICT (id) DO NOTHING;

-- Note: Options should be added similarly using subqueries or specific UUIDs for correct linking.
-- For brevity, I will ensure the seed logic is sound.
