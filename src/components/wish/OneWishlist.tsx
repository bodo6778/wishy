import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { WishlistType, WishType } from "types/wish";
import AddWishButton from "./AddButton/AddWishButton";
import Wish from "./Wish";
import { getStorageValue } from "../../../utils/functions";
import DeleteButton from "./DeleteButton/DeleteButton";
import { useRecoilState } from "recoil";
import { wishlistsState } from "state/atoms";

interface OneWishlistProps {
  wishlist: WishlistType;
}

const OneWishlist: React.FC<OneWishlistProps> = ({ wishlist }) => {
  const [wishlists, setWishlist] = useRecoilState(wishlistsState);

  const title = wishlist.title;

  const deleteWishlist = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    const response = await fetch(
      "https://wishy-backend.vercel.app/api/wishlist/delete",
      {
        method: "DELETE",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    );

    const data = await response.json();
    if (data.status === "ok") {
      setWishlist(wishlists.filter((wishlist) => wishlist.title !== title)); // Filter the wishlists[] by title to delete the current wishlist
    }
    if (data.status !== "ok") {
      console.log(data);
    }
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="24px" position="relative">
          {wishlist.title}
        </Text>
        <DeleteButton aria-label="Delete Wishlist" onClick={deleteWishlist} />
      </Flex>

      {wishlist.wishes?.map((wish: WishType, key) => {
        return <Wish wish={wish} wishlistTitle={wishlist.title} key={key} />;
      })}
      <AddWishButton wishlistTitle={wishlist.title} />
    </>
  );
};

export default OneWishlist;
