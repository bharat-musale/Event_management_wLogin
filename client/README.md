# Event Management Application

A full-stack MERN application for managing events with user authentication.




## login instructuions
use email 1   abc@gmail.com 
    password  asdf12
    email 2  abc@pqr.com
    password asdf12


## Features

- User authentication (JWT)
- Create, Read, Update, Delete events
- Responsive UI
- Form validation
- Public event viewing
- Protected routes for event management

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
event-management/
├── client/             # React frontend
└── server/             # Node.js backend
```

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```
3. Create a .env file in the server directory with your MongoDB URI and JWT secret
4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## API Endpoints

- GET /api/events - Fetch all events
- GET /api/events/:id - Fetch specific event
- POST /api/events - Create new event
- PUT /api/events/:id - Update event
- DELETE /api/events/:id - Delete event
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
