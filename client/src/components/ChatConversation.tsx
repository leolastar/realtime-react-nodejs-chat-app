import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { useAuth } from "../api/AuthContext";

interface Message {
  id: number;
  content: string;
  sender_id: number;
  conversation_id: number;
  createdAt: string;
}

export default function ChatConversation() {
  const { id } = useParams<{ id: string }>();
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const { user } = useAuth();
  // useEffect(() => {
  //   console.log("join_room in ChatConversation", id);
  //   socket?.emit("join_room", id);
  // }, [id]);

  useEffect(() => {
    // listen for new messages

    socket?.emit("join_room", {
      conversation_id: Number(id),
      firstName: user.firstName,
      lastName: user.lastName,
    });
    setNewMsg(" ");

    socket?.on(
      "user_joined",
      (msg: { conversation_id: number; userId: number; content: string }) => {
        console.log("user_joined in ChatConversation", msg);
        if (msg.userId !== user.id) {
          setMessages((m) => [
            ...m,
            {
              id: 0,
              content: msg.content,
              sender_id: msg.userId,
              conversation_id: msg.conversation_id,
              createdAt: "",
            },
          ]);
        }
      }
    );

    socket?.on("loadHistory", (msgs: Message[]) => {
      console.log("loadHistory in ChatConversation", msgs);
      setMessages((m) => [...msgs, ...m]);
    });

    socket?.on(
      "newMessage",
      (msg: {
        message: Message;
        conversation_id: number;
        sender_id: number;
        content: string;
      }) => {
        console.log("newMessage in ChatConversation", msg);
        if (msg.conversation_id === Number(id))
          setMessages((m) => [
            ...m,
            {
              id: msg.message.id,
              content: msg.content,
              sender_id: msg.sender_id,
              conversation_id: msg.conversation_id,
              createdAt: msg.message.createdAt,
            },
          ]);
      }
    );
    // cleanup
    return () => {
      socket?.off("newMessage");
    };
  }, [id, socket]);

  const send = () => {
    if (!newMsg.trim()) return;
    socket?.emit("sendMessage", {
      conversation_id: Number(id),
      content: newMsg,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    setNewMsg("");
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h2">Conversation {id}</Typography>
      <Link to="/chats">Back to Chat List</Link>
      <Grid
        component="div"
        sx={{
          width: "100%",
          padding: "20px",
          gap: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          component="div"
          sx={{
            height: 400,
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {messages.map((m) => (
            <Grid key={m.id}>{m.content}</Grid>
          ))}
        </Grid>
        <Grid component="div" sx={{ width: "100%" }}>
          <TextField
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message"
            fullWidth
          />
        </Grid>
        <Grid component="div">
          <Button variant="contained" color="primary" onClick={send} fullWidth>
            Send
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
