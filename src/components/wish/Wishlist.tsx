import { Box, Text } from "@chakra-ui/react";
import { wishlist } from "database/wishlist";
import React from "react";
import AddWishButton from "./AddButton/AddWishButton";
import Wish from "./Wish";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  return (
    <Box mb="32px">
      <Text mb="16px" fontWeight="bold" fontSize="24px">
        My Wishlist
      </Text>
      {wishlist.map((wish) => (
        <Wish wish={wish} />
      ))}
      <AddWishButton />
    </Box>
  );
};

export default Wishlist;
