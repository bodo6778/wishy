import { Box, Text } from "@chakra-ui/react";
import Axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { WishType } from "types/wish";
import AddWishButton from "./AddButton/AddWishButton";
import jwt from "jsonwebtoken";
import Wish from "./Wish";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  // const [wishlist, setWishlist] = useState<WishType[]>();
  const [wishlist, setWishlist] = useState<WishType[]>();

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/").then((response: AxiosResponse) => {
  //     setWishlist(response.data);
  //   });
  // }, []);

  const populateWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const req = await fetch("http://localhost:3001/api/wishes/getWishlist", {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await req.json();
    console.log(req);

    if (req.ok === true) {
      setWishlist(data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
      } else {
        populateWishlist();
      }
    }
  }, []);

  return (
    <Box mb="32px">
      <Text mb="16px" fontWeight="bold" fontSize="24px">
        My Wishlist
      </Text>
      {wishlist?.map((wish: WishType) => (
        <Wish wish={wish} key={wish.title} />
      ))}
      <AddWishButton />
    </Box>
  );
};

export default Wishlist;
