import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const router = useRouter();

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);
  const handlePassword2Change = (e: any) => setPassword2(e.target.value);

  const registerUser = async () => {
    try {
      await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          password2,
        }),
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack w="100%" gap={4}>
      <Input
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        isRequired
      />
      <Input
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        isRequired
      />
      <Input placeholder="Email" value={email} onChange={handleEmailChange} />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        isRequired
      />
      <Input
        placeholder="Repeat Password"
        type="password"
        value={password2}
        onChange={handlePassword2Change}
        isRequired
      />
      <Button onClick={registerUser} colorScheme="blue" width="fit-content">
        Sign In
      </Button>
    </Stack>
  );
};

export default Register;
