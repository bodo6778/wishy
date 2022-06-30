import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { WishlistType } from "types/wish";
import { useRecoilValue } from "recoil";
import OneWishlist from "components/wish/OneWishlist";
import AddWishlistButton from "./AddButton/AddWishlistButton";
import { wishlistsState } from "state/atoms";

interface WishlistProps {
  wishlists?: WishlistType[];
  editable?: boolean;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlists, editable }) => {
  const stateWislishts = useRecoilValue(wishlistsState);
  const shownWishlists = wishlists || stateWislishts;
  return (
    <Box mb="32px">
      <Stack spacing={4}>
        {shownWishlists?.map((wishlist: WishlistType, key) => (
          <OneWishlist wishlist={wishlist} key={key} editable={editable} />
        ))}
      </Stack>

      {editable && <AddWishlistButton />}
    </Box>
  );
};

export default Wishlist;
