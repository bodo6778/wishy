import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { validateEmail } from "../../utils/functions";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [nameError, setNameError] = useState<string>();
  const [usernameError, setUsernameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [password2Error, setPassword2Error] = useState<string>();

  const router = useRouter();
  const toast = useToast();

  const handleNameChange = (e: any) => {
    setNameError(undefined);
    setName(e.target.value);
  };
  const handleUsernameChange = (e: any) => {
    setUsernameError(undefined);
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: any) => {
    setEmailError(undefined);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPasswordError(undefined);
    setPassword2Error(undefined);
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e: any) => {
    setPasswordError(undefined);
    setPassword2Error(undefined);
    setPassword2(e.target.value);
  };

  const registerUser = async () => {
    if (name.trim() === "") {
      setNameError("Name is empty");
      return;
    }
    if (username.trim() === "") {
      setUsernameError("Username is empty");
      return;
    }
    if (email.trim() === "") {
      setEmailError("Email is empty");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Password is empty");
      return;
    }
    if (password2.trim() === "") {
      setPassword2Error("Password2 is empty");
      return;
    }
    if (password !== password2) {
      setPasswordError("Passwords must match");
      setPassword2Error("Passwords must match");
      return;
    }
    if (password.length < 6) {
      setPasswordError("The password must have at least 6 characters");
      return;
    }
    if (!username.match(/^[0-9a-zA-Z]+$/)) {
      setUsernameError("Username should contain only letters and spaces");
      return;
    }
    if (validateEmail(email) === null) {
      setEmailError("Email is invalid");
      return;
    }

    try {
      const res = await fetch(
        "https://wishy-backend.vercel.app/api/users/register",
        {
          // const res = await fetch("http://localhost:3001/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            email: email.toLowerCase(),
            password,
            password2,
          }),
        }
      );
      if (res.status === 400) {
        const body = await res.json();
        throw body.error;
      }
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      if (
        error === "Email already exists!" ||
        error === "Username already exists!"
      ) {
        toast({
          title: error,
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <FormControl isRequired isInvalid={nameError !== undefined}>
        <FormLabel htmlFor="name" mt={2} ml={2}>
          Name
        </FormLabel>
        <Input placeholder="Name" value={name} onChange={handleNameChange} />
        <FormErrorMessage>{nameError}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={usernameError !== undefined}>
        <FormLabel htmlFor="username" mt={2} ml={2}>
          Username
        </FormLabel>
        <Input
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <FormErrorMessage>{usernameError}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={emailError !== undefined}>
        <FormLabel htmlFor="email" mt={2} ml={2}>
          Email
        </FormLabel>
        <Input placeholder="Email" value={email} onChange={handleEmailChange} />
        <FormErrorMessage>{emailError}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={passwordError !== undefined}>
        <FormLabel htmlFor="password" mt={2} ml={2}>
          Password
        </FormLabel>

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <FormErrorMessage>{passwordError}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={password2Error !== undefined}>
        <FormLabel htmlFor="repeat-password" mt={2} ml={2}>
          Repeat Password
        </FormLabel>
        <Input
          placeholder="Repeat Password"
          type="password"
          value={password2}
          onChange={handlePassword2Change}
        />
        <FormErrorMessage>{password2Error}</FormErrorMessage>
      </FormControl>

      <Button
        onClick={registerUser}
        colorScheme="blue"
        width="fit-content"
        mt={4}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Register;
