import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { WishlistType, WishType } from "types/wish";
import AddWishButton from "./AddButton/AddWishButton";
import Wish from "./Wish";
import { useRecoilValue } from "recoil";
import { getStorageValue } from "../../../utils/functions";

interface WishlistProps {}

const Wishlist: React.FC<WishlistProps> = () => {
  const [wishlists, setWishlist] = useState<WishlistType[]>();
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
        <>
          <Text mb="16px" fontWeight="bold" fontSize="24px">
            {wishlist.title}
          </Text>
          {wishlist.wishes?.map((wish: WishType) => {
            return (
              <Wish
                wish={wish}
                key={wish.title}
                wishlistTitle={wishlist.title}
              />
            );
          })}
          <AddWishButton wishlistTitle={wishlist.title} />
        </>
      ))}
    </Box>
  );
};

export default Wishlist;
