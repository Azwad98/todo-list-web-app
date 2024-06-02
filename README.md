# To Do List Web App

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
   - [Task Management](#task-management)
   - [User-Friendly Interface](#user-friendly-interface)
   - [Backend Integration](#backend-integration)
   - [API Testing](#api-testing)
   - [Future Enhancements](#future-enhancements)
3. [Technology Stack](#technology-stack)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [Testing](#testing)
   - [Development Tools](#development-tools)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
     1. [Clone the Repository](#clone-the-repository)
     2. [Install Dependencies](#install-dependencies)
     3. [Set Up Firebase](#set-up-firebase)
   - [Running the Application](#running-the-application)
     1. [Build the Project](#build-the-project)
     2. [Run the Server](#run-the-server)
   - [Running Tests](#running-tests)
     - [API Tests](#api-tests)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
   - [GET /todos](#get-todos)
   - [POST /todos](#post-todos)
   - [PUT /todos/:id](#put-todosid)
   - [DELETE /todos/:id](#delete-todosid)
7. [Postman Collection](#postman-collection)
   - [Steps to Use the Postman Collection](#steps-to-use-the-postman-collection)
   - [Automating with Newman](#automating-with-newman)
8. [Future Features](#future-features)
   - [User Authentication](#user-authentication)
   - [Task Categorization](#task-categorization)
   - [Enhanced Testing](#enhanced-testing)

## Introduction

The To-Do Web Application is a simple, user-friendly app designed to help users manage their daily tasks efficiently. This project was developed to showcase my web application development skills, as well as my proficiency in testing methodologies.

The application allows users to create, update, delete, and manage their tasks seamlessly. Built with a modern tech stack, including React for the frontend and Node.js with Express for the backend, the app is designed to be responsive and easy to use.

So far, the project includes API tests using Postman to ensure the reliability and correctness of the backend services. In the future, I plan to extend the testing coverage by adding unit tests, integration tests, and system tests to further enhance the application's robustness and maintainability.

This project serves as a demonstration of my skills in full-stack web development and my commitment to following best practices in software testing.

## Features

The To-Do Web Application includes the following features:

### Task Management

- **Add Tasks:** Users can add new tasks with a name, description, and due date.
- **View Tasks:** A comprehensive list of all tasks is displayed, allowing users to see their to-do items at a glance.
- **Update Tasks:** Users can edit the details of existing tasks, such as updating the name, description, or due date.
- **Delete Tasks:** Unwanted tasks can be easily removed from the list.

### User-Friendly Interface

- **Responsive Design:** The application is designed to work seamlessly on various devices, including desktops, tablets, and mobile phones.
- **Interactive UI:** A clean and interactive user interface enhances the user experience.

### Backend Integration

- **Firebase Integration:** Tasks are stored in a Firebase Firestore database, ensuring data persistence and reliability.
- **Express.js Server:** The backend server is built with Express.js, providing a robust and scalable API.

### API Testing

- **Postman Integration:** API tests are implemented using Postman to verify the functionality of the backend services.
- **Automated Testing:** Plans to include automated testing with Newman for continuous integration and deployment.

### Future Enhancements

- **Unit Tests:** Implementation of unit tests to ensure individual components work as expected.
- **Integration Tests:** Adding integration tests to verify that different parts of the application work together correctly.
- **System Tests:** Comprehensive system tests to ensure the application meets all requirements and performs well in real-world scenarios.

These features demonstrate the core functionality and the potential for future growth and improvement in the To-Do Web Application.

## Technology Stack

The To-Do Web Application is built using a variety of modern technologies to ensure a robust and scalable solution. Below are the key technologies used:

### Frontend

- **React.js:** A JavaScript library for building user interfaces, allowing for efficient and flexible development of the application's UI.
- **Vite:** A fast build tool and development server for modern web projects, providing a smooth development experience.
- **CSS:** Styling the application to ensure a responsive and visually appealing design.

### Backend

- **Express.js:** A web application framework for Node.js, used to build the backend server and handle API requests.
- **Firebase Firestore:** A NoSQL document database provided by Firebase, used for storing and managing the application's data.
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine, used to run the backend server.

### Testing

- **Postman:** A collaboration platform for API development, used for testing the API endpoints and ensuring they work as expected.
- **Newman:** A command-line collection runner for Postman, used for running and automating Postman collections.
- **Jest:** A delightful JavaScript testing framework, to be used for unit testing, integration testing, and system testing in future enhancements.

### Development Tools

- **Visual Studio Code:** A source-code editor made by Microsoft, used for writing and managing the application's code.
- **Git:** A distributed version control system, used for tracking changes in the source code during development.
- **GitHub:** A code hosting platform for version control and collaboration, used for managing the project's repository.

These technologies were chosen to provide a robust, scalable, and efficient development environment, ensuring the To-Do Web Application meets high standards of performance and reliability.

## Getting Started

To get started with the To-Do Web Application, follow the steps below. These instructions will help you set up the project locally on your machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:

- **Node.js:** [Download and install Node.js](https://nodejs.org/)
- **npm:** Node.js package manager, installed with Node.js
- **Firebase Account:** [Sign up for Firebase](https://firebase.google.com/)

### Installation

1. **Clone the Repository:**

   Clone the repository from GitHub to your local machine.

   ```sh
   git clone https://github.com/yourusername/todo-web-app.git
   cd todo-web-app
   ```

2. **Install Dependencies:**

   Install the necessary dependencies for both the client and server.

   ```sh
   # Install client dependencies
   npm install

   # If you have a separate server, navigate to the server directory and install server dependencies
   # cd server
   # npm install
   ```

3. **Set Up Firebase:**

   Configure Firebase for the project. You need to create a Firebase project and get the configuration details.

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project (or use an existing one).
   - Navigate to Project Settings and find your Firebase configuration details.

   Create a file named `firebaseConfig.js` in the `src` directory and add your Firebase configuration:

   ```js
   // src/firebaseConfig.js

   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
     measurementId: 'YOUR_MEASUREMENT_ID',
   };

   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   export { db };
   ```

   Also, create a serviceAccountKey.json file in the root directory with your Firebase Admin SDK credentials:

   ```js
   {
        "type": "service_account",
        "project_id": "YOUR_PROJECT_ID",
        "private_key_id": "YOUR_PRIVATE_KEY_ID",
        "private_key": "YOUR_PRIVATE_KEY",
        "client_email": "YOUR_CLIENT_EMAIL",
        "client_id": "YOUR_CLIENT_ID",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "YOUR_CLIENT_X509_CERT_URL"
   }
   ```

### Running the Application

1. **Build the Project:**

   Build the project to generate the production-ready files.

   ```sh
   npm run build
   ```

2. **Run the Project:**

   Start the backend server to serve the built frontend and handle API requests.

   ```sh
   node server.js
   ```

### Running Tests

#### API Tests

API tests are implemented using Postman and can be automated using Newman. Follow these steps to run the API tests:

1. **Export Postman Collection and Environment:**

   - Export your Postman collection and environment as JSON files and place them in the `postman` directory.

2. **Run Newman:**

   Use Newman to run the tests from the command line.

   ```sh
   newman run postman/ToDoListCollection.json -e postman/ToDoListEnvironment.json
   ```

### Project Structure

The project is organized as follows:

```sh
TODO-WEB-APP/
├── dist/                      # Contains the production build files
├── node_modules/              # Contains the project dependencies
├── public/                    # Contains static assets
├── src/                       # Contains the source code
│ ├── assets/                  # Contains images and other static assets
│ ├── components/              # Contains React components
│ ├── firebaseConfig.js        # Firebase configuration file
│ ├── index.css                # Global CSS styles
│ ├── index.html               # HTML template
│ └── main.jsx                 # Main entry point for the React application
├── postman/                   # Contains Postman collection and environment files for API testing
│ ├── ToDoListCollection.json
│ └── ToDoListEnvironment.json
├── .eslintrc.cjs              # ESLint configuration
├── .gitignore                 # Git ignore file
├── index.html                 # Root HTML file
├── package-lock.json          # Lockfile for npm
├── package.json               # Contains the project metadata and scripts
├── README.md                  # Project README file
├── server.js                  # Express server setup file
├── serviceAccountKey.json     # Firebase service account key file
└── vite.config.js             # Vite configuration file
```

With these steps and tools, you can set up and test the To-Do Web Application efficiently.

## API Endpoints

The To-Do Web Application provides the following API endpoints for managing tasks:

### GET /todos

- **Description:** Fetch all to-do items.
- **Response:**
  - Status Code: 200
  - Body: An array of to-do items.

### POST /todos

- **Description:** Create a new to-do item.
- **Request Body:**
  ```json
  {
    "name": "New Task",
    "description": "Task Description",
    "dueDate": "2024-12-31T12:00"
  }
  ```
- **Response:**
  - Status Code: 201
  - Body: The created to-do item with an id.

### PUT /todos/:id

- **Description:** Update an existing to-do item.
- **Request Body:**
  ```json
  {
    "name": "Updated Task",
    "description": "Updated Description",
    "dueDate": "2024-12-31T12:00"
  }
  ```
- **Response:**
  - Status Code: 200
  - Body: The updated to-do item.

### DELETE /todos/:id

- **Description:** Delete a to-do item.
- **Response:**
  - Status Code: 200
  - Body: A success message indicating the to-do item was deleted.

## Postman Collection

To facilitate API testing, a Postman collection and environment have been created. These files contain predefined requests for the API endpoints and can be used to automate testing with Postman and Newman.

### Steps to Use the Postman Collection

1. **Import the Collection and Environment:**

   - Open Postman.
   - Click on the **Import** button in the top-left corner.
   - Select the collection file (`ToDoListCollection.json`) and the environment file (`ToDoListEnvironment.json`) from the `postman` directory and import them into Postman.

2. **Configure the Environment:**

   - After importing, ensure that the `ToDoListEnvironment` is selected in the environment dropdown in the top-right corner of Postman.

3. **Run the Collection:**

   - You can manually run the requests in the collection or use the Postman Collection Runner to run all requests in sequence.

### Automating with Newman

To automate the API tests using Newman, follow these steps:

1. **Install Newman:**

   Ensure that Newman is installed globally on your machine. You can install it using npm:

   ```sh
   npm install -g newman
   ```

2. **Run the Collection with Newman:**

   Navigate to the project directory and run the following command to execute the Postman collection using Newman:

   ```sh
   newman run postman/ToDoListCollection.json -e postman/ToDoListEnvironment.json
   ```

   This command will execute all the requests in the collection and provide a detailed report of the test results in the terminal.

By following these steps, you can easily test and verify the functionality of the API endpoints in the To-Do Web Application.

## Future Features

### User Authentication

- **Login Interface:** Implement a user authentication system that includes a login interface. Users will be able to create accounts, log in, and manage their tasks in a personalized environment. This will enhance the security and usability of the application by ensuring that tasks are user-specific and protected.

### Task Categorization

- **Categorize Tasks:** Add an option to categorize tasks. Users will be able to create and assign tasks to different categories (e.g., Work, Personal, Shopping). This feature will help users organize their tasks more effectively and improve their productivity by allowing them to focus on specific types of tasks.

### Enhanced Testing

- **Additional Test Case Scenarios:** Expand the testing suite to include more comprehensive test case scenarios. This will ensure that all possible edge cases and user interactions are covered, improving the reliability and robustness of the application.
- **Unit Tests:** Implement unit tests for individual components to verify that each part of the application functions correctly in isolation.
- **Integration Tests:** Add integration tests to ensure that different parts of the application work together seamlessly.
- **System Tests:** Conduct system tests to verify the end-to-end functionality of the application, ensuring it meets all requirements and performs well in real-world scenarios.
- **Automated Testing:** Enhance automated testing using tools like Jest and React Testing Library to facilitate continuous integration and deployment.

These future features and enhancements will not only add more functionality to the To-Do Web Application but also improve its overall quality and user experience.
