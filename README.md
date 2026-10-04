# Sarikella Madhu — MERN Portfolio

A personal portfolio built with **MongoDB, Express, React (Vite) and Node.js**, filled with the content from my resume.

- **Portfolio site:** hero, about, skills, projects, education, achievements & leadership, contact form, and a downloadable resume.
- **Admin page (`/admin`):** add, edit and delete projects and read contact messages, with no code changes needed.
- **REST API:** projects and profile are stored in MongoDB.

```
madhu-portfolio/
├── server/                 Express + Mongoose API
│   ├── data/resumeData.js  ← resume content (edit, then re-seed)
│   ├── models/             Profile, Project, Message
│   ├── routes/             /api/profile, /api/projects, /api/messages
│   ├── middleware/         admin key check
│   └── seed.js             loads resume content into MongoDB
└── client/                 React (Vite) frontend
    ├── public/Sarikella_Madhu_Resume.pdf
    └── src/pages/          Home.jsx (portfolio), Admin.jsx (manage projects)
```

---

## 1. Run it on your computer

**Prerequisites:** [Node.js 18+](https://nodejs.org) and a MongoDB database. The easiest option is a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster; a locally installed MongoDB also works.

```bash
# 1. Install dependencies (from the project root)
npm run install-all

# 2. Configure the server
cd server
cp .env.example .env        # on Windows: copy .env.example .env
#   then open server/.env and set MONGO_URI and ADMIN_KEY

# 3. Load your resume content into MongoDB
npm run seed
cd ..

# 4. Start the API and the website (use two terminals)
npm run server              # API on http://localhost:5000
npm run client              # site on http://localhost:5173
```

Open **http://localhost:5173**. The admin page is at **http://localhost:5173/admin**.

> **Atlas tip:** in Atlas, go to *Database → Connect → Drivers* and copy the connection string, e.g.
> `mongodb+srv://madhu:<password>@cluster0.xxxxx.mongodb.net/portfolio`.
> Under *Network Access*, allow `0.0.0.0/0` so Render can connect later.

---

## 2. Add or edit projects

**Option A: admin page (recommended)**

1. Go to `/admin` and sign in with the `ADMIN_KEY` from `server/.env`.
2. Fill in the form: title, subtitle, description, highlights (one per line), tech stack (comma-separated), GitHub link, live demo link, and an optional screenshot URL.
3. Click **Add project**. It shows up on the site immediately.

Use **Display order** to control the order (lower numbers come first).

**Option B: edit the seed file.** Edit `server/data/resumeData.js`, then run `npm run seed` again.
⚠️ Re-seeding replaces all projects with what's in the file.

> **To do:** StayDesk and AlgoMind don't have GitHub or live links yet. Add them from `/admin` so the icons appear on the project cards.

---

## 3. Deploy it and share the link (free)

### a) API → Render
1. Push this project to a GitHub repository.
2. On [render.com](https://render.com), click **New → Web Service** and pick the repo.
   - **Root directory:** `server`
   - **Build command:** `npm install`
   - **Start command:** `npm start`
3. Add these **Environment variables:**
   - `MONGO_URI`: your Atlas connection string
   - `ADMIN_KEY`: a long secret
   - `CLIENT_URL`: your Vercel URL (you'll get it in step b; you can update it afterwards)
4. Deploy. Your API URL will look like `https://madhu-portfolio-api.onrender.com`.
   Check that `https://…onrender.com/api/health` returns `{"status":"ok"}`.
5. Seed the production database once, from your computer: set `MONGO_URI` in `server/.env` to the Atlas string, then run `npm run seed`.

### b) Frontend → Vercel
1. On [vercel.com](https://vercel.com), click **Add New → Project** and pick the same repo.
   - **Root directory:** `client`
   - **Framework preset:** Vite
2. Add the environment variable `VITE_API_URL` = your Render API URL (no trailing slash).
3. Deploy. You'll get a link like `https://sarikella-madhu.vercel.app`. Put it on your resume, LinkedIn and GitHub.
4. Go back to Render and set `CLIENT_URL` to this Vercel URL, then redeploy the API.

> Free Render services go to sleep after about 15 minutes without traffic, so the first visit can take around 30–50 seconds to load. Opening your site before an interview avoids that wait.

---

## API reference

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/profile` | public | Profile, skills, education, achievements |
| PUT | `/api/profile` | admin | Update profile |
| GET | `/api/projects` | public | List projects |
| GET | `/api/projects/:id` | public | Single project |
| POST | `/api/projects` | admin | Add project |
| PUT | `/api/projects/:id` | admin | Edit project |
| DELETE | `/api/projects/:id` | admin | Delete project |
| POST | `/api/messages` | public | Contact form (5 per IP / 15 min) |
| GET | `/api/messages` | admin | Read messages |
| DELETE | `/api/messages/:id` | admin | Delete message |

Admin requests send the header `x-admin-key: <ADMIN_KEY>`.

Example: add a project with curl:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" -H "x-admin-key: YOUR_KEY" \
  -d '{"title":"My New App","subtitle":"What it is","techStack":["React","MongoDB"],"githubUrl":"https://github.com/SARIKELLA-MADHU/my-new-app"}'
```
