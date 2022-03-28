import { Box, Text } from "@chakra-ui/react";
import Axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { WishType } from "types/wish";
import AddWishButton from "./AddButton/AddWishButton";
import Wish from "./Wish";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  const [wishlist, setWishlist] = useState<WishType[]>();

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/").then((response: AxiosResponse) => {
  //     setWishlist(response.data);
  //   });
  // }, []);

  return (
    <Box mb="32px">
      <Text mb="16px" fontWeight="bold" fontSize="24px">
        My Wishlist
      </Text>
      {wishlist?.map((wish: WishType) => (
        <Wish wish={wish} />
      ))}
      <AddWishButton />
    </Box>
  );
};

export default Wishlist;
