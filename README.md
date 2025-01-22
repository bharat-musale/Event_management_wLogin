# Event Management Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing events. Users can create, view, edit, and delete events with authentication.

## login instructuions
use email 1   abc@gmail.com 
    password  asdf12
    email 2  abc@pqr.com
    password asdf12


## Features

- User Authentication (Register/Login)
- Create and manage events
- View event details
- Edit and delete events
- Responsive design
- Role-based access control (organizers can only edit/delete their own events)

## Technology Stack

### Frontend

- **React.js** (v18.x) - JavaScript library for building user interfaces
- **Material-UI (MUI)** (v5.x) - React UI framework for implementing Material Design
  - `@mui/material` - Core Material-UI components
  - `@mui/icons-material` - Material Design icons
  - `@emotion/react` & `@emotion/styled` - CSS-in-JS styling solution
- **React Router** (v6.x) - Client-side routing
- **Axios** - HTTP client for API requests
- **date-fns** - Modern JavaScript date utility library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
  - `express-validator` - Middleware for request validation
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool
- **JSON Web Token (jsonwebtoken)** - Authentication implementation
- **bcryptjs** - Password hashing
- **cors** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variables management

## Project Structure

```
project-root/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── context/       # React Context providers
│       ├── pages/         # Page components
│       ├── services/      # API service layer
│       └── App.js         # Root component
└── server/                # Backend Node.js application
    ├── controllers/       # Request handlers
    ├── middleware/        # Custom middleware
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── server.js         # Entry point
```



## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)

## Database Schema

### User Model

```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Model

```javascript
{
  title: String (required),
  description: String (required),
  date: Date (required),
  location: String (required),
  organizerName: String (required),
  organizer: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create `.env` file in server directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the application:
   ```bash
   # Start server (from server directory)
   npm start

   # Start client (from client directory)
   npm start
   ```

