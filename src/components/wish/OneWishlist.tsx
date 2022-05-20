import { Text } from "@chakra-ui/react";
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
    if (data.status === "ok") {
      setWishlist(wishlists.filter((wishlist) => wishlist.title !== title)); // Filter the wishlists[] by title to delete the current wishlist
    }
    if (data.status !== "ok") {
      console.log(data);
    }
  };

  console.log(wishlists);

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

      {wishlist.wishes?.map((wish: WishType, key) => {
        return <Wish wish={wish} wishlistTitle={wishlist.title} key={key} />;
      })}
      <AddWishButton wishlistTitle={wishlist.title} />
    </>
  );
};

export default OneWishlist;
