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
  const [password2, setPassword2] = useState("");

  const router = useRouter();

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);
  const handlePassword2Change = (e: any) => setPassword2(e.target.value);

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
        password2,
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
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Input
        placeholder="Repeat Password"
        type="password"
        value={password2}
        onChange={handlePassword2Change}
      />
      <Button onClick={registerUser}>Sign In</Button>
    </Box>
  );
};

export default Register;
