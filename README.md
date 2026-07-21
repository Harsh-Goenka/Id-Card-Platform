# ID Card Generation Platform

A full-stack MERN application for designing and generating high-quality, print-ready ID cards in bulk. The platform allows users to upload spreadsheet data and images, design reusable templates through a visual editor, and generate personalized ID cards using a multi-threaded rendering pipeline.

**Live Demo:** https://cardengine.site
---

## Features

* Secure user authentication with JWT and refresh tokens
* Create and manage multiple ID card projects
* Visual drag-and-drop template editor
* Dynamic field mapping from Excel data
* Upload Excel datasets and ZIP archives of profile photos
* Front and back card template support
* Automatic layout autosave
* Parallel image generation using Node.js Worker Threads
* Print-ready image exports packaged as ZIP files
* Input validation with Zod
* Password hashing with bcrypt
* Secure API using Helmet, CORS, and HTTP-only cookies
* Global error handling and request ID middleware

---

## Tech Stack

### Frontend

* React
* React Router
* Redux Toolkit
* Tailwind CSS
* Konva
* Axios
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Zod
* Worker Threads

### Image Processing

* Node Canvas
* Sharp

---

## Workflow

1. Create a new project.
2. Upload card templates, Excel data, and profile photos.
3. Design the ID card using the visual editor.
4. Map template elements to spreadsheet columns.
5. Generate personalized ID cards in parallel using Worker Threads.
6. Download the generated images as a ZIP archive.

---

## Project Structure

```text
├── frontend
│   ├── src
│   ├── public
│   └── ...
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── middleware
│   │   ├── modules
│   │   ├── services
│   │   ├── workers
│   │   └── utils
│   └── storage
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Harsh-Goenka/Id-Card-Platform
cd Id-Card-Platform
```

### Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
```

---

## Run the Application

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

Open your browser at:

```text
http://localhost:5173
```

---


