import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { WishlistType } from "types/wish";
import { useRecoilState, useRecoilValue } from "recoil";
import { getStorageValue } from "../../../utils/functions";
import OneWishlist from "components/wish/OneWishlist";
import AddWishlistButton from "./AddButton/AddWishlistButton";
import { wishlistsState } from "state/atoms";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  const token = getStorageValue("token");
  const wishlists = useRecoilValue(wishlistsState);

  if (!token) return null;

  return (
    <Box mb="32px">
      <Stack spacing={4}>
        {wishlists?.map((wishlist: WishlistType, key) => (
          <OneWishlist wishlist={wishlist} key={key} />
        ))}
      </Stack>

      <AddWishlistButton />
    </Box>
  );
};

export default Wishlist;
