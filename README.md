# Summary
Hi there, I created this readme to help you install the application on your side. 

```
By: Dino E
```

# File Explorer App

The app I create is called "file explorer" which is built with React (frontend) and Node.js (backend). It allows users to browse the local file system, view file details, and navigate through directories.

## What you need

- Node.js  (v14 or later)
- npm (usually comes with Node.js)

## Setup Instructions

1. Clone the repository:

   ```
   git clone [repository-url]
   cd file-explorer-app
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Start the backend server:
   ```
   # In the server directory: whicih is (cd server)
   npm start
   ```
   The server should start running on `http://localhost:3001`.

4. In a new terminal, start the frontend development server: which is (cd file-explorer)
   ```
   # In the client directory
   npm start
   ```
   The app should then open in the browser at `http://localhost:3000`.

## Usage

- The app will display the contents of the user's home directory.
- Click on folder names to navigate into directories.
- File details (size, type, creation date, permissions) are displayed for each item.
- The current path and load time for each directory are shown at the top.
- To start from the begging please re-load the page.

## SIde Note

For security reasons, the app only accesses directories and files that the Node.js process has permission to read. It starts in your home directory by default.

## If it doesnt work

1. Ensure both the backend and frontend servers are running.
2. Check the console in your browser and the terminal running the servers for any error messages.
3. Make sure you have the necessary permissions to read files in your home directory.


# Packages loaded:
1. npm install express cors 
2. npm install axios