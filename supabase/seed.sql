-- Comprehensive Seed Data for otaQku Quiz App

-- 1. Insert/Update Quizzes
INSERT INTO public.quizzes (id, title, description) 
VALUES 
    ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'General Knowledge Mastery', 'A rigorous evaluation of broad knowledge across science, history, and geography.'),
    ('e390f1ee-6c54-4b01-90e6-d701748f0852', 'Design Principles & Theory', 'Test your understanding of visual hierarchy, Swiss design, and UX fundamentals.'),
    ('f490f1ee-6c54-4b01-90e6-d701748f0853', 'Logical Reasoning Assessment', 'Analyze patterns, syllogisms, and abstract relationships in this cognitive test.'),
    ('a590f1ee-6c54-4b01-90e6-d701748f0854', 'Web Development Fundamentals', 'Evaluate your grasp of React, Next.js, and modern database principles.')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

-- Helper to clear existing data for these specific quizzes to ensure clean re-seeding
DELETE FROM public.options WHERE question_id IN (SELECT id FROM public.questions WHERE quiz_id IN ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'f490f1ee-6c54-4b01-90e6-d701748f0853', 'a590f1ee-6c54-4b01-90e6-d701748f0854'));
DELETE FROM public.questions WHERE quiz_id IN ('d290f1ee-6c54-4b01-90e6-d701748f0851', 'e390f1ee-6c54-4b01-90e6-d701748f0852', 'f490f1ee-6c54-4b01-90e6-d701748f0853', 'a590f1ee-6c54-4b01-90e6-d701748f0854');

-- 2. Questions & Options for General Knowledge
DO $$
DECLARE
    q_id UUID;
    quiz_id UUID := 'd290f1ee-6c54-4b01-90e6-d701748f0851';
BEGIN
    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the capital of France?', 10, 0);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Paris', true), (q_id, 'London', false), (q_id, 'Berlin', false), (q_id, 'Madrid', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which planet is known as the Red Planet?', 10, 1);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Mars', true), (q_id, 'Venus', false), (q_id, 'Jupiter', false), (q_id, 'Saturn', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the largest ocean on Earth?', 10, 2);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Pacific Ocean', true), (q_id, 'Atlantic Ocean', false), (q_id, 'Indian Ocean', false), (q_id, 'Arctic Ocean', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Who painted the Mona Lisa?', 10, 3);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Leonardo da Vinci', true), (q_id, 'Pablo Picasso', false), (q_id, 'Vincent van Gogh', false), (q_id, 'Michelangelo', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the chemical symbol for Gold?', 10, 4);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Au', true), (q_id, 'Ag', false), (q_id, 'Fe', false), (q_id, 'Cu', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which country is known as the Land of the Rising Sun?', 10, 5);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Japan', true), (q_id, 'China', false), (q_id, 'South Korea', false), (q_id, 'Thailand', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the smallest prime number?', 10, 6);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, '2', true), (q_id, '1', false), (q_id, '3', false), (q_id, '5', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'In which year did the Titanic sink?', 10, 7);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, '1912', true), (q_id, '1905', false), (q_id, '1920', false), (q_id, '1898', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the hardest natural substance on Earth?', 10, 8);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Diamond', true), (q_id, 'Gold', false), (q_id, 'Iron', false), (q_id, 'Quartz', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which gas do plants absorb from the atmosphere?', 10, 9);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Carbon Dioxide', true), (q_id, 'Oxygen', false), (q_id, 'Nitrogen', false), (q_id, 'Hydrogen', false);
END $$;

-- 3. Questions & Options for Design Theory
DO $$
DECLARE
    q_id UUID;
    quiz_id UUID := 'e390f1ee-6c54-4b01-90e6-d701748f0852';
BEGIN
    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the primary principle of Swiss Design?', 10, 0);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Objective clarity and a strict grid system.', true), (q_id, 'Ornate typography and rich illustrations.', false), (q_id, 'Asymmetrical balance and chaotic layouts.', false), (q_id, 'Heavy reliance on photorealistic textures.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'In UI design, what does "affordance" refer to?', 10, 1);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Visual cues that indicate how an object should be used.', true), (q_id, 'The cost of implementing a specific design feature.', false), (q_id, 'The speed at which a user can complete a task.', false), (q_id, 'The aesthetic appeal of a user interface.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which color model is primarily used for digital screens?', 10, 2);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'RGB (Red, Green, Blue)', true), (q_id, 'CMYK (Cyan, Magenta, Yellow, Black)', false), (q_id, 'RYB (Red, Yellow, Blue)', false), (q_id, 'Pantone Matching System', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the purpose of a "Grid System" in layout design?', 10, 3);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'To provide structure, alignment, and consistency.', true), (q_id, 'To limit the number of colors used in a design.', false), (q_id, 'To increase the file size of the design document.', false), (q_id, 'To make the design look more complicated.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What does the "Golden Ratio" approximately equal?', 10, 4);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, '1.618', true), (q_id, '3.141', false), (q_id, '2.718', false), (q_id, '1.414', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which font category is characterized by small lines at the ends of characters?', 10, 5);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Serif', true), (q_id, 'Sans-serif', false), (q_id, 'Monospace', false), (q_id, 'Script', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is "Kerning" in typography?', 10, 6);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'The adjustment of space between individual characters.', true), (q_id, 'The vertical space between lines of text.', false), (q_id, 'The thickness of the character strokes.', false), (q_id, 'The overall size of the font.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'In UX, what does "Fitts''s Law" predict?', 10, 7);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'The time required to move to a target area.', true), (q_id, 'The number of errors a user will make.', false), (q_id, 'The emotional response of a user to a design.', false), (q_id, 'The readability of a block of text.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the "Gestalt Principle" of Proximity?', 10, 8);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Objects near each other tend to be grouped together.', true), (q_id, 'Similar objects tend to be perceived as a single unit.', false), (q_id, 'The brain tends to complete incomplete shapes.', false), (q_id, 'Closed shapes are perceived as more stable.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which file format is best for high-quality scalable vector graphics?', 10, 9);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'SVG', true), (q_id, 'PNG', false), (q_id, 'JPG', false), (q_id, 'GIF', false);
END $$;

-- 4. Questions & Options for Logical Reasoning
DO $$
DECLARE
    q_id UUID;
    quiz_id UUID := 'f490f1ee-6c54-4b01-90e6-d701748f0853';
BEGIN
    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'If all bloops are razzies and all razzies are lazzies, are all bloops definitely lazzies?', 10, 0);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Yes', true), (q_id, 'No', false), (q_id, 'Only if razzies are also bloops', false), (q_id, 'Insufficient information', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Complete the sequence: 2, 6, 12, 20, 30, ...', 10, 1);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, '42', true), (q_id, '40', false), (q_id, '38', false), (q_id, '44', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which word does not belong with the others?', 10, 2);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Avenue', true), (q_id, 'Tyre', false), (q_id, 'Steering wheel', false), (q_id, 'Engine', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'If some A are B, and some B are C, then some A are C. Is this true?', 10, 3);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Not necessarily', true), (q_id, 'Always true', false), (q_id, 'Always false', false), (q_id, 'Only if B is equal to C', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the next number in the pattern: 1, 1, 2, 3, 5, 8, 13, ...', 10, 4);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, '21', true), (q_id, '19', false), (q_id, '20', false), (q_id, '22', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Five people (A, B, C, D, E) are in a line. A is next to B. C is next to D. E is at one end. If A is in the middle, who is at the other end?', 10, 5);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Cannot be determined', true), (q_id, 'D', false), (q_id, 'C', false), (q_id, 'B', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'A clock shows 3:15. What is the angle between the hour and minute hands?', 10, 6);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, '7.5 degrees', true), (q_id, '0 degrees', false), (q_id, '15 degrees', false), (q_id, '5 degrees', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'If "BLUE" is coded as "CNVF", how is "GRAY" coded?', 10, 7);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'HSBZ', true), (q_id, 'IRCA', false), (q_id, 'FTZX', false), (q_id, 'JSCA', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Find the odd one out: Square, Circle, Triangle, Rectangle.', 10, 8);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Circle', true), (q_id, 'Square', false), (q_id, 'Triangle', false), (q_id, 'Rectangle', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'If a doctor gives you 3 pills and tells you to take one every half hour, how long will they last?', 10, 9);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, '1 hour', true), (q_id, '1.5 hours', false), (q_id, '2 hours', false), (q_id, '45 minutes', false);
END $$;

-- 5. Questions & Options for Web Development
DO $$
DECLARE
    q_id UUID;
    quiz_id UUID := 'a590f1ee-6c54-4b01-90e6-d701748f0854';
BEGIN
    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'In React, what is the primary purpose of the "useEffect" hook?', 10, 0);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'To handle side effects like data fetching or DOM manipulation.', true), (q_id, 'To create a new state variable.', false), (q_id, 'To improve component rendering speed.', false), (q_id, 'To style the component.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What does the "App Router" in Next.js use for its underlying routing mechanism?', 10, 1);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'React Server Components', true), (q_id, 'Pages Directory', false), (q_id, 'React Router DOM', false), (q_id, 'Express.js', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which SQL command is used to combine rows from two or more tables based on a related column?', 10, 2);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'JOIN', true), (q_id, 'UNION', false), (q_id, 'MERGE', false), (q_id, 'COMBINE', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'In Tailwind CSS, what does the class "flex-1" do?', 10, 3);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Allows a flex item to grow and shrink as needed, ignoring initial size.', true), (q_id, 'Sets the flex-direction to row.', false), (q_id, 'Gives an item a fixed width of 100%.', false), (q_id, 'Hides the item on small screens.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the purpose of the "z-index" property in CSS?', 10, 4);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'To control the stack order of elements.', true), (q_id, 'To zoom in on an image.', false), (q_id, 'To set the transparency of an element.', false), (q_id, 'To define the font weight.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'In Next.js, what is the default rendering strategy for components in the "app" directory?', 10, 5);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Server Components', true), (q_id, 'Client Components', false), (q_id, 'Static Site Generation', false), (q_id, 'Incremental Static Regeneration', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What does the "git push" command do?', 10, 6);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Uploads local repository content to a remote repository.', true), (q_id, 'Downloads changes from a remote repository.', false), (q_id, 'Creates a new branch.', false), (q_id, 'Stages changes for commit.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'Which of the following is NOT a primitive data type in JavaScript?', 10, 7);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'Object', true), (q_id, 'String', false), (q_id, 'Number', false), (q_id, 'Boolean', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'In TypeScript, what does the "unknown" type represent?', 10, 8);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'A type-safe version of "any".', true), (q_id, 'A variable that can never have a value.', false), (q_id, 'An optional parameter.', false), (q_id, 'A type that can only be a string or number.', false);

    q_id := gen_random_uuid();
    INSERT INTO public.questions (id, quiz_id, question_text, points, order_index) VALUES (q_id, quiz_id, 'What is the purpose of the ".gitignore" file?', 10, 9);
    INSERT INTO public.options (question_id, option_text, is_correct) VALUES (q_id, 'To specify which files and directories Git should ignore.', true), (q_id, 'To store sensitive API keys.', false), (q_id, 'To list the project dependencies.', false), (q_id, 'To configure the Git remote URL.', false);
END $$;
