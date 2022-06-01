import {
  AddIcon,
  CheckCircleIcon,
  CloseIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { Input, Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { wishlistsState } from "state/atoms";
import { WishlistType } from "types/wish";
import { getStorageValue } from "../../../../utils/functions";
import AddButton from "./AddButton";

interface AddWishlistButtonProps {}

const AddWishlistButton: React.FC<AddWishlistButtonProps> = ({}) => {
  const setWishlist = useSetRecoilState(wishlistsState);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handleTitleChange = (e: any) => setTitle(e.target.value);
  const handleDescriptionChange = (e: any) => setDescription(e.target.value);
  const addWishlist = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    const response = await fetch(
      // "http://localhost:3001/api/wishlist/add",
      "https://wishy-backend.vercel.app/api/wishlist/add",
      {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }
    );

    if (response.status === 200) {
      const newWishlist: WishlistType = {
        title: title,
        description: description,
        wishes: [],
      };
      setWishlist((prev: WishlistType[]) => prev.concat(newWishlist));
    } else {
      toast({
        title: "Wishlist already exists!",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      {showForm ? (
        <>
          <form onSubmit={addWishlist}>
            <Flex justifyContent="space-between" alignItems="center" mt={8}>
              <Input
                placeholder="Title"
                id="title"
                value={title}
                onChange={handleTitleChange}
                width="38%"
              />
              <Input
                placeholder="Description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                width="38%"
              />

              <AddButton
                type="submit"
                customType="wishlist"
                text="Add Wishlist"
                icon={<CheckCircleIcon color="#9B9B9B" w={4} h={4} mr="4px" />}
                onClick={() => {
                  addWishlist();
                  setShowForm(!showForm);
                }}
              />
              <IconButton
                aria-label="Delete Wishlist"
                icon={<SmallCloseIcon />}
                colorScheme="red"
                size="xs"
                onClick={() => setShowForm(!showForm)}
              />
            </Flex>
          </form>
        </>
      ) : (
        <AddButton
          mt={8}
          customType="wishlist"
          text="Add Wishlist"
          icon={<AddIcon color="#9B9B9B" w={4} h={4} mr="4px" />}
          onClick={() => setShowForm(!showForm)}
        />
      )}
    </>
  );
};

export default AddWishlistButton;
