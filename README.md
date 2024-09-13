Flow chart how the application works

1. User Authentication:
Frontend (React + Zustand):

User enters login credentials.
Zustand manages auth state.
Dispatch login request to the backend.
Backend (Node.js + Express + MongoDB):

Validate credentials.
Check the user in MongoDB.
Generate a token upon success.
Send response to the frontend.
2. Establish WebSocket Connection:
Frontend (React + Socket.io):

After login, the client establishes a WebSocket connection to the server with the user ID.
Zustand stores the online users' state.
Backend (Node.js + Socket.io):

Receives WebSocket connection.
Stores user's socket ID in userSocketMap.
Emits the list of online users.
3. Real-Time Messaging:
Frontend (React):

User sends a message via input.
Zustand holds conversation state and messages.
Message is dispatched to the backend via WebSocket.
Backend (Node.js):

Receives the message.
Checks if conversation exists.
Saves message in MongoDB.
Emits message to the receiver's socket ID.
4. Receive Messages in Real-Time:
Frontend (React):
Listen for "newMessage" events from Socket.io.
Zustand updates the conversation with the new message.
5. User Disconnection:
Frontend:
WebSocket disconnects when the user leaves.
Backend:
Remove the user from userSocketMap.
Emit an updated list of online users.



Why I am choosing all the tools answer

1. Database selection
Database of choice: MongoDB (NoSQL) .
The reasoning:
Schema flexibility: MongoDB's schema-less design makes it easy to store unstructured or semi-structured data, which is ideal for chat messages, where the structure can vary based on attachments, metadata, and message type
Scalability : MongoDB is designed for horizontal scalability, which is important for applications like real-time chat where user numbers and contacts can grow exponentially
Document-based storage: Allows natural rendering of conversations and messages, with each document containing user information, message content, timestamp, and status.
Real-time support: MongoDB can easily integrate with real-time systems like WebSockets or Socket.IO, which is important for ensuring efficient live message updates
2. High-level overview of real-time chat functionality
pattern:
Backend: Node.js server that uses Socket.IO for WebSocket communication to manage real-time messages between users. The server will handle authentication, message encryption, and other user statuses.
Front end: A React-based application that uses the Socket.IO client for live messaging while communicating with the backend via HTTP for real-time data.
Real-time chat streaming : Socket connection : When a user accesses the app, a unique socket connection is established using Socket.IO, which is authenticated with a user token.
Sending/Receiving Messages : When the user sends a message, the server checks the active socket connection for the client. If the recipient is online, the message is sent in real time.
If the recipient is offline, the message is stored in MongoDB and marked as undelivered. When connection is reestablished, the recipient will receive any missed messages. Online/Offline Status:

3. React Frontend Approach
Key Features:
Real-Time Message Updates: The React frontend will leverage Socket.IO to update the message list in real time, without requiring page reloads. Messages will appear instantly upon being sent or received.
User Online/Offline Status: Using Socket.IO, the application will show live updates of user statuses (online/offline) in the chat sidebar or user list, allowing users to see who is currently available to chat.
Responsive Design: The frontend will be fully responsive, using Tailwind CSS, ensuring a seamless experience on both mobile and desktop devices. Flexbox and grid layout techniques will ensure a clean UI across all screen sizes.

State Management: Handling complex state like user messages, online status, and unread message counts without degrading performance. Context API and local state management using React hooks will be used initially, with potential refactoring to a global state solution zustand.
Security Consideration : JWT Authentication: Ensuring secure and authenticated WebSocket connections using tokens.



-    Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
-    Authentication && Authorization with JWT
-    Real-time messaging with Socket.io
-    Online user status (Socket.io and React Context)
-    Global state management with Zustand
-    Error handling both on the server and on the client
-    At the end Deployment like a pro for FREE!
-    And much more!

### Setup .env file

```js
PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```

### Build the app

```shell
npm run build
```

### Start the app

```shell
npm start
```
