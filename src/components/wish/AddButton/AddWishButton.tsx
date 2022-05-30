import { AddIcon, CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  IconButton,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { wishlistsState } from "state/atoms";
import { WishType } from "types/wish";
import { getStorageValue } from "../../../../utils/functions";
import AddButton from "./AddButton";

interface AddWishButtonProps {
  wishlistTitle: string;
}

const AddWishButton: React.FC<AddWishButtonProps> = ({ wishlistTitle }) => {
  const setWishlist = useSetRecoilState(wishlistsState);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [need, setNeed] = useState("");

  const handleTitleChange = (e: any) => setTitle(e.target.value);
  const handleDescriptionChange = (e: any) => setDescription(e.target.value);
  const handlePriceChange = (e: any) => setPrice(e.target.value);
  const handleNeedChange = (e: any) => setNeed(e.target.value.slice(0, 1));

  const addWish = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    try {
      await fetch("https://wishy-backend.vercel.app/api/wishes/add", {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlistTitle,
          title,
          description,
          price,
          need,
        }),
      });

      const newWish: WishType = {
        title: title,
        description: description,
        price: parseInt(price),
        need: parseInt(need),
        links: [],
      };

      setWishlist((prevWishlists) => {
        // Find the wishlish by the title and concatanete newWish with wishlist.wishes
        const newWishes = prevWishlists
          .find((w) => w.title === wishlistTitle)
          ?.wishes?.concat(newWish);

        return newWishes // Null check for newWish
          ? prevWishlists.map(
              (wishlist) =>
                wishlist.title === wishlistTitle //This should find only the wishlish that we search for, because the wishlists have unique titles.
                  ? { ...wishlist, wishes: newWishes }
                  : wishlist // Use .map to find the wishlist we want to modify by it's title. If found, return the wishlist and add wishes: newWishes. If not, return the wishlist as is
            )
          : prevWishlists; // Return previous state value if newWish is null
      });
      // replace tempWishes la whislists[title].wishes sau adauga la el

      // const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showForm ? (
        <>
          <form onSubmit={addWish}>
            <Stack gap={1}>
              <Input
                placeholder="Title"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
              <Input
                placeholder="Description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
              <Input
                placeholder="Price"
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
              />
              <FormControl>
                <Select
                  id="need"
                  placeholder="Need"
                  onChange={handleNeedChange}
                >
                  <option>1 - Can live without it</option>
                  <option>2 - Good to have</option>
                  <option>3 - Should have it ASAP</option>
                </Select>
              </FormControl>

              <Flex justifyContent="space-between" alignItems="center">
                <AddButton
                  customType="wish"
                  type="submit"
                  text="Add"
                  icon={
                    <CheckCircleIcon color="#9B9B9B" w={4} h={4} mr="4px" />
                  }
                  width="96%"
                  onClick={() => {
                    setShowForm(!showForm);
                    setTitle("");
                    setDescription("");
                    setPrice("");
                    setNeed("");
                    addWish();
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
            </Stack>
          </form>
        </>
      ) : (
        <AddButton
          customType="wish"
          text="Add Wish"
          icon={<AddIcon color="#9B9B9B" w={4} h={4} mr="4px" />}
          onClick={() => setShowForm(!showForm)}
        />
      )}
    </>
  );
};

export default AddWishButton;
