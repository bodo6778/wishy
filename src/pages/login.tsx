import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { SyntheticEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const loginUser = async (event: SyntheticEvent) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success === true) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      alert("bad login");
    }
  };

  return (
    <Box w="100%">
      <form onSubmit={loginUser}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          placeholder="Email"
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" onClick={loginUser}>
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
