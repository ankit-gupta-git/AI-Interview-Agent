# InterviewIQ: AI-Powered Interview Preparation Platform

InterviewIQ is a comprehensive, full-stack web application designed to help job seekers master their interview skills through AI-driven simulations. By leveraging advanced natural language processing and performance analytics, the platform provides a realistic interview experience with actionable feedback.

## Key Technical Features

- **AI-Driven Behavioral Interviews**: Utilizes the Google Gemini API to generate dynamic, role-specific interview questions and provide real-time interaction.
- **Intelligent Resume Analysis**: Automated parsing of uploaded resumes to tailor interview questions based on the candidate's specific background and experience.
- **Performance Analytics**: Visual representation of interview results using Recharts, offering insights into communication skills, technical knowledge, and overall performance.
- **Automated Report Generation**: Generates detailed PDF performance reports using jsPDF, summarizing strengths and areas for improvement.
- **Secure Authentication**: Integrated Firebase Authentication for secure user onboarding and session management.
- **Responsive UI/UX**: A modern, fluid interface built with React and Tailwind CSS, optimized for various devices and screen sizes.

## Core Tech Stack

### Frontend
- **React 19**: Modern UI library for building component-based interfaces.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for rapid and consistent styling.
- **Redux Toolkit**: Efficient state management for global application data.
- **Framer Motion**: Smooth micro-animations and transitions.

### Backend
- **Node.js & Express**: Scalable server-side environment and web framework.
- **MongoDB & Mongoose**: NoSQL database for flexible data storage and robust object modeling.
- **Google Gemini API**: Advanced LLM integration for intelligent interview logic.
- **Firebase SDK**: Secure authentication and backend services.

## Project Structure

```bash
InterviewIQ/
├── client/          # Vite + React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── redux/       # Global state management
│   │   └── App.jsx      # Main application entry
├── server/          # Node.js + Express Backend
│   ├── config/      # Database and service configurations
│   ├── controllers/ # Business logic for API endpoints
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API route definitions
│   └── index.js     # Server entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account (local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd InterviewIQ
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   JWT_SECRET=your_jwt_secret
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory and add (if applicable):
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   # Add other Firebase config variables as needed
   ```
   Start the client:
   ```bash
   npm run dev
   ```

## Usage
- Register or Log in to your account.
- Upload your resume for personalized analysis.
- Initiate a "New Interview" session.
- Respond to AI-generated questions via text or voice (if supported).
- Review your performance report and track progress over time.

## License
This project is licensed under the ISC License.
