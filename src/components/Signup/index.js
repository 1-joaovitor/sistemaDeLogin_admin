import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import "../Login/style.css";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      id: String(new Date().getTime() + Math.random(123214)),
    },
  });
  const signupOnsubmit = (data) => console.log(data);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
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
            Inscreva-se
          </Typography>
        </Box>

        <form className="Form" onSubmit={handleSubmit(signupOnsubmit)}>
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
              {...register("name")}
              size="medium"
              name="name"
              className="inputs"
              variant="standard"
              color="info"
              focused
              fullWidth={true}
              label="Nome"
            />
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
          <Box sx={{ marginTop: 6, width: "100%" }}>
            <Button type="submit" variant="contained" fullWidth={true}>
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
