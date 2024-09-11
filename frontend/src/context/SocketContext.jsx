// import { createContext, useState, useEffect, useContext } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
// 	return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
// 	const [socket, setSocket] = useState(null);
// 	const [onlineUsers, setOnlineUsers] = useState([]);
// 	const { authUser } = useAuthContext();

// 	useEffect(() => {
// 		if (authUser) {
// 			const socket = io("http://localhost:5000", {
// 				query: {
// 					userId: authUser._id,
// 				},
// 			});

// 			setSocket(socket);

			
// 			socket.on("getOnlineUsers", (users) => {
// 				setOnlineUsers(users);
// 			});

// 			return () => socket.close();
// 		} else {
// 			if (socket) {
// 				socket.close();
// 				setSocket(null);
// 			}
// 		}
// 	}, [authUser]);

// 	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
// };
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			// Initialize the socket connection
			const socket = io("http://localhost:5000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// Handle online users update
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Log connection status
			socket.on("connect", () => {
				console.log("Connected with socket ID:", socket.id);
			});

			// Log disconnection reason
			socket.on("disconnect", (reason) => {
				console.log("Disconnected due to:", reason);
			});

			// Log connection errors
			socket.on("connect_error", (error) => {
				console.log("Connection error:", error);
			});

			// Log when the connection fails
			socket.on("connect_failed", () => {
				console.log("Connection failed");
			});

			// Cleanup the socket connection on component unmount or authUser change
			return () => {
				socket.close();
				setSocket(null);
			};
		} else {
			// If no authUser, ensure socket is closed
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
