# Senior Full-Stack Developer Assessment

This project serves as a coding assessment for senior full-stack developer candidates. It's designed to evaluate your ability to implement core functionality, make architectural decisions, and demonstrate your technical skills.

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
