<<<<<<< HEAD
# Team SPD - Member Management Application

## Project Description
This is a full-stack student team members management application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to view, add, and manage team members, showcasing functional modern web design with interactive elements and RESTful API integration.

## Installation Steps
1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-link>
   cd "fullstack -assignment"
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Ensure you have MongoDB installed and running locally, or have configured a `.env` file with `MONGODB_URI`.

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

## How to Run the App
**Run Backend:**
Open a terminal inside the `backend` directory and run:
```bash
npm run dev
```
*(Alternatively, run `node server.js`)*. The backend will run on `http://localhost:5000`.

**Run Frontend:**
Open another terminal inside the `frontend` directory and run:
```bash
npm run dev
```
Vite will start the fast development server (usually on `http://localhost:5173`). Open the browser to the provided link to view the application.

## API Endpoints
All API endpoints are prefixed with `http://localhost:5000`

- `POST /api/members`: Add a new team member. Accepts `multipart/form-data` with fields like name, rollNumber, and an optional `image` file. Let the backend process the image upload using Multer and save the member data to MongoDB.
- `GET /api/members`: Fetch a list of all team members stored in MongoDB.
- `GET /api/members/:id`: Fetch detailed information about a single team member using their unique ID.
=======
# Team-SPD
>>>>>>> b65d7b4f43ad0cbc1092c7891f3247f9c60e0cd1
