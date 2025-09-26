import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Chat from "./components/Chat";
import ChatConversation from "./components/ChatConversation";
import { useAuth } from "./api/AuthContext";
import { AuthProvider } from "./api/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  console.log("PrivateRoute token", token);
  return token ? children : <Navigate to="/login" />;
};

export const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <PrivateRoute>
              <ChatConversation />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
