import React, { useState } from "react";
import { useAuth } from "../api/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

export default function Home() {
  const { user } = useAuth();
  console.log("Home user", user);
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {user ? (
          <Typography variant="h4">
            Hello {user.firstName} Welcome To My chat App
          </Typography>
        ) : (
          <Typography variant="h2">Welcome To My chat App</Typography>
        )}
        {user ? (
          <Link to="/chats">Chats</Link>
        ) : (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid>
              <Link to="/login">Login</Link>
            </Grid>
            <Grid>
              <Link to="/signup">Signup</Link>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
