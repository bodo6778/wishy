import { Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { WishlistType, WishType } from "types/wish";
import AddWishButton from "./AddButton/AddWishButton";
import Wish from "./Wish";
import { getStorageValue } from "../../../utils/functions";
import DeleteButton from "./DeleteButton/DeleteButton";
import { useRecoilState } from "recoil";
import { wishlistsState } from "state/atoms";
import HideButton from "./HideButton/HideButton";

interface OneWishlistProps {
  wishlist: WishlistType;
  editable?: boolean;
}

const OneWishlist: React.FC<OneWishlistProps> = ({ wishlist, editable }) => {
  const [wishlists, setWishlist] = useRecoilState(wishlistsState);

  const title = wishlist.title;

  const deleteWishlist = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    const response = await fetch(`${process.env.API_URL}/wishlist/delete`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      setWishlist(wishlists.filter((wishlist) => wishlist.title !== title)); // Filter the wishlists[] by title to delete the current wishlist
    }
    if (data.status !== "ok") {
      console.log(data);
    }
  };

  const hideWishlist = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    const response = await fetch(`${process.env.API_URL}/wishlist/hide`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        hidden: !wishlist.hidden,
      }),
    });

    setWishlist((prevWishlists) =>
      prevWishlists.map((wishlist) =>
        wishlist.title === title
          ? { ...wishlist, hidden: !wishlist.hidden }
          : wishlist
      )
    );
    console.log(wishlists);
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="24px" position="relative">
          {wishlist.title}
        </Text>
        {editable && (
          <Flex>
            <HideButton
              aria-label="Hide Wishlist"
              hidden={wishlist.hidden}
              onClick={hideWishlist}
            />
            <DeleteButton
              aria-label="Delete Wishlist"
              onClick={deleteWishlist}
            />
          </Flex>
        )}
      </Flex>

      {wishlist.wishes?.map((wish: WishType, key) => {
        return (
          <Wish
            wish={wish}
            wishlistTitle={wishlist.title}
            editable={editable}
            key={key}
          />
        );
      })}
      {editable && <AddWishButton wishlistTitle={wishlist.title} />}
    </>
  );
};

export default OneWishlist;
