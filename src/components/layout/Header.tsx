import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import AccessibleLink from "components/AccessibleLink";
import { useRouter } from "next/dist/client/router";
import { deleteStorageValue, getStorageValue } from "../../../utils/functions";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const token = getStorageValue("token");

  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <Heading as="h1" size="md">
          Wishy
        </Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        <Button
          onClick={() => {
            if (token) {
              router.asPath === "/" ? router.reload() : router.push("/");
              deleteStorageValue("token");
            } else {
              router.push("/login");
            }
          }}
        >
          {token ? "Log Out" : "Log In"}
        </Button>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
