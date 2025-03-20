# Netflix Clone

## Introduction
Congratulations on reaching the Module Clearance Test! This assessment evaluates your skills in frontend and backend development, as well as collaboration using GitHub. The project involves building a **Netflix Clone**, a professional networking platform with collaborative features and appropriate API integration.

## Live Link
[Netflix Clone](https://netflix-clone-lake-five-14.vercel.app/)

## Project Features
- User authentication (Signup/Login) using JWT
- Movie search and recommendations using OMDb API and RapidAPI
- Video streaming with React Player
- Responsive UI with Tailwind CSS
- State management with Redux Toolkit and Zustand
- Secure backend with Express, MongoDB, and bcryptjs
- Cookie-based authentication using cookie-parser
- Environment variables managed with dotenv
- API calls handled with Axios
- Cross-Origin Resource Sharing (CORS) enabled for security

## Technologies Used
### Frontend
- React 19
- React Router DOM 7
- Redux Toolkit
- Zustand (State management)
- Tailwind CSS
- Axios
- React Icons
- React Player
- Lucide React
- React Hot Toast

### Backend
- Node.js with Express
- MongoDB with Mongoose
- bcryptjs for password hashing
- JSON Web Tokens (JWT) for authentication
- Cookie-parser
- CORS
- dotenv for environment configuration

## Installation and Setup
### Prerequisites
- Node.js and npm installed
- MongoDB database setup

### Clone the Repository
```bash
git clone https://github.com/your-username/netflix-clone.git
cd netflix-clone
```

### Install Dependencies
#### Frontend
```bash
cd frontend
npm install
```
#### Backend
```bash
cd backend
npm install
```

### Setup Environment Variables
Create a `.env` file in the backend directory and add the following:
```
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Run the Project
#### Start the Backend Server
```bash
cd backend
npm start
```

#### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

## API Integration
- Search API from **RapidAPI**
- OMDb API for fetching movie details

## Deployment
The project is deployed using **Vercel** for the frontend.

## Contribution
- Fork the repository
- Create a new branch (`git checkout -b feature-branch`)
- Commit your changes (`git commit -m 'Add new feature'`)
- Push to the branch (`git push origin feature-branch`)
- Create a Pull Request

## License
This project is open-source and available under the MIT License.

