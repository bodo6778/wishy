import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { SyntheticEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmailError(undefined);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPasswordError(undefined);
    setPassword(e.target.value);
  };

  const loginUser = async (event: SyntheticEvent) => {
    event.preventDefault();
    const response = await fetch(
      "https://wishy-backend.vercel.app/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLocaleLowerCase(),
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success === true) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      if (data.emailnotfound) setEmailError(data.emailnotfound);
      if (data.passwordincorrect) setPasswordError(data.passwordincorrect);
    }
  };

  return (
    <Box w="100%">
      <form onSubmit={loginUser}>
        <FormControl isRequired isInvalid={emailError !== undefined} mb={4}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            placeholder="Email"
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            isRequired
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={passwordError !== undefined}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            isRequired
          />
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        </FormControl>

        <Button type="submit" onClick={loginUser} colorScheme="teal" mt={4}>
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
