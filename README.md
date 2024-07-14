# CodeMaster

CodeMaster is an online coding web application designed to facilitate learning and interaction between mentors and students in JavaScript.

## Technologies Used

- **React**: Frontend library for building interactive user interfaces.
- **SocketIO**: real-time communication between clients and the server
- **Express**: Web framework for Node.js, used for backend API development.
- **Node.js**: Server-side JavaScript runtime environment.
- **SCSS**: CSS preprocessor for styling.

## Features

### Lobby Page

The Lobby page allows users to select a code block and start coding.

- **Choose Code Block**: Displays a list of available code blocks that users can click to navigate to the corresponding Code Block page.

### Code Block Page

The Code Block page includes a text editor with real-time collaboration features.

- **Role Indicator**: Automatically assigns the first user as the mentor (Tom), with subsequent users joining as students.
- **Real-time Collaboration**: Changes made to the code are displayed in real-time using Socket.IO.
- **Syntax Highlighting**: Code is displayed with syntax highlighting for ease of reading and editing.

### Additional Features

- **Invite Students**: The mentor can invite students from any part of the application to join their coding room. Upon accepting the invite, students are navigated to the mentor's room automatically.

- **Light/Dark Mode**: Users can toggle between light and dark themes for better coding experience.

- **Edit Mode for Mentors**: Mentors have the ability to switch to edit mode in the code editor, allowing them to modify the code.

- **Solution Checker**: Each code block contains a solution. When a student's code matches the solution, a popup is displayed on the screen, indicating success.

## Getting Started

The project is live at: https://codemaster-feum.onrender.com/

Hope you enjoy it!
