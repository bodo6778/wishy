import { Box, IconButton, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { wishlist } from "database/wishlist";
import React, { useState } from "react";
import { WishlistType, WishType } from "types/wish";
import AddWishButton from "./AddButton/AddWishButton";
import Wish from "./Wish";
import { getStorageValue } from "../../../utils/functions";
import DeleteButton from "./DeleteButton/DeleteButton";

interface OneWishlistProps {
  wishlist: WishlistType;
}

const OneWishlist: React.FC<OneWishlistProps> = ({ wishlist }) => {
  const [showDeleteButton, setShowDeleteButton] = useState("none");
  const title = wishlist.title;

  const deleteWishlist = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    const response = await fetch("http://localhost:3001/api/wishlist/delete", {
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
    if (data.status !== "ok") {
      console.log(data);
    }
  };

  return (
    <>
      <Text
        mb="16px"
        fontWeight="bold"
        fontSize="24px"
        onMouseEnter={(e) => {
          setShowDeleteButton("block");
        }}
        onMouseLeave={(e) => {
          setShowDeleteButton("none");
        }}
        position="relative"
      >
        {wishlist.title}

        <DeleteButton
          showDeleteButton={showDeleteButton}
          onClick={deleteWishlist}
        />
      </Text>

      {wishlist.wishes?.map((wish: WishType) => {
        return (
          <Wish wish={wish} key={wish.title} wishlistTitle={wishlist.title} />
        );
      })}
      <AddWishButton wishlistTitle={wishlist.title} />
    </>
  );
};

export default OneWishlist;
