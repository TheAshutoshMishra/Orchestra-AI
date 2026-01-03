# Orchestra AI - Quick Start Guide

## Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create a new API key
4. Copy it to your `.env` file in the backend folder

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
```bash
# On Windows, ensure MongoDB is installed and running
mongod
```

### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/orchestra-ai`
4. Add to backend `.env`

## Step 3: Backend Installation & Run

```bash
cd backend
npm install
npm run dev
```

Expected output:
```
MongoDB connected successfully
Orchestra AI Backend running on port 5000
```

Test with: `curl http://localhost:5000/api/health`

## Step 4: Frontend Installation & Run

```bash
cd frontend
npm install
npm run dev
```

Browser opens to `http://localhost:3000`

## Step 5: Test the Full Flow

1. **On Dashboard**: Enter project goal
   - Example: "Build a mobile coffee delivery app"

2. **Click "Generate with AI"**
   - Spinner shows loading state
   - Gemini API processes the request

3. **View Results**
   - AI-generated tasks appear as cards
   - Each task has priority badge
   - Shows 5-8 actionable items

## 📝 Environment Setup Checklist

### Backend (.env)
```
✓ MONGO_URI=mongodb://localhost:27017/orchestra-ai
✓ PORT=5000
✓ NODE_ENV=development
✓ JWT_SECRET=your-secret-key
✓ GEMINI_API_KEY=your-actual-api-key
```

### Frontend
- No .env needed for basic setup
- API calls to `http://localhost:5000/api`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env
- For Atlas, whitelist your IP address

### Gemini API Error
- Verify API key is valid
- Check API key in .env file
- Ensure rate limits not exceeded

### CORS Errors
- Backend CORS is enabled on `*`
- Ensure backend is running on port 5000
- Frontend expects backend at `http://localhost:5000`

### Vite Dev Server Issues
- Try: `npm run dev -- --port 3000`
- Check if port 3000 is already in use

## 📚 Next Steps After Getting Running

1. **Create Auth Routes** (login/signup endpoints)
2. **Save Projects to DB** (wire up "Create Project" button)
3. **Add Task Editor** (edit, mark complete, delete)
4. **Implement Subtasks** (expand/collapse nested tasks)
5. **User Dashboard** (view all projects)
6. **Deploy** (Heroku backend, Vercel frontend)

## 🚀 Deployment Quick References

### Deploy Backend to Heroku
```bash
heroku create orchestra-ai-backend
git push heroku main
# Set environment variables in Heroku dashboard
```

### Deploy Frontend to Vercel
```bash
npm run build
# Connect repo to Vercel (auto-deploys on push)
```

---

**Need help?** Check the main README.md for full documentation!
