import React, { useState } from "react";
import { useAuth } from "../api/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signup as signupApi } from "../api";

export default function SignUp() {
  const [signupError, setSignupError] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const validateLogin = Yup.object({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is Required"),
  });

  let signupInitialValues: any = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const signupForm = useFormik({
    initialValues: signupInitialValues,
    validationSchema: validateLogin,
    onSubmit: async (values) => {
      setSignupError(false);
      setSignupErrorMessage("");
      const signupPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email.toLowerCase(),
        password: values.password,
      };
      console.log("signupPayload", signupPayload);
      await signupApi(signupPayload)
        .then((response) => {
          console.log("response", response);
          navigate("/login");
        })
        .catch((error) => {
          console.log("error", error);
          setSignupError(true);
          setSignupErrorMessage(error.response.data.message);
        });
      // login(signupPayload);
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      direction="column"
    >
      <Typography variant="h2">Sign Up</Typography>
      <form onSubmit={signupForm.handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "700px",
            minWidth: "700px",
            gap: "20px",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              width: "100%",
              gap: "20px",
            }}
          >
            <Grid sx={{ width: "45%" }} component="div">
              <TextField
                placeholder="First Name"
                label="First Name"
                id="firstName"
                name="firstName"
                variant="standard"
                fullWidth
                value={signupForm.values.firstName as string}
                error={
                  signupForm.touched.firstName &&
                  Boolean(signupForm.errors.firstName)
                }
                helperText={signupForm.errors.firstName as string}
                onChange={signupForm.handleChange}
              />
            </Grid>
            <Grid sx={{ width: "45%" }} component="div">
              <TextField
                sx={{}}
                placeholder="Last Name"
                name="lastName"
                label="Last Name"
                variant="standard"
                fullWidth
                value={signupForm.values.lastName as string}
                error={
                  signupForm.touched.lastName &&
                  Boolean(signupForm.errors.lastName)
                }
                helperText={signupForm.errors.lastName as string}
                onChange={signupForm.handleChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "20px",
            }}
          >
            <Grid sx={{ width: "45%" }} component="div">
              <TextField
                sx={{}}
                placeholder="Email"
                name="email"
                variant="standard"
                label="Email"
                fullWidth
                value={signupForm.values.email}
                error={
                  signupForm.touched.email && Boolean(signupForm.errors.email)
                }
                helperText={signupForm.errors.email as string}
                onChange={signupForm.handleChange}
              />
            </Grid>
            <Grid sx={{ width: "45%" }} component="div">
              <Typography sx={{ marginBottom: "10px" }}>Password</Typography>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                label=""
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Password"
                name="password"
                fullWidth
                sx={{}}
                value={signupForm.values.password}
                error={
                  signupForm.touched.password &&
                  Boolean(signupForm.errors.password)
                }
                color={"primary"}
                onChange={signupForm.handleChange}
              />
              {signupForm.touched.password &&
                Boolean(signupForm.errors.password) && (
                  <Grid
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "red",
                    }}
                  >
                    <Typography>
                      {signupForm.errors.password as string}
                    </Typography>
                  </Grid>
                )}
            </Grid>
          </Grid>
          {signupError && <p style={{ color: "red" }}>{signupErrorMessage}</p>}
          <Grid sx={{ width: "100%" }} component="div">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Grid>
          <Grid
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            component="div"
          >
            already have an account? <Link to="/login">Login</Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
