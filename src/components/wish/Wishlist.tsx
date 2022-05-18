import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { WishlistType, WishType } from "types/wish";
import AddWishButton from "./AddButton/AddWishButton";
import Wish from "./Wish";
import { useRecoilValue } from "recoil";
import { getStorageValue } from "../../../utils/functions";
import { CloseIcon } from "@chakra-ui/icons";
import OneWishlist from "components/wish/OneWishlist";
import AddWishlistButton from "./AddButton/AddWishlistButton";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  const [wishlists, setWishlist] = useState<WishlistType[]>([]);
  const token = getStorageValue("token");

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/").then((response: AxiosResponse) => {
  //     setWishlist(response.data);
  //   });
  // }, []);

  const populateWishlist = async () => {
    if (!token) return;

    const req = await fetch("http://localhost:3001/api/wishes/getWishlists", {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await req.json();

    if (req.ok === true) {
      setWishlist(data);
    }
  };

  useEffect(() => {
    if (!token) return;
    populateWishlist();
  }, []);

  return (
    <Box mb="32px">
      {wishlists?.map((wishlist: WishlistType) => (
        <OneWishlist wishlist={wishlist} />
      ))}
      <AddWishlistButton wishlists={wishlists} setWishlist={setWishlist} />
    </Box>
  );
};

export default Wishlist;
