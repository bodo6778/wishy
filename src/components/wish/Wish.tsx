import { ChevronLeftIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  Collapse,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { wishlistsState } from "state/atoms";
import { WishType } from "types/wish";
import { getStorageValue } from "../../../utils/functions";
import DeleteButton from "./DeleteButton/DeleteButton";
import AddLink from "./link/AddLink";
import LinkBar from "./link/LinkBar";
import LinkList from "./link/LinkList";

interface WishProps {
  wish: WishType;
  wishlistTitle: string;
}

const Wish: React.FC<WishProps> = ({ wish, wishlistTitle }) => {
  const setWishlist = useSetRecoilState(wishlistsState);
  const [collapsed, setCollapsed] = useState(false);

  const deleteWishlist = async () => {
    const token = getStorageValue("token");
    if (!token) return;
    const wishToDeleteTitle = wish?.title;

    try {
      await fetch("http://localhost:3001/api/wishes/delete", {
        method: "DELETE",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlistTitle,
          wishTitle: wishToDeleteTitle,
        }),
      });
      setWishlist((prevWishlist) => {
        // Find the wishlish by the title and filter wishlist.wishes so the current wish is deleted
        // newWishes[] is the new array that does not contain the current Wish
        const newWishes = prevWishlist
          .find((w) => w.title === wishlistTitle)
          ?.wishes?.filter((wish) => wish.title !== wishToDeleteTitle);

        return newWishes // Null check for newWish
          ? prevWishlist.map((wishlist) =>
              wishlist.title === wishlistTitle //This should find only the wishlish that we search for, because the wishlists have unique titles.
                ? { ...wishlist, wishes: newWishes } // If the current wishlist is found, modify it's wishes[] with newWishes[]
                : wishlist
            )
          : prevWishlist; // Return previous state value if newWish is null
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mb="12px">
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.08)"
        px="8px"
        py="4px"
        borderRadius="8px"
        backgroundColor="white"
      >
        <Text px="4px" color="black">
          {wish.title}
        </Text>

        <Flex py="4px">
          <Text color="blackAlpha.400" fontSize="16px" px="4px">
            {wish.description}
          </Text>
          <Text color="blackAlpha.400" px="4px">
            {wish.price}$
          </Text>
          <Flex px="4px" alignItems="center">
            {[...Array(wish.need)].map((_, index) => (
              <StarIcon color="yellow.500" size="1rem" p="1px" key={index} />
            ))}
            {[...Array(3 - wish.need)].map((_, index) => (
              <StarIcon
                color="transparent"
                size="1rem"
                stroke="yellow.500"
                p="1px"
                key={index}
              />
            ))}
          </Flex>
          <DeleteButton
            onClick={deleteWishlist}
            aria-label="Delete Wish"
            size="xs"
          />

          <ChevronLeftIcon
            w={6}
            h={6}
            onClick={() => setCollapsed(!collapsed)}
            _hover={{
              cursor: "pointer",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
            }}
            transition="0.2s ease"
            transform={collapsed ? "rotate(-90deg)" : "rotate(0deg)"}
          />
        </Flex>
      </Flex>

      {/* show when collapsed */}
      {/* {collapsed && ( */}
      <LinkList
        collapsed={collapsed}
        wish={wish}
        wishlistTitle={wishlistTitle}
      />
    </Box>
  );
};

export default Wish;
