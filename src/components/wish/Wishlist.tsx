import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { WishlistType } from "types/wish";
import { useRecoilState } from "recoil";
import { getStorageValue } from "../../../utils/functions";
import OneWishlist from "components/wish/OneWishlist";
import AddWishlistButton from "./AddButton/AddWishlistButton";
import { wishlistsState } from "state/atoms";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  const [wishlists, setWishlist] = useRecoilState(wishlistsState);
  const token = getStorageValue("token");

  const populateWishlist = async () => {
    if (!token) return;
    const req = await fetch("http://localhost:3001/api/wishes/getWishlists", {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await req.json();
    setWishlist(data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    populateWishlist();
  }, []);

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
