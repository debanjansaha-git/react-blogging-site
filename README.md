# AI/ML Portfolio Website

This project is a personal portfolio website designed for AI/ML professionals to showcase their projects, skills, and experience. It's built with React and Firebase, offering a dynamic and interactive platform for displaying your work.

## Features

- Dynamic project showcase
- Skills section with visual representation
- Experience timeline
- Blog/article section
- User authentication for admin features
- Comment system on projects
- Social media integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Firebase CLI

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ai-ml-portfolio.git
   cd ai-ml-portfolio
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Storage in your Firebase project
   - Create a web app in your Firebase project and copy the configuration

4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Initialize Firebase in your project:
   ```
   firebase login
   firebase init
   ```
   Select Firestore, Hosting, and Storage when prompted.

## Running the Application Locally

To run the application in development mode:
