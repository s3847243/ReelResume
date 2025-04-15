# 🎥 ReelResume – Video Portfolio Generator for Job Seekers

ReelResume is a full-stack web application that enables job seekers to showcase their resume and pitch video through a personalized link. Built with a strong focus on backend performance, caching, and API security, ReelResume improves candidate visibility and helps increase recruiter engagement.

---

## 🚀 Live Demo
🌐 [Live Frontend](https://reel-resume.vercel.app/)  
📽️ Example View Page: `https://yourdomain.com/view/{slug}`

---

## 🧠 Why I Built This
Recruiters respond more positively to candidates who present themselves through short video pitches alongside their resume. I created ReelResume to help my friends stand out with a video-first approach — and the results have shown significantly improved response rates.

---

## 🛠 Tech Stack

- **Backend:** Java, Spring Boot
- **Frontend:** React (Vite), deployed on Vercel
- **Database:** MongoDB
- **Hosting:** Render (Backend), Vercel (Frontend)
- **Payments:** Stripe (Custom domain upgrade)
- **Caching:** Redis
- **Rate Limiting:** Bucket4j (50 req/min on public view endpoint)

---

## ✨ Key Features

- 📁 Upload Resume (PDF) and Video (MP4)
- 🔗 Auto-generated shareable link: `/view/{slug}`
- 🚀 Deployed to production using Render (API) and Vercel (Frontend)
- 🧠 Redis-based caching to avoid repetitive DB hits on public view
- 🛡️ Rate-limited endpoint using Bucket4j (50 requests/minute)
- 💳 Stripe integration for $1.50 one-time upgrade to custom domain
- ✅ Resume and video are displayed side-by-side for easy viewing

---

## 🧪 API Overview

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| `GET`  | `/view/{slug}`     | Public view page for resume+video |
| `POST` | `/api/upload`      | Upload resume and video           |
| `POST` | `/api/payment`     | Initiate Stripe payment           |

---

