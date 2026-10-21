# EduCloud — Cloud Learning Platform

EduCloud is a web-based learning platform focused on AWS cloud services, Linux, DevOps, and programming fundamentals.

## Tech Stack

- React 19
- Vite 8
- JavaScript (ES Modules)
- Oxlint

## Features

- Course listings for cloud and programming topics
- AWS service learning content
- Additional course lessons
- API integration configured through environment variables

## Getting Started

### Prerequisites

- Node.js compatible with the installed Vite version
- npm

### Install dependencies

    npm install

### Configure environment

Create a local `.env` file if API configuration is needed:

    VITE_API_URL=http://localhost:YOUR_BACKEND_PORT

Replace the example value with your actual backend API URL. Do not commit `.env` files or secrets.

### Run locally

    npm run dev

### Build for production

    npm run build

### Lint

    npm run lint

### Preview production build

    npm run preview

## Project Structure

    src/
      App.jsx
      App.css
      ExtraCourseLesson.jsx
      ExtraCourseLesson.css
      extraLessons.js
      index.css
      main.jsx
    public/
      icons and lesson assets

## Environment Variables

- `VITE_API_URL` — API base URL used by the frontend.

Only expose values through `VITE_*` variables if they are safe for public browser access. Never put private keys, database passwords, or backend secrets in frontend environment variables.

## Repositories

- Frontend: https://github.com/piyush-319/educloud-frontend
- Backend: https://github.com/piyush-319/educloud-backend

## Notes

Deployment architecture and production infrastructure details will be documented after verification.
