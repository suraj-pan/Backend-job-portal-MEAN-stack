# Backend-job-portal-MEAN-stack
# 🧑‍💼 Job Portal Backend (MEAN Stack)

Full-working-Link --- https://naukri-job-portal.netlify.app/

This is the **backend API** for the full-stack Job Portal application — built with **Node.js, Express.js, and MongoDB**.  
It provides authentication, job posting, application tracking, and recruiter–jobseeker management APIs.

---

## 🚀 Features

✅ **User Authentication (JWT)**  
- Register and login for jobseekers & recruiters  
- Password hashing with bcrypt  
- Protected routes via JWT middleware

✅ **Recruiter Features**
- Create, view, and manage job postings  
- View applicants for each job  
- Update application statuses (select/reject)

✅ **Jobseeker Features**
- Apply to jobs  
- View all applied jobs & statuses  
- Update personal profile and upload resume

✅ **General Features**
- RESTful API structure  
- MongoDB for data persistence  
- Helmet + Morgan for security & logging  
- CORS configured for Netlify frontend

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| Backend Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (JSON Web Token) |
| File Upload | Multer |
| Security | Helmet, bcrypt |
| Logs | Morgan |
| CORS | Configured for Netlify |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/suraj-pan/Backend-job-portal-MEAN-stack.git
cd Backend-job-portal-MEAN-stack

