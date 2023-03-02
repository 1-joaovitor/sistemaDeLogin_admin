import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import "./style.css";

export const Login = () => {
  const navigate = useNavigate();
  const { authenticated, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      id: String(new Date().getTime() + Math.random(123214)),
    },
  });
  const onSubmit = (data) => {
    const { email, password } = data;
    login(email, password);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: "#95b7f1",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 500,
          height: 600,
          display: "flex",
          flexDirection: "column",
          padding: 5,
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.966) 0px 3px 8px",
          borderRadius: 5,
          backgroundColor: "white",
        }}
      >
        <Box sx={{ marginBottom: 6 }}>
          <Typography
            sx={{ color: "#378de2" }}
            variant="h3"
            className="LoginTitle"
          >
            Login
          </Typography>
        </Box>

        <form className="Form" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            <TextField
              {...register("email")}
              size="medium"
              name="email"
              className="inputs"
              variant="standard"
              color="info"
              focused
              fullWidth={true}
              label="Email"
            />
            <TextField
              {...register("password")}
              name="password"
              variant="standard"
              color="info"
              focused
              label="Senha"
              type="password"
              className="inputs"
            />
          </Box>
          <Box
            sx={{
              marginTop: 6,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h7">Não possui conta ? </Typography>
            <Link to={"/signup"}>
              <Typography color={"#1976d2"}>Inscreva-se agora</Typography>
            </Link>
            <Button type="submit" variant="contained" fullWidth={true}>
              Entrar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
