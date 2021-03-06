import { Box } from "@chakra-ui/react";
import Wishlist from "components/wish/Wishlist";
import React from "react";
import { UserProfile } from "types/wish";

interface SharedProfilePageProps {
  user: UserProfile;
}

const SharedProfilePage: React.FC<SharedProfilePageProps> = ({ user }) => {
  return (
    <Box>
      <Wishlist wishlists={user.wishlists} />
    </Box>
  );
};

export default SharedProfilePage;
