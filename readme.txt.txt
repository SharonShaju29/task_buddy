Task Management Application

Overview

This is a Task Management Application built using React, Tailwind CSS, and TypeScript. It leverages Firebase for authentication and as a cloud database (serverless architecture).

Features

User authentication with Firebase

Cloud database for storing tasks

Responsive UI with Tailwind CSS

Real-time task updates

Task categorization and filtering

Tech Stack

React (Frontend Framework)

TypeScript (Static Typing)

Tailwind CSS (Styling)

Firebase (Authentication & Database)

Installation

Prerequisites

Ensure you have Node.js and npm installed on your system.

Steps

Clone the repository:

git clone https://github.com/your-username/your-repo.git
cd your-repo

Install dependencies:

npm i

Run the project:

npm run dev

Firebase Setup

Create a Firebase project at Firebase Console.

Enable Authentication (Email/Password, Google, etc.).

Set up a Cloud Firestore database.

Copy your Firebase configuration and update the .env file:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Usage

Register/Login using Firebase Authentication.

Create, edit, and delete tasks.

View tasks in real-time from Firestore.

Filter tasks based on status or priority.

Contributing

Feel free to fork the repository and submit pull requests!

License

This project is licensed under the MIT License.

