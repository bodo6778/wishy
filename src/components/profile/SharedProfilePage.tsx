import { Box, Text } from "@chakra-ui/react";
import Wishlist from "components/wish/Wishlist";
import React from "react";
import { UserProfile } from "types/wish";
import { getStorageValue } from "../../../utils/functions";

interface SharedProfilePageProps {
  user: UserProfile;
}

const SharedProfilePage: React.FC<SharedProfilePageProps> = ({ user }) => {
  const token = getStorageValue("token");
  return (
    <Box>
      {!token && (
        <Text fontSize="xl" mb={6}>
          This is <b>{user.name}</b>&apos;s profile. Take a look at it&apos;s
          wishes:
        </Text>
      )}
      <Wishlist wishlists={user.wishlists} />
    </Box>
  );
};

export default SharedProfilePage;
