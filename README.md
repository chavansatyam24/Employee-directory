# Employee Directory

A responsive Employee Directory application that allows users to create, view, update, delete, search, and browse employee records.

## Features

- Add new employees with name, email, and job role.
- View all employee records in a structured table.
- Edit existing employee information.
- Delete employee records.
- Search employees by name.
- Client-side pagination.
- Responsive and clean user interface.
- Form validation and duplicate email handling.

## Technology Stack

### Frontend
- React.js
- Vite
- Axios
- CSS
- Lucide React

### Backend
- Node.js
- Express.js
- Mongoose
- REST API

### Database
- MongoDB Atlas

> The original assignment specified PHP and MySQL. The backend and database were implemented using Node.js, Express, and MongoDB with the evaluator's approval.

## Project Structure

```text
employee-dir/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- MongoDB Atlas account or a MongoDB database

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd employee-dir
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your MongoDB connection string.

### 3. Start the backend

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:8000
```

API health check:

```text
http://localhost:8000/
```

### 4. Start the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend URL printed in your terminal, usually:

```text
http://localhost:5173
```

## REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Fetch all employees |
| GET | `/employees/:id` | Fetch one employee |
| POST | `/employees` | Create an employee |
| PUT | `/employees/:id` | Update an employee |
| DELETE | `/employees/:id` | Delete an employee |

### Employee Data Structure

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Software Developer"
}
```

## Database

Employee records are stored in MongoDB.

Each employee contains:

- `_id`: MongoDB document identifier
- `name`: Employee name
- `email`: Unique employee email
- `role`: Employee job role
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

## Notes

- Keep your `.env` file private.
- Never commit database credentials or API secrets.
- The search and pagination features are handled on the frontend.
- MongoDB Atlas must be accessible to the backend.

## Project Links

- **Live Application:** Add your deployed frontend URL here.
- **Backend API:** Add your deployed backend URL here.
- **GitHub Repository:** Add your repository URL here.

## Author

Satyam Chavan

