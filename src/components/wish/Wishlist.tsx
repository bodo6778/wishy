import { Box } from "@chakra-ui/react";
import { wishlist } from "database/wishlist";
import React from "react";
import Wish from "./Wish";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  return (
    <Box>
      {wishlist.map((wish) => (
        <Wish wish={wish} />
      ))}
    </Box>
  );
};

export default Wishlist;
