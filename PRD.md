# Product Requirements Document (PRD): Quiz & Report Application

**Status**: Siap untuk Pengembangan (Ready for Development)  
**Estimasi Waktu**: 1-2 Hari  
**Tech Stack**: Next.js (App Router), TypeScript, Tailwind CSS, Supabase (Auth & PostgreSQL)

---

## 1. Product Overview & Objective
**Produk**: Aplikasi web interaktif untuk mengikuti kuis, melihat analisis hasil secara instan, dan mengekspor laporan kinerja dalam bentuk PDF.

**Objektif (Product Thinking)**:
Aplikasi ini memecahkan masalah evaluasi pengetahuan mandiri. Pengguna membutuhkan analisis mendalam mengenai pemahaman topik, visualisasi yang baik, dan dokumentasi (PDF) untuk pelaporan atau pelacakan progres.

**Target Pengguna**: Siswa, profesional, atau kandidat yang sedang melakukan persiapan ujian atau evaluasi mandiri.

---

## 2. Arsitektur & Pilihan Teknologi
Teknologi dipilih berdasarkan kebutuhan *rapid development*, tipe data relasional, dan kewajiban *server-side rendering* untuk PDF.

* **Framework**: Next.js (App Router) v14/v15 (Server Components & Route Handlers).
* **Bahasa**: TypeScript (*type safety* untuk meminimalisir *runtime error*).
* **Styling**: Tailwind CSS + shadcn/ui.
* **Database & Auth**: Supabase (PostgreSQL & *out-of-the-box authentication*).
* **Visualisasi**: Recharts atau Chart.js.
* **PDF**: @react-pdf/renderer atau pdfkit.
* **Strategi Chart-to-PDF**: Elemen chart di-render di *client* (DOM), dikonversi menjadi gambar (Base64) menggunakan `html2canvas`, lalu dikirim ke API *backend* untuk di-*generate* menjadi PDF di server.

---

## 3. Scope & Functional Requirements

### Epic 1: Autentikasi & Manajemen Sesi
* **FR1.1-1.2**: Pendaftaran, Login, dan Logout menggunakan email/password.
* **FR1.3**: Halaman `/quiz`, `/dashboard`, dan `/report` dilindungi oleh *middleware*.
* **FR1.4**: Isolasi data menggunakan *Row Level Security* (RLS) di Supabase.

### Epic 2: Kuis Engine
* **FR2.1-2.3**: Menampilkan pertanyaan pilihan ganda, pemilihan jawaban, dan bobot nilai.
* **FR2.4-2.5**: Submit jawaban secara *bulk* ke Server Action/API dan mendukung fitur *retake*.

### Epic 3: Hasil, Analisis & Dashboard
* **FR3.1-3.2**: Kalkulasi skor, persentase, breakdown jawaban, dan kategori performa (*Rule-based*: 0-40% Beginner, 41-75% Intermediate, 76-100% Advanced).
* **FR3.3-3.4**: Visualisasi chart dan *Insight* sederhana berbasis aturan.
* **FR3.5**: Dashboard riwayat *Past Attempts*.

### Epic 4: Server-Side PDF Export
* **FR4.1-4.4**: Tombol "Download Report as PDF" yang memicu *Server-side generation* di API Route, mencakup data kuis dan gambar chart.

---

## 4. Skema Database (Supabase PostgreSQL)
1.  **users**: (Disediakan otomatis oleh Supabase Auth)
2.  **quizzes**: id (PK), title, description
3.  **questions**: id (PK), quiz_id (FK), question_text, points
4.  **options**: id (PK), question_id (FK), option_text, is_correct
5.  **quiz_attempts**: id (PK), user_id (FK), quiz_id (FK), total_score, max_score, category, created_at
6.  **attempt_answers**: id (PK), attempt_id (FK), question_id (FK), selected_option_id (FK), is_correct

---

## 5. Rencana Eksekusi (1-2 Hari)
* **Hari 1**: Setup proyek, konfigurasi Supabase (Database/Auth/RLS), serta implementasi UI Kuis dan logika *submit*.
* **Hari 2**: Implementasi logika skor/analitik, UI `/result` dengan Recharts, konversi Chart-to-Base64 (html2canvas), pembuatan API Route PDF, serta finalisasi Dashboard dan dokumentasi.

---

## 6. Panduan Penulisan README.md
README wajib mencakup:
1.  **Project Title & Description**.
2.  **Product Thinking**: Penjelasan target pengguna dan masalah.
3.  **Architecture & Tech Choices**: Rasionalisasi *stack* dan teknis sinkronisasi chart ke PDF.
4.  **Local Setup Instructions**: Panduan instalasi dari `clone` hingga `run dev`.
5.  **Limitations & Trade-offs**: Catatan mengenai batasan implementasi (misal: penggunaan *rule-based* daripada AI).