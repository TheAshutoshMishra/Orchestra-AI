# Orchestra AI - Complete File Structure

## Full Project Layout

```
orchestra-ai/ (root directory)
│
├── 📄 README.md                          [Main project documentation]
├── 📄 QUICKSTART.md                      [Setup & run instructions]
├── 📄 IMPLEMENTATION_SUMMARY.md           [What's been built]
├── 📄 ARCHITECTURE.md                    [System architecture & flows]
├── 📄 .gitignore                         [Git ignore patterns]
│
├── 📁 backend/
│   │
│   ├── 📄 package.json                   [Dependencies: express, mongoose, dotenv, cors, etc.]
│   ├── 📄 .env                           [Environment variables]
│   │
│   └── 📁 src/
│       │
│       ├── 📄 server.js                  [Express app, middleware setup, route imports]
│       │
│       ├── 📁 config/
│       │   └── 📄 db.js                  [MongoDB connection setup]
│       │
│       ├── 📁 models/
│       │   ├── 📄 User.js                [User schema with bcrypt password hashing]
│       │   ├── 📄 Project.js             [Project schema with AI breakdown fields]
│       │   └── 📄 Task.js                [Task schema with parent-child relationships]
│       │
│       ├── 📁 controllers/
│       │   ├── 📄 projectController.js   [generateTasks, createProject, getProjects, etc.]
│       │   └── (taskController.js - planned)
│       │
│       ├── 📁 routes/
│       │   ├── 📄 projects.js            [POST/GET /api/projects endpoints]
│       │   └── 📄 tasks.js               [POST/GET /api/tasks endpoints]
│       │
│       ├── 📁 services/
│       │   ├── 📄 geminiService.js       [Gemini API integration, task generation]
│       │   └── (authService.js - planned)
│       │
│       ├── 📁 middleware/
│       │   ├── 📄 auth.js                [JWT token verification]
│       │   └── (errorHandler.js - planned)
│       │
│       └── 📁 utils/
│           └── (tokenUtils.js - planned)
│
│
└── 📁 frontend/
    │
    ├── 📄 package.json                   [Dependencies: react, vite, tailwind, redux, axios]
    ├── 📄 index.html                     [HTML entry point]
    ├── 📄 vite.config.js                 [Vite build configuration]
    ├── 📄 tailwind.config.js             [Tailwind CSS theming]
    ├── 📄 postcss.config.js              [CSS post-processing]
    │
    └── 📁 src/
        │
        ├── 📄 main.jsx                   [React & Redux Provider setup]
        ├── 📄 App.jsx                    [Root app component]
        │
        ├── 📁 pages/
        │   ├── 📄 Dashboard.jsx          [Main dashboard with input & task display]
        │   └── (ProjectDetails.jsx - planned)
        │
        ├── 📁 components/
        │   ├── 📄 TaskCard.jsx           [Individual task card component]
        │   ├── 📄 LoadingSpinner.jsx     [Loading animation component]
        │   └── (TaskList.jsx - planned)
        │
        ├── 📁 redux/
        │   ├── 📄 projectSlice.js        [Redux slice with async thunks]
        │   ├── 📄 store.js               [Redux store configuration]
        │   └── (taskSlice.js - planned)
        │
        ├── 📁 services/
        │   └── 📄 api.js                 [Axios instance & API methods]
        │
        └── 📁 styles/
            └── 📄 index.css              [Global styles with Tailwind]
```

---

## File Descriptions

### Root Level Files

#### README.md (500+ lines)
- Project overview and goals
- Features list with checkmarks
- Tech stack table
- MongoDB schema documentation
- API endpoint reference
- Component descriptions
- Authentication details
- Future enhancements
- Resume highlights

#### QUICKSTART.md (200+ lines)
- Step-by-step setup instructions
- Gemini API key retrieval guide
- MongoDB setup (local and Atlas)
- Backend installation & run
- Frontend installation & run
- Testing the full flow
- Environment setup checklist
- Troubleshooting guide
- Deployment references
- Next steps

#### IMPLEMENTATION_SUMMARY.md (400+ lines)
- Summary of what's been built
- Complete file breakdown
- Feature checklist (all complete)
- Data flow example
- How to run instructions
- Application flow diagram
- Resume-worthy features
- Next steps for development
- File count & structure

#### ARCHITECTURE.md (500+ lines)
- System architecture diagram (ASCII art)
- Request-response flow with steps
- Data model relationships (with ObjectId examples)
- Component hierarchy tree
- Redux state management flow
- API request/response structures
- Error handling flow
- Security features breakdown
- Performance considerations

---

### Backend Files

#### server.js (40 lines)
```javascript
- dotenv configuration
- MongoDB connection
- CORS middleware
- JSON body parser
- Project and Task routes
- Error handling middleware
- Server listen on port 5000
```

#### config/db.js (15 lines)
```javascript
- MongoDB connection with mongoose
- Connection options
- Error handling
- Console logging
```

#### models/User.js (50 lines)
```javascript
Schema fields:
- username (unique, required)
- email (unique, validated)
- password (bcrypt hashed)
- projectIds (array of refs)
- refreshTokens (array)

Methods:
- comparePassword() async method
- Pre-save hook for password hashing
```

#### models/Project.js (50 lines)
```javascript
Schema fields:
- title, description, goal
- owner (User ref)
- status enum
- estimatedTimeline
- aiSummary, breakdown object
- rootTasks (Task refs)

Timestamps: createdAt, updatedAt
```

#### models/Task.js (70 lines)
```javascript
Schema fields:
- projectId (Project ref)
- parentTaskId (Task ref - nullable)
- title, description
- priority enum (Low, Medium, High)
- status enum (Todo, Doing, Done)
- estimatedHours, estimatedDays
- assignee, dueDate
- subtasks (Task refs array)
- order for sorting
```

#### controllers/projectController.js (120 lines)
```javascript
Functions:
1. generateProjectBreakdownController
   - Receives goal from frontend
   - Calls geminiService twice
   - Returns tasks & breakdown

2. createProject
   - Creates Project document
   - Creates Task documents
   - Links to User

3. getUserProjects
   - Queries Project.find()
   - Filters by owner

4. getProjectById
   - Populates rootTasks
   - Returns full project
```

#### services/geminiService.js (120 lines)
```javascript
Function 1: generateProjectTasks(goal)
- Creates structured prompt
- Calls Gemini 1.5 Pro
- Parses JSON response
- Validates structure
- Returns tasks array

Function 2: generateProjectBreakdown(goal)
- Creates analysis prompt
- Calls Gemini API
- Returns breakdown object
- Error handling on both

Error handling:
- JSON.parse catch
- Field validation
- Meaningful error messages
```

#### routes/projects.js (20 lines)
```javascript
POST /api/projects/generate-tasks
  └── generateProjectBreakdownController

POST /api/projects
  └── authenticate middleware
  └── createProject

GET /api/projects
  └── authenticate middleware
  └── getUserProjects

GET /api/projects/:id
  └── authenticate middleware
  └── getProjectById
```

#### routes/tasks.js (20 lines)
```javascript
POST /api/tasks
GET /api/tasks/project/:projectId
PUT /api/tasks/:id
DELETE /api/tasks/:id

(Skeleton placeholders for now)
```

#### middleware/auth.js (15 lines)
```javascript
authenticate middleware:
- Extract token from header
- Verify token (placeholder)
- Set req.user
- Pass to next middleware
```

---

### Frontend Files

#### package.json (30 lines)
```
Dependencies:
- react@18.2.0
- react-dom@18.2.0
- @reduxjs/toolkit@1.9.7
- react-redux@8.1.3
- axios@1.6.0
- tailwindcss@3.3.0
- vite@5.0.0

Scripts:
- npm run dev
- npm run build
- npm run preview
```

#### index.html (15 lines)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="..." />
    <title>Orchestra AI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### main.jsx (15 lines)
```javascript
- React.StrictMode wrapper
- Redux Provider
- Store import
- CSS import
- ReactDOM.createRoot(App)
```

#### App.jsx (10 lines)
```javascript
- Simple wrapper
- Renders <Dashboard />
```

#### pages/Dashboard.jsx (180 lines)
```javascript
Main component features:
- State: goal (input), loading, error
- Redux dispatch: generateProjectTasks
- Form submission handler
- Input disabled during loading
- Conditional rendering:
  - LoadingSpinner
  - Error message
  - TaskCard array
  - Empty state
- Reset button
- Gradient background (Tailwind)
- Professional layout
```

#### components/TaskCard.jsx (40 lines)
```javascript
Props:
- task object (title, description, priority)
- index number

Display:
- Numbered badge
- Task title & description
- Priority badge (color-coded)
- Hover effects
- Tailwind styling
```

#### components/LoadingSpinner.jsx (20 lines)
```javascript
Display:
- Animated spinning border
- "Generating tasks..." text
- Centered layout
- Tailwind classes
```

#### redux/projectSlice.js (100 lines)
```javascript
State:
- items (all projects)
- loading, error
- currentProject
- generatedTasks

Reducers:
- clearError()
- resetGeneratedTasks()

Async Thunks:
- generateProjectTasks(goal)
- createProject(data)
- fetchProjects()

Extra Reducers:
- .pending → loading true
- .fulfilled → update state
- .rejected → set error
```

#### redux/store.js (10 lines)
```javascript
- configureStore()
- projectReducer
- Export store
```

#### services/api.js (80 lines)
```javascript
Axios instance:
- baseURL: http://localhost:5000/api
- Headers: application/json

Interceptors:
- Request: add JWT token
- Response: handle errors

API Objects:
projectAPI:
  - generateTasks(goal)
  - createProject(data)
  - getProjects()
  - getProjectById(id)
  - updateProject(id, data)
  - deleteProject(id)

taskAPI:
  - createTask(data)
  - getTasksByProject(projectId)
  - updateTask(id, data)
  - deleteTask(id)

authAPI:
  - register(userData)
  - login(credentials)
  - logout()
  - refreshToken()
```

#### styles/index.css (20 lines)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

Global styles:
- Reset margins/padding
- Font family setup
- Box-sizing
```

#### vite.config.js (20 lines)
```javascript
- React plugin
- Dev server on port 3000
- Auto open browser
- Sourcemap disabled for prod
```

#### tailwind.config.js (20 lines)
```javascript
- Content files paths
- Custom colors (primary, secondary)
- Plugin configuration
```

#### postcss.config.js (10 lines)
```javascript
- Tailwind CSS plugin
- Autoprefixer plugin
```

---

## Summary Statistics

```
Total Files Created:         25+
Total Lines of Code:         ~3,500+
Backend Files:               13
Frontend Files:              12+
Documentation Files:         4

Code Organization:
├── Clean separation of concerns
├── Service layer for business logic
├── Component-based frontend
├── Redux for state management
├── Proper error handling
└── Scalable architecture

Resume Impact:
✅ Full MERN stack
✅ AI integration
✅ Database design
✅ API development
✅ Modern UI/UX
✅ Code organization
✅ Error handling
✅ Documentation
```

---

## Quick Navigation Guide

### If you want to understand...

**The Application Flow:**
→ Read IMPLEMENTATION_SUMMARY.md → See "Application Flow" section

**How Data Moves:**
→ Read ARCHITECTURE.md → See "Request-Response Flow"

**Database Design:**
→ Read README.md → See "MongoDB Schemas" section

**System Components:**
→ Read ARCHITECTURE.md → See "System Architecture" ASCII diagram

**How to Run It:**
→ Read QUICKSTART.md → Follow step-by-step

**Code Details:**
→ Check individual files in backend/src and frontend/src

**Next Steps:**
→ Read IMPLEMENTATION_SUMMARY.md → See "Next Steps (What You Can Build)"

---

**Everything is organized, documented, and ready to extend!** 🎉
