import { Box, Button, Input } from "@chakra-ui/react";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  return (
    <Box w="100%">
      <Input placeholder="Email" value={email} onChange={handleEmailChange} />
      <Input
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button onClick={() => {}}>Log In</Button>
    </Box>
  );
};

export default Login;
