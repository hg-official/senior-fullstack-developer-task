# Senior Full-Stack Developer Assessment

## Introduction

Hello! If you are viewing this repository you are probably a candidate for HyperGuest senior fullstack developer, congrats!

### Before we begin, a few important notes please!

- Any AI tool is forbidden during this task. We already know Github copilot is a great tool, we don't need to test it :)
- This task is designated to test your problem-solving skills, still, code quality do matters! submit a code you would like to read as well

### At your sumption please include the next things

- write a clear explanation of your implementation.
- suggest improvements! the code in this repository is not perfect, what would you do differently?
- Do not PR to this repo! please fork this repo and create your own PR to the forked copy ;)

Good luck!

## Project Overview

This is a full-stack application with the following tech stack:

- Backend: Node.js with TypeScript, Express, and TypeORM
- Frontend: React with TypeScript
- Database: SQLite (for simplicity and quick setup)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

   - Copy `.env.example` to `.env` in the backend directory
   - No additional database setup is required as we're using SQLite

4. Run the database migrations

```bash
# Run typeorm migrations
npm run migration:run
```

5. Start the development servers:

```bash
# Start backend server (from backend directory)
npm run start:dev

# Start frontend server (from frontend directory)
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
├── backend/                 # Backend application
│   ├── src/                # Source code
│   ├── database.sqlite     # SQLite database file
│   └── package.json        # Backend dependencies
├── frontend/               # Frontend application
│   ├── src/               # Source code
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## Assessment Focus

This assessment evaluates your ability to:

- Implement core business logic
- Design and implement APIs
- Structure and organize code
- Handle database operations
- Integrate frontend and backend
- Solve technical challenges

## Important Notes

- The project uses SQLite for simplicity and quick setup
- Authentication is intentionally simplified for this assessment
- Focus on implementing the required functionality rather than adding complex security features
- The database will be automatically created when you first run the application

## Available Scripts

### Backend

- `npm run start:dev` - Start the development server
- `npm run build` - Build the application
- `npm run typeorm` - Run TypeORM CLI commands
- `npm run migration:generate` - Generate a new migration
- `npm run migration:run` - Run pending migrations

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run preview` - Preview the production build

## Assessment Tasks

Your task is to implement the following changes:

1. User Role Management:

   - The current system only supports a single role per user
   - The application needs to support multiple roles for a single user

2. User Status Enhancement:

   - The current status field is a simple boolean
   - The system needs to support more granular user status options: `Enabled`, `Disabled`,`Deleted`.

3. Update both server and client code to support these changes

4. Implement authorization check:

   - Server should return unauthorized (401) if user's status is `Deleted`

5. Client-side Implementation Requirements:
   - All HTTP requests and data management must be handled through Vuex state management
   - Implement route guards for role-based access:
     - Home page: accessible to all users (regular/editor/admin)
     - Editor page: accessible only to editors and admin users
     - Admin page: accessible only to admin users
   - Display the username after "Welcome" message on each page

⚠️ Note: Any database schema changes must be implemented through migration files.

## ✨ Bonus Assignment

Enhance the user interface by redesigning the navigation bar:

- You can use third-party UI libraries such as Vuetify
- The design should be modern and user-friendly
- Feel free to add any additional UI improvements you think would enhance the user experience
