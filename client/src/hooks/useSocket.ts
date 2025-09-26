import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../api/AuthContext";

export const useSocket = () => {
  const { token } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(
      process.env.REACT_APP_API_URL || "http://localhost:4000",
      {
        auth: { token: token },
      }
    );
    socketRef.current = socket;

    socket.on("connect_error", (err) => console.error(err));

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return socketRef.current;
};
