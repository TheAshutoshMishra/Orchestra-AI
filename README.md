# Orchestra AI - AI-Powered Project Management Tool

A full-stack MERN application that leverages Google's Gemini API to intelligently break down high-level project goals into actionable tasks and subtasks.

## 🎯 Features

- **AI-Powered Task Generation**: Input a project goal, and Gemini AI generates a complete task breakdown
- **Hierarchical Task Management**: Support for parent-child task relationships
- **Smart Task Prioritization**: AI-assigned priority levels (Low, Medium, High)
- **User Authentication**: JWT-based authentication with refresh tokens
- **Real-time UI Updates**: Redux Toolkit for state management
- **Beautiful Dashboard**: Tailwind CSS for modern, responsive design
- **MongoDB Integration**: Scalable NoSQL database with Mongoose ODM

## 📋 Project Structure

```
orchestra-ai/
├── backend/
│   ├── src/
│   │   ├── models/           # Mongoose schemas (User, Project, Task)
│   │   ├── controllers/      # Business logic handlers
│   │   ├── routes/           # API endpoint definitions
│   │   ├── services/         # Gemini API integration
│   │   ├── middleware/       # Auth & error handling
│   │   ├── config/           # Database connection
│   │   ├── utils/            # Helper utilities
│   │   └── server.js         # Express app entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/            # Page components (Dashboard)
    │   ├── components/       # Reusable UI components
    │   ├── redux/            # Redux slices & store
    │   ├── services/         # API client
    │   ├── styles/           # Tailwind CSS
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MongoDB (local or Atlas connection string)
- Google Gemini API Key

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```env
MONGO_URI=mongodb://localhost:27017/orchestra-ai
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

4. Start backend server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🔧 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, Redux Toolkit, Axios |
| **Backend** | Node.js, Express, Mongoose, JWT, bcrypt |
| **Database** | MongoDB |
| **AI** | Google Gemini 1.5 Pro |

## 📊 MongoDB Schemas

### User Schema
- `username`: String (unique)
- `email`: String (unique)
- `password`: String (hashed with bcrypt)
- `projectIds`: Array of Project ObjectIds
- `refreshTokens`: Array of token objects

### Project Schema
- `title`: String
- `description`: String
- `goal`: String (high-level project goal)
- `owner`: Reference to User
- `status`: Enum (planning, in-progress, completed)
- `estimatedTimeline`: String
- `breakdown`: Object with AI-generated insights
- `rootTasks`: Array of root Task ObjectIds

### Task Schema
- `projectId`: Reference to Project
- `parentTaskId`: Reference to parent Task (nullable)
- `title`: String
- `description`: String
- `priority`: Enum (Low, Medium, High)
- `status`: Enum (Todo, Doing, Done)
- `estimatedHours`: Number
- `estimatedDays`: Number
- `assignee`: String
- `dueDate`: Date
- `subtasks`: Array of child Task ObjectIds

## 🤖 Gemini AI Integration

The `geminiService.js` handles all AI interactions:

- **generateProjectTasks()**: Breaks down a goal into 5-8 actionable tasks
- **generateProjectBreakdown()**: Provides strategic analysis (milestones, risks, technologies)

Both functions return structured JSON with comprehensive error handling.

## 📡 API Endpoints

### Projects
- `POST /api/projects/generate-tasks` - Generate tasks from goal
- `POST /api/projects` - Create new project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get project details

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/project/:projectId` - Get project tasks
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎨 UI Components

### Dashboard
- Project goal input field
- "Generate with AI" button
- Loading spinner during API calls
- Task card display with priority badges
- Next steps guidance

### TaskCard
- Task number
- Title and description
- Priority badge (color-coded)
- Hover effects

### LoadingSpinner
- Animated spinner
- Status message

## 🛡️ Authentication

- JWT tokens for stateless authentication
- Refresh token rotation for security
- Password hashing with bcrypt
- Protected routes with middleware

## 📈 Future Enhancements

- [ ] Advanced task editor with drag-drop reordering
- [ ] Subtask creation from main tasks
- [ ] User collaboration features
- [ ] Project timeline visualization (Gantt chart)
- [ ] Task dependencies
- [ ] Recurring task templates
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Dark mode toggle
- [ ] Export to PDF/CSV

## 🧪 Testing

(To be implemented)
- Unit tests with Jest
- Integration tests for API endpoints
- E2E tests with Cypress

## 📝 Resume Highlights

This project demonstrates:
- ✅ Full MERN stack expertise
- ✅ AI/ML integration (Gemini API)
- ✅ Scalable architecture (services, controllers, models)
- ✅ State management (Redux Toolkit)
- ✅ JWT authentication & authorization
- ✅ MongoDB hierarchical data modeling
- ✅ RESTful API design
- ✅ Error handling & validation
- ✅ Modern UI/UX with Tailwind CSS
- ✅ Responsive design principles

## 📄 License

MIT

---

**Built with ❤️ using MERN Stack & Google Gemini AI**
