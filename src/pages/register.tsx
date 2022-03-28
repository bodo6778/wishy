import { Box, Button, Input } from "@chakra-ui/react";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";
import { useRouter } from "next/dist/client/router";
import { ChangeEvent, useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const registerUser = async () => {
    const response = await fetch("http://localhost:3001/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      router.push("/login");
    }
  };

  return (
    <Box w="100%">
      <Input placeholder="Name" value={name} onChange={handleNameChange} />
      <Input
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <Input placeholder="Email" value={email} onChange={handleEmailChange} />
      <Input
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button onClick={registerUser}>Sign In</Button>
    </Box>
  );
};

export default Register;
