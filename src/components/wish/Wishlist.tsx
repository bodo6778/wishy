import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { WishlistType } from "types/wish";
import { useRecoilState, useRecoilValue } from "recoil";
import { getStorageValue } from "../../../utils/functions";
import OneWishlist from "components/wish/OneWishlist";
import AddWishlistButton from "./AddButton/AddWishlistButton";
import { wishlistsState } from "state/atoms";

interface WishlistProps {
  wishlists?: WishlistType[];
  editable?: boolean;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlists, editable }) => {
  const wishlistsValue = wishlists || useRecoilValue(wishlistsState);

  return (
    <Box mb="32px">
      <Stack spacing={4}>
        {wishlistsValue?.map((wishlist: WishlistType, key) => (
          <OneWishlist wishlist={wishlist} key={key} editable={editable} />
        ))}
      </Stack>

      {editable && <AddWishlistButton />}
    </Box>
  );
};

export default Wishlist;
