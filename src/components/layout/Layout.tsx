import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "state/atoms";
import { getStorageValue } from "../../../utils/functions";

import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const token = getStorageValue("token");
  const setUser = useSetRecoilState(userState);

  const getUser = async () => {
    if (!token) return;

    const req = await fetch("http://localhost:3001/api/users/getProfile", {
      headers: {
        "x-access-token": token,
      },
    });
    const data = await req.json();
    if (req.ok === true) {
      setUser({
        name: data.name,
        email: data.email,
        username: data.username,
      });
    }
  };

  useEffect(() => {
    if (!token) return;
    getUser();
  }, []);

  return (
    <Flex margin="0 auto" transition="0.5s ease-out" justifyContent="center">
      <Meta />
      <Box margin="8" width="800px">
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
