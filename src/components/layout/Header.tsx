import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import AccessibleLink from "components/AccessibleLink";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "state/atoms";
import { deleteStorageValue, getStorageValue } from "../../../utils/functions";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const username = useRecoilValue(userState).username;

  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const token = getStorageValue("token");
    if (token !== undefined) setLogged(true);
  }, []);

  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          Wishy
        </Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        {logged && (
          <Button
            onClick={() => {
              router.push(`/users/${username}`);
            }}
            mr={4}
            colorScheme="teal"
          >
            My Profile
          </Button>
        )}
        {!logged && (
          <Button
            onClick={() => {
              router.push("/register");
            }}
            mr={4}
            colorScheme="blue"
          >
            Sign Up
          </Button>
        )}
        <Button
          px={4}
          onClick={() => {
            if (logged) {
              router.asPath === "/" ? router.reload() : router.push("/");
              deleteStorageValue("token");
            } else {
              router.push("/login");
            }
          }}
          mr={4}
          colorScheme="teal"
        >
          {logged ? "Log Out" : "Log In"}
        </Button>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
