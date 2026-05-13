# User Flow Documentation

This document outlines the step-by-step experience for a user interacting with the otaQku Quiz App.

## 1. Authentication Flow
- **Entry**: User arrives at the landing page.
- **Login/Signup**: User is redirected to `/auth/signin` if not authenticated.
  - **Credentials**: User enters email and password. Password is verified using bcrypt.
  - **OAuth**: User clicks "Login with Google". NextAuth handles the handshake and syncs the user profile to our custom `public.users` table.
- **Success**: User is redirected to the `/dashboard`.

## 2. Dashboard & Discovery
- **Overview**: User sees their overall stats (Average Score, Quizzes Completed, Highest Score).
- **History**: A list of "Past Attempts" shows previous results with links to view reports.
- **Start Quiz**: User browses available quizzes and clicks "Start Quiz" on a specific card.

## 3. Taking a Quiz
- **Start**: User clicks "Start Quiz" and is redirected to `/quiz/[id]`.
- **Interaction**:
  - The UI displays one question at a time.
  - User selects an option (stored in Zustand state).
  - User clicks "Next" to proceed or "Previous" to review.
  - Progress bar updates as the user moves through the questions.
- **Finish**: On the last question, the user clicks "Finish Quiz".

## 4. Scoring & Results
- **Processing**: The `submitQuizAction` Server Action calculates the score and saves the attempt in a single bulk transaction.
- **Redirect**: User is instantly redirected to `/quiz/result/[id]`.
- **Analytics**: 
  - User sees a visual Pie Chart of Correct vs. Incorrect answers.
  - User sees their performance category (Beginner, Intermediate, Advanced).
  - A detailed question-by-question breakdown shows what was right and wrong.

## 5. Reporting
- **Export**: From the result page, the user clicks "Download PDF Report".
- **Download**: A new tab opens to `/api/report/[id]`, triggering the server-side PDF generation, and the report is downloaded to the user's device.
