# Orchestra AI - Quick Reference Guide

## 🚀 Start Here

```bash
# Terminal 1 - Backend
cd backend
npm install
# Add your .env values (GEMINI_API_KEY, MONGO_URI)
npm run dev
# Expected: "Orchestra AI Backend running on port 5000"

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
# Browser opens to http://localhost:3000
```

---

## 📚 Documentation Quick Links

| Document | Purpose | Length |
|----------|---------|--------|
| **README.md** | Project overview & features | 500+ lines |
| **QUICKSTART.md** | Setup & run instructions | 200+ lines |
| **IMPLEMENTATION_SUMMARY.md** | What's been built | 400+ lines |
| **ARCHITECTURE.md** | System design & flows | 500+ lines |
| **FILE_STRUCTURE.md** | Directory layout & file descriptions | 400+ lines |
| **ROADMAP.md** | Development phases & checklist | 400+ lines |
| **This file** | Quick reference | 200 lines |

---

## 🔑 Environment Variables

### Backend `.env`
```env
# Database
MONGO_URI=mongodb://localhost:27017/orchestra-ai

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=15m

# AI
GEMINI_API_KEY=your-gemini-api-key-here
```

### Frontend
No `.env` needed. Uses `http://localhost:5000/api`

---

## 🏗️ Project Structure Quick View

```
orchestra-ai/
├── backend/
│   ├── src/
│   │   ├── models/          (User, Project, Task)
│   │   ├── controllers/     (projectController)
│   │   ├── routes/          (projects, tasks)
│   │   ├── services/        (geminiService)
│   │   └── server.js        (Express app)
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/           (Dashboard)
    │   ├── components/      (TaskCard, LoadingSpinner)
    │   ├── redux/           (projectSlice, store)
    │   ├── services/        (api.js)
    │   └── App.jsx
    └── index.html
```

---

## 📡 API Endpoints Reference

### Task Generation (No Auth Needed)
```
POST /api/projects/generate-tasks
Body: { "goal": "Build a mobile app" }
Returns: { tasks: [], breakdown: {} }
```

### Projects (Auth Required)
```
POST /api/projects
GET /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id
```

### Tasks (Auth Required)
```
POST /api/tasks
GET /api/tasks/project/:projectId
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 🔄 Data Flow Diagram

```
User enters goal
      ↓
Clicks "Generate with AI"
      ↓
Frontend: dispatch(generateProjectTasks(goal))
      ↓
Axios: POST /api/projects/generate-tasks
      ↓
Backend: generateProjectBreakdownController
      ↓
Service: geminiService.generateProjectTasks(goal)
      ↓
Gemini API: Returns structured JSON
      ↓
Backend: Parses & validates JSON
      ↓
Frontend: Receives tasks
      ↓
Redux: Update state.generatedTasks
      ↓
Dashboard: Maps tasks → TaskCard components
      ↓
User sees task breakdown ✅
```

---

## 🎨 Component Tree

```
App
  └── Dashboard
      ├── Input Form
      ├── Generate Button
      ├── LoadingSpinner (when loading)
      ├── Error Display (when error)
      └── TaskCard[] (when data exists)
          ├── Task number badge
          ├── Title & description
          └── Priority badge
```

---

## 🛠️ Common Tasks

### Test Backend Health
```bash
curl http://localhost:5000/api/health
# Response: { "message": "Orchestra AI Backend is running" }
```

### Test Gemini Integration
```bash
curl -X POST http://localhost:5000/api/projects/generate-tasks \
  -H "Content-Type: application/json" \
  -d '{"goal": "Build a website"}'
```

### Debug Issues
```bash
# Check MongoDB connection
# 1. Ensure MongoDB is running (mongod)
# 2. Check MONGO_URI in .env
# 3. Check backend console for connection logs

# Check Gemini API
# 1. Verify API key in .env
# 2. Check Gemini usage in AI Studio dashboard
# 3. Check backend console for API errors

# Check Frontend
# 1. Open browser console (F12)
# 2. Check Network tab for API calls
# 3. Check Redux DevTools (if installed)
```

---

## 📦 Dependencies Summary

### Backend
- **express** - Server framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT tokens
- **@google/generative-ai** - Gemini API client

### Frontend
- **react** - UI framework
- **react-dom** - React DOM bindings
- **vite** - Build tool
- **tailwindcss** - CSS framework
- **@reduxjs/toolkit** - State management
- **react-redux** - Redux bindings
- **axios** - HTTP client

---

## 🎯 What You Can Tell Recruiters

### About This Project
"Orchestra AI is a full-stack MERN application that uses Google's Gemini API to intelligently break down project goals into actionable tasks. It demonstrates proficiency in modern web development, AI integration, and scalable architecture."

### Key Features to Highlight
1. **AI Integration**: Structured prompts to Gemini 1.5 Pro for consistent JSON outputs
2. **Database Design**: Hierarchical task relationships with Mongoose
3. **State Management**: Redux Toolkit with async thunks for clean architecture
4. **API Design**: RESTful endpoints with proper error handling
5. **UI/UX**: Responsive design with Tailwind CSS
6. **Code Organization**: Services, controllers, models separation of concerns

### Technologies Mastered
✅ Full MERN stack (MongoDB, Express, React, Node)
✅ AI/ML integration (Gemini API)
✅ JWT authentication
✅ Redux Toolkit
✅ Tailwind CSS
✅ RESTful API design

---

## 🐛 Troubleshooting

### Backend won't start
```
Error: Cannot find module 'express'
→ Run: npm install (in backend directory)

Error: Cannot connect to MongoDB
→ Check MONGO_URI in .env
→ Ensure mongod is running (or use MongoDB Atlas)
```

### Frontend won't load
```
Error: vite not found
→ Run: npm install (in frontend directory)

Error: Cannot get http://localhost:5000/api
→ Ensure backend is running on port 5000
→ Check backend .env PORT=5000
```

### Gemini API errors
```
Error: Invalid API key
→ Check GEMINI_API_KEY in backend .env
→ Get new key from ai.google.dev

Error: Rate limited
→ Wait a few minutes
→ Check API usage in AI Studio
```

### CORS errors
```
Error: Access-Control-Allow-Origin
→ Backend CORS is enabled on *
→ Check frontend API URL matches backend URL
→ Ensure backend runs on :5000, frontend on :3000
```

---

## ✅ Pre-Launch Checklist

- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] MongoDB running (local or Atlas)
- [ ] Gemini API key in backend .env
- [ ] Both servers running in separate terminals
- [ ] Can access http://localhost:3000
- [ ] Can enter project goal
- [ ] Can click "Generate with AI"
- [ ] Tasks appear in 5-10 seconds
- [ ] No console errors

---

## 📊 File Count

```
Total files created: 25+
Backend files:       13
Frontend files:      12+
Documentation:       6

Code lines (backend): ~1,000
Code lines (frontend): ~500
Documentation lines: ~2,000+
```

---

## 🎓 Next Phase After Running

Once the basic flow works (Goal → Generate → Display):

1. **Add Auth** - Login/signup endpoints
2. **Save Projects** - Store to MongoDB
3. **Edit Tasks** - Update status/priority
4. **Delete** - Remove projects/tasks
5. **Deploy** - Push to Heroku + Vercel

(See ROADMAP.md for detailed checklist)

---

## 💡 Pro Tips

### Development
- Use Redux DevTools browser extension to debug state
- Use MongoDB Compass to visualize database
- Use Postman/Thunder Client to test API endpoints
- Keep backend & frontend terminals side-by-side

### Code Quality
- Commit after each working feature
- Write comments for complex logic
- Test manually before pushing
- Keep error messages user-friendly

### Deployment
- Deploy backend first
- Update frontend API URL for production
- Use environment-specific .env files
- Monitor logs after deployment

---

## 🚀 You're All Set!

Your Orchestra AI project is now:
✅ Fully scaffolded
✅ Well-documented
✅ Ready to extend
✅ Resume-ready

**Next step:** Follow QUICKSTART.md to set up and run the application!

---

**Questions?** Check the relevant documentation file above.
**Ready to code?** Start with Phase 2 in ROADMAP.md

**Good luck! 🎼🚀**
