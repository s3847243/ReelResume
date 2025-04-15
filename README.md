# 🎥 ReelResume – Video Portfolio Generator for Job Seekers

ReelResume is a full-stack web application that enables job seekers to showcase their resume and pitch video through a personalized link. Built with a strong focus on backend performance, caching, and API security, ReelResume improves candidate visibility and helps increase recruiter engagement.

---

## 🚀 Live Demo
🌐 [Live Frontend](https://reel-resume.vercel.app/)  
📽️ Example View Page: `https://reel-resume.vercel.app/api/view/9g485e`

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
- **Storage:** AWS S3 (for videos and resumes)
- **Rate Limiting:** Bucket4j (50 req/min on public view endpoint)

---

## ✨ Key Features

- 📁 Upload Resume (PDF) and Video (MP4)
- 🔗 Auto-generated shareable link: `/view/{slug}`
- ☁️ Files are securely uploaded and stored in **Amazon S3**
- 🚀 Deployed to production using Render (API) and Vercel (Frontend)
- 🧠 Redis-based caching to avoid repetitive DB hits on public view
- 🛡️ Rate-limited endpoint using Bucket4j (50 requests/minute)
- 💳 Stripe integration for $1.50 one-time upgrade to custom domain
- ✅ Resume and video are displayed side-by-side for easy viewing

---

## 🔌 API Endpoints

### 🔄 Pitch Management (`/api/pitch`)
| Method | Endpoint                      | Description                                      |
|--------|-------------------------------|--------------------------------------------------|
| `POST` | `/api/pitch`                  | Create a new pitch from user data               |
| `GET`  | `/api/pitch/{slug}`           | Retrieve pitch data by slug                     |
| `GET`  | `/api/pitch/by-session/{id}`  | Get pitch by session ID (only if paid)          |
| `GET`  | `/api/pitch/slug/{slug}`      | Get pitch by slug (only if paid)                |

### 📦 File Uploads (`/api/upload`)
| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| `POST` | `/api/upload/resume`    | Upload resume file (PDF) |
| `POST` | `/api/upload/video`     | Upload pitch video (MP4) |

### 💳 Payment & Domain (`/api/pay`)
| Method | Endpoint       | Description                    |
|--------|----------------|--------------------------------|
| `POST` | `/api/pay`     | Initiate Stripe payment flow   |

### 🔎 Slug Validation (`/api/slug`)
| Method | Endpoint              | Description                   |
|--------|-----------------------|-------------------------------|
| `GET`  | `/api/slug/check`     | Check if a slug is available |

### 🔁 Webhooks (`/webhook`)
| Method | Endpoint      | Description                          |
|--------|---------------|--------------------------------------|
| `POST` | `/webhook`    | Stripe webhook to confirm payment    |

---

