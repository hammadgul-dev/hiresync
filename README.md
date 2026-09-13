# HireSync

A full-stack job platform connecting job seekers and employers, with AI-powered tools to speed up hiring and job applications.

🔗 **Live:** https://hiresync-xi.vercel.app

## What it does

HireSync lets employers post jobs, manage applications, and view candidate profiles — while job seekers can search jobs, apply, save listings, and generate AI-powered cover letters and CVs tailored to each application.

## Tech Stack

- **Framework:** Next.js 16 (Turbopack), TypeScript
- **Styling:** Tailwind CSS v4, Poppins font
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** NextAuth (Credentials + Google OAuth, JWT strategy)
- **AI:** Groq API (llama-3.3-70b-versatile) — powers AI cover letter & CV generation
- **File Storage:** Cloudinary
- **PDF Generation:** PDFKit
- **UI Feedback:** react-hot-toast

## Features

- Job posting, search, and apply flow
- Saved jobs for job seekers
- Employer dashboard — job CRUD, applicant management, stats
- AI Cover Letter generator
- AI CV generator (PDF, auto-uploaded to Cloudinary)
- Profile view tracking
- Google + Credentials authentication

## Folder Structure

```
src
├── app
│   ├── (main)          → job seeker/employer pages
│   ├── api             → backend routes
│   ├── auth             → login/register/oauth pages
│   └── utils            → helpers
├── components            → shared UI components
├── lib                   → auth, db, cloudinary config
├── model                 → mongoose schemas
└── middleware.ts
```

## Environment Variables

```
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GROQ_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
COVER_LETTER_PROMPT=
CV_PROMPT=
```

## Deployment

Deployed on **Vercel**. Push to `main` auto-triggers a production build.
