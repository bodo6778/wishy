import { Box, Button, Input } from "@chakra-ui/react";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";
import { ChangeEvent, useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleUsernameChange = (e: any) => setUsername(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

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
      <Button onClick={() => {}}>Sign In</Button>
    </Box>
  );
};

export default Register;
