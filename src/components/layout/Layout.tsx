import { Box, Flex } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, wishlistsState } from "state/atoms";
import { getStorageValue } from "../../../utils/functions";

import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const setWishlist = useSetRecoilState(wishlistsState);
  const setProfile = useSetRecoilState(userState);
  const token = getStorageValue("token");

  const populateProfile = async () => {
    if (!token) return;
    const req = await fetch("http://localhost:3001/api/users/getProfile", {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await req.json();
    setProfile(data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    populateProfile();
  }, []);

  const populateState = async () => {
    if (!token) return;

    try {
      const profileRequest = await fetch(
        "http://localhost:3001/api/users/getProfile",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      const profileData = await profileRequest.json();

      const wishlistsRequest = await fetch(
        "http://localhost:3001/api/wishes/getWishlists",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      const wishlistsData = await wishlistsRequest.json();

      setProfile(profileData);
      setWishlist(wishlistsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    populateState();
  }, [token]);

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
