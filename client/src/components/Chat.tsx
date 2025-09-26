import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Grid,
  TextField,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import {
  createConversation as createConversationApi,
  getUserConversations as getUserConversationsApi,
  getallusers as getallusersApi,
} from "../api";
import { useAuth } from "../api/AuthContext";
import { Conversation, User } from "../types/commonTypes";

export default function Chat() {
  const { token, user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [allusers, setAllusers] = useState<any[]>([]);
  const navigate = useNavigate();
  const validateNewConversation = Yup.object<Conversation>({
    title: Yup.string().required("Title is Required"),
    participants: Yup.array()
      .of(Yup.object<User>())
      .required("Participants are Required"),
    owner: Yup.object<User>().required("Owner is Required"),
  });

  let newConversationInitialValues: Conversation = {
    title: "",
    participants: [],
    owner: user,
  };

  const newConversationForm = useFormik({
    initialValues: newConversationInitialValues,
    validationSchema: validateNewConversation,
    onSubmit: (values) => {
      if (values.participants.length === 0) {
        newConversationForm.setFieldError(
          "participants",
          "Participants are Required"
        );
        return;
      }
      console.log("newConversationForm values", values);
      createConversationApi(values, token).then(
        (createConversationResponse: any) => {
          console.log("createConversationResponse", createConversationResponse);
          newConversationForm.resetForm();
          // navigate(`/chat/${createConversationResponse.data.id}`);
        }
      );
    },
  });

  useEffect(() => {
    newConversationForm.setValues({
      title: "",
      participants: [],
      owner: user,
    });
    getUserConversationsApi(user.id, token).then(
      (getConversationsResponse: any) => {
        console.log("getConversationsResponse", getConversationsResponse);
        setConversations(getConversationsResponse?.data);
      }
    );
    getallusersApi(token).then((getallusersResponse: any) => {
      let tempallusers: any[] = [];
      getallusersResponse?.data.forEach((alluser: any) => {
        if (user.id !== alluser.id && !tempallusers.includes(alluser)) {
          tempallusers.push(alluser);
        }
      });
      setAllusers(tempallusers);
    });
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h2">Your Conversations</Typography>
      {conversations.length > 0 ? (
        <ul>
          {conversations.map((conver: any) => (
            <li key={conver.id}>
              <Link to={`/chat/${conver?.conversation?.id}`}>
                {conver?.conversation?.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="h4">No conversations found</Typography>
      )}
      <Grid
        sx={{
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <Grid>
          {" "}
          <Typography variant="h4">New Conversation</Typography>
        </Grid>
        <form onSubmit={newConversationForm.handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              padding: "20px 0 20px 0",
            }}
          >
            <Grid sx={{ width: "45%" }}>
              <TextField
                label="Title"
                name="title"
                value={newConversationForm.values.title}
                onChange={newConversationForm.handleChange}
                error={
                  newConversationForm.touched.title &&
                  Boolean(newConversationForm.errors.title)
                }
                helperText={newConversationForm.errors.title as string}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <Grid sx={{ width: "45%" }}>
              <Autocomplete
                multiple
                options={allusers as any}
                getOptionLabel={(option: any) =>
                  option.firstName + " " + option.lastName
                }
                value={newConversationForm.values.participants}
                onChange={(event, value) => {
                  newConversationForm.setFieldValue("participants", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Participants"
                    error={
                      newConversationForm.touched.participants &&
                      Boolean(newConversationForm.errors.participants)
                    }
                    helperText={
                      newConversationForm.errors.participants as string
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid>
            <Button type="submit" variant="contained" color="primary">
              Start new conversation
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
