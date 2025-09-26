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

export default function Login() {
  const { login } = useAuth();

  const [signupError, setSignupError] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const validateLogin = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is Required"),
  });

  let signupInitialValues: any = {
    email: "",
    password: "",
  };

  const signupForm = useFormik({
    initialValues: signupInitialValues,
    validationSchema: validateLogin,
    onSubmit: (values) => {
      setSignupError(false);
      setSignupErrorMessage("");
      const signupPayload = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      login(signupPayload.email, signupPayload.password)
        .then((response) => {
          console.log("response", response);
          navigate("/");
        })
        .catch((error) => {
          console.log("error", error);
          setSignupError(true);
          setSignupErrorMessage(error?.response?.data?.message);
        });
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
    >
      <form onSubmit={signupForm.handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "500px",
            minWidth: "500px",
            gap: "20px",
          }}
        >
          <Grid sx={{ padding: "5px" }} component="div">
            <TextField
              placeholder="Email"
              label="Email"
              id="email"
              name="email"
              variant="standard"
              fullWidth
              value={signupForm.values.email as string}
              error={
                signupForm.touched.email && Boolean(signupForm.errors.email)
              }
              helperText={signupForm.errors.email as string}
              onChange={signupForm.handleChange}
            />
          </Grid>
          <Grid sx={{ padding: "5px" }} component="div">
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

          {signupError && (
            <Grid
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
              component="div"
            >
              <Typography color="red" variant="body1">
                {signupErrorMessage}
              </Typography>
            </Grid>
          )}
          <Grid sx={{ width: "100%" }} component="div">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            component="div"
          >
            don't have an account? <Link to="/signup">Signup</Link>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
