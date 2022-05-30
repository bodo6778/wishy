import { Box, Text } from "@chakra-ui/react";
import Wishlist from "components/wish/Wishlist";
import React from "react";
import { UserProfile } from "types/wish";

interface SharedProfilePageProps {
  user: UserProfile;
}

const SharedProfilePage: React.FC<SharedProfilePageProps> = ({ user }) => {
  return (
    <Box>
      <Text fontSize="xl" mb={6}>
        This is <b>{user.name}</b>'s profile. Take a look at it's wishes:
      </Text>
      <Wishlist wishlists={user.wishlists} />
    </Box>
  );
};

export default SharedProfilePage;
