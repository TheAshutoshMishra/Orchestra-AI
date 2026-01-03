# Orchestra AI - Architecture Deep Dive

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Port 3000)                   │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │            Dashboard Component                      │ │ │
│  │  │  ┌─────────────────────────────────────────────┐   │ │ │
│  │  │  │  Input: Project Goal                        │   │ │ │
│  │  │  │  Button: Generate with AI                   │   │ │ │
│  │  │  │  Display: Task Cards (Tailwind Styled)      │   │ │ │
│  │  │  └─────────────────────────────────────────────┘   │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │          Redux Store (State Management)             │ │ │
│  │  │  ├── projectSlice (async thunks)                   │ │ │
│  │  │  ├── taskSlice (coming)                            │ │ │
│  │  │  └── authSlice (coming)                            │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │       Axios API Client (services/api.js)            │ │ │
│  │  │  ├── projectAPI.generateTasks()                    │ │ │
│  │  │  ├── projectAPI.createProject()                    │ │ │
│  │  │  ├── taskAPI.createTask()                          │ │ │
│  │  │  └── authAPI.login()                               │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────┬──────────────────────────────────────────────────┘
              │
              │ HTTP Requests
              │ (JSON over HTTPS)
              │
┌─────────────▼──────────────────────────────────────────────────┐
│                     NETWORK LAYER                              │
│               Axios + CORS Enabled                            │
└─────────────┬──────────────────────────────────────────────────┘
              │
              │
┌─────────────▼──────────────────────────────────────────────────┐
│                  Express Server (Port 5000)                   │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              Middleware Stack                            │ │
│  │  ├── CORS Handler                                        │ │
│  │  ├── Body Parser (JSON)                                 │ │
│  │  ├── Auth Middleware (JWT Verification)                │ │
│  │  └── Error Handler                                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              Routes Layer                                │ │
│  │  ├── POST /api/projects/generate-tasks                 │ │
│  │  ├── POST /api/projects                                │ │
│  │  ├── GET /api/projects                                 │ │
│  │  └── GET /api/projects/:id                             │ │
│  └────────┬──────────────────────────────────────┬─────────┘ │
│           │                                      │           │
│  ┌────────▼──────────────────┐    ┌─────────────▼──────┐   │
│  │  Controllers Layer         │    │  Services Layer    │   │
│  │  ├── projectController.js  │    │  ├── geminiService │   │
│  │  └── taskController.js     │    │  └── authService   │   │
│  └────────┬──────────────────┘    └─────────────┬──────┘   │
│           │                                      │           │
│           └────────────┬───────────────────────┬┘           │
│                        │                       │            │
│           ┌────────────▼──────┐    ┌──────────▼─────────┐  │
│           │  Models (Schemas) │    │  Gemini API Call   │  │
│           │  ├── User.js      │    │  (External Service)│  │
│           │  ├── Project.js   │    │                    │  │
│           │  └── Task.js      │    └────────┬───────────┘  │
│           └────────┬───────────┘             │              │
│                    │                        │              │
└────────────────────┼────────────────────────┼───────────────┘
                     │                        │
         ┌───────────▼───────────┐   ┌────────▼──────────────┐
         │   MongoDB Database    │   │  Google Gemini API   │
         │  ├── Users           │   │  (Cloud Service)      │
         │  ├── Projects        │   │                       │
         │  └── Tasks           │   │  • Processes goals    │
         │                       │   │  • Returns JSON      │
         │  (Schemas with refs)  │   │  • Structured output │
         └───────────────────────┘   └──────────────────────┘
```

---

## Request-Response Flow: Task Generation

```
User Interface
    ↓
1. User types goal: "Build a mobile coffee delivery app"
    ↓
2. User clicks "Generate with AI" button
    ↓
Dashboard Component
    ├── Set state: loading = true
    ├── Disable input & button
    └── Show LoadingSpinner
    ↓
Redux Action
    ├── Dispatch: generateProjectTasks(goal)
    └── Calls API: projectAPI.generateTasks(goal)
    ↓
API Client (Axios)
    ├── POST request to: http://localhost:5000/api/projects/generate-tasks
    ├── Headers: { Content-Type: application/json }
    └── Body: { goal: "Build a mobile coffee delivery app" }
    ↓
Express Server
    ├── Route match: POST /api/projects/generate-tasks
    └── Controller: generateProjectBreakdownController(req, res)
    ↓
Gemini Service
    ├── Create prompt:
    │   "Break down this project goal: [goal] into 5-8 
    │    actionable tasks in JSON format.
    │    Return keys: title, description, priority"
    ├── Call: model.generateContent(prompt)
    └── Parse response JSON
    ↓
Gemini 1.5 Pro API (External)
    ├── Receives prompt
    ├── Generates response:
    │   [
    │     { "title": "Design Architecture", ... },
    │     { "title": "Set up Database", ... },
    │     ...
    │   ]
    └── Returns as text
    ↓
Gemini Service (continued)
    ├── Extract JSON using regex
    ├── Parse JSON.parse()
    ├── Validate structure
    │   └── Check: title, description, priority exist
    └── Return tasks array
    ↓
Express Controller
    ├── Receive tasks from service
    ├── Build response:
    │   {
    │     "success": true,
    │     "tasks": [...],
    │     "breakdown": {...}
    │   }
    └── res.status(200).json(response)
    ↓
API Client (Axios)
    ├── Receive response (200 OK)
    └── Return parsed JSON
    ↓
Redux Action
    ├── Dispatch success: 
    │   state.generatedTasks = action.payload.tasks
    └── Set loading = false
    ↓
Dashboard Component
    ├── Read from Redux: generatedTasks
    ├── Hide LoadingSpinner
    ├── Enable input & button
    └── Map tasks array → render TaskCard components
    ↓
UI Rendering
    ├── Task Card 1: Design Architecture
    ├── Task Card 2: Set up Database
    ├── Task Card 3: ... (up to 8)
    └── Display with priority badges & styling
    ↓
User sees complete task breakdown! ✅
```

---

## Data Model Relationships

```
User Document
{
  _id: ObjectId("user123"),
  username: "alex_dev",
  email: "alex@example.com",
  password: "hashed_bcrypt_...",
  projectIds: [                    ← References to Projects
    ObjectId("project1"),
    ObjectId("project2")
  ],
  createdAt: Date,
  updatedAt: Date
}

        ↓ owns
        
Project Document
{
  _id: ObjectId("project1"),
  title: "Coffee Delivery App",
  goal: "Build a mobile coffee delivery app",
  owner: ObjectId("user123"),    ← Reference to User
  status: "planning",
  estimatedTimeline: "8 weeks",
  breakdown: {
    summary: "A mobile app for...",
    keyMilestones: [...],
    riskFactors: [...],
    technologies: [...]
  },
  rootTasks: [                   ← References to root Tasks
    ObjectId("task1"),
    ObjectId("task2"),
    ObjectId("task3")
  ],
  createdAt: Date,
  updatedAt: Date
}

        ↓ contains
        
Task Document (Root Task)
{
  _id: ObjectId("task1"),
  projectId: ObjectId("project1"),  ← Reference to Project
  parentTaskId: null,               ← null = root task
  title: "Design App Architecture",
  description: "Create system design...",
  priority: "High",
  status: "Todo",
  subtasks: [                       ← References to child Tasks
    ObjectId("subtask1.1"),
    ObjectId("subtask1.2")
  ],
  order: 0,
  createdAt: Date
}

        ↓ contains
        
Task Document (Subtask)
{
  _id: ObjectId("subtask1.1"),
  projectId: ObjectId("project1"),  ← Same project
  parentTaskId: ObjectId("task1"),  ← Reference to parent
  title: "Decide on tech stack",
  description: "Choose React...",
  priority: "High",
  status: "Todo",
  subtasks: [],                     ← Can have own children
  order: 0,
  createdAt: Date
}
```

---

## Component Hierarchy

```
App.jsx (Root)
    │
    └── Dashboard.jsx (Main Page)
            │
            ├── Input Section
            │   ├── Label: "What do you want to build?"
            │   ├── Input[type="text"]
            │   └── Button: "Generate with AI"
            │
            ├── LoadingSpinner.jsx (Conditional)
            │   ├── Animated spinner
            │   └── "Generating tasks..." text
            │
            ├── Error Display (Conditional)
            │   ├── Error message
            │   └── Dismiss button
            │
            └── Task Display (Conditional)
                ├── Results header
                ├── TaskCard[] (Array mapped)
                │   ├── Task number badge
                │   ├── Task title
                │   ├── Task description
                │   ├── Priority badge
                │   └── Hover effects
                └── Next steps guidance
```

---

## State Management Flow (Redux)

```
Redux Store
    │
    └── projects slice
            │
            ├── State:
            │   ├── items: []            (all projects)
            │   ├── loading: false       (fetching?)
            │   ├── error: null          (error message)
            │   ├── generatedTasks: []   (from AI)
            │   └── currentProject: null
            │
            ├── Reducers (sync):
            │   ├── clearError()         (reset error)
            │   └── resetGeneratedTasks()
            │
            └── Extra Reducers (async):
                ├── generateProjectTasks.pending
                │   └── loading = true
                ├── generateProjectTasks.fulfilled
                │   └── generatedTasks = action.payload.tasks
                ├── generateProjectTasks.rejected
                │   └── error = action.payload
                ├── createProject actions...
                └── fetchProjects actions...

Component accesses:
    const { loading, generatedTasks, error } = 
        useSelector(state => state.projects)

Component dispatches:
    dispatch(generateProjectTasks(goal))
```

---

## API Endpoints & Request Structure

### POST /api/projects/generate-tasks
```javascript
Request:
POST http://localhost:5000/api/projects/generate-tasks
Content-Type: application/json

{
  "goal": "Build a mobile coffee delivery app"
}

Response (200 OK):
{
  "success": true,
  "tasks": [
    {
      "title": "Design Database Schema",
      "description": "Create MongoDB models for users, orders, stores...",
      "priority": "High"
    },
    {
      "title": "Set up Authentication",
      "description": "Implement JWT-based auth with refresh tokens...",
      "priority": "High"
    },
    {
      "title": "Create REST API Endpoints",
      "description": "Build endpoints for user, order, delivery...",
      "priority": "High"
    },
    {
      "title": "Design UI/UX Mockups",
      "description": "Create wireframes and high-fidelity designs...",
      "priority": "Medium"
    },
    {
      "title": "Implement Frontend with React",
      "description": "Build components for dashboard, orders...",
      "priority": "High"
    }
  ],
  "breakdown": {
    "summary": "A mobile app enabling users to order coffee...",
    "estimatedTimeline": "12-16 weeks",
    "keyMilestones": [
      "MVP with basic ordering",
      "Payment integration",
      "Real-time delivery tracking"
    ],
    "riskFactors": [
      "Real-time synchronization complexity",
      "Payment gateway integration challenges"
    ],
    "technologies": [
      "React Native/Flutter",
      "Node.js/Express",
      "MongoDB",
      "Firebase for notifications"
    ]
  }
}
```

---

## Error Handling Flow

```
User Action
    ↓
Try-Catch Block
    ├── Success Path → return data
    └── Error Path
            ↓
        Catch Error
            ├── Log error details
            └── Return error message
                    ↓
            Redux Reducer
                ├── state.loading = false
                └── state.error = error message
                    ↓
            Component
                ├── useSelector reads error state
                └── Render error message UI
                    ├── Red alert box
                    ├── Error message text
                    └── Dismiss button
                        └── dispatch(clearError())
```

---

## Security Features

```
Authentication:
├── Password hashing (bcrypt)
│   └── User.password never stored as plaintext
├── JWT tokens
│   ├── Short-lived (15 min)
│   └── Refresh tokens (7 days)
└── Token validation middleware
    └── Checks Authorization header

Authorization:
├── Protected routes (require auth)
├── User ownership verification
│   └── Can only access own projects
└── CORS enabled (frontend only)

Data Validation:
├── Email format validation
├── Required field checks
├── Type validation
└── Schema validation (Mongoose)

API Safety:
├── Input sanitization
├── Error message safety (no SQL expose)
└── Rate limiting (can be added)
```

---

## Performance Considerations

```
Frontend:
├── Component lazy loading (future)
├── Redux state caching
├── Memoization for expensive renders
└── CSS-in-JS with Tailwind

Backend:
├── MongoDB indexing
│   ├── Index on userId
│   └── Index on projectId
├── Pagination support (future)
├── Connection pooling
└── Async/await for non-blocking

Network:
├── Gzip compression
├── Minified bundles (Vite build)
├── Only send necessary fields
└── HTTP/2 support
```

---

This architecture is **production-ready** and **scalable**! 🚀
