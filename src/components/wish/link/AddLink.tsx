import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "types/wish";
import { getStorageValue } from "../../../../utils/functions";
import AddButton from "../AddButton/AddButton";

interface AddLinkProps {
  wishTitle: string;
  wishlistTitle: string;
  onClick: Dispatch<SetStateAction<Link[]>>;
}

const AddLink: React.FC<AddLinkProps> = ({
  wishTitle,
  wishlistTitle,
  onClick,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [link, setLink] = useState("");
  const [pricy, setPricy] = useState("");
  const [price, setPrice] = useState("");

  const handleLinkChange = (e: any) => setLink(e.target.value);
  const handlePricyChange = (e: any) => setPricy(e.target.value.slice(0, 1));
  const handlePriceChange = (e: any) => setPrice(e.target.value);

  const addLink = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    try {
      await fetch("https://wishy-backend.vercel.app/api/wishes/addLink", {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlistTitle,
          wishTitle,
          link,
          price,
          pricy,
        }),
      });

      const newLink: Link = {
        link: link,
        price: parseInt(price),
        pricy: parseInt(pricy),
      };
      onClick((prevLinks) => [...prevLinks, newLink]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showForm ? (
        <>
          <form onSubmit={addLink}>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Input
                placeholder="Link"
                id="link"
                value={link}
                onChange={handleLinkChange}
              />
              <Input
                placeholder="Price"
                id="price"
                value={price}
                type="number"
                onChange={handlePriceChange}
              />

              <FormControl>
                <Select
                  id="pricy"
                  placeholder="How pricy?"
                  onChange={handlePricyChange}
                >
                  <option>1 - Can buy now</option>
                  <option>2 - Affordable</option>
                  <option>3 - Over budget</option>
                </Select>
              </FormControl>

              <AddButton
                customType="wish"
                type="submit"
                text="Add"
                icon={<CheckCircleIcon color="#9B9B9B" w={4} h={4} mr="4px" />}
                onClick={() => {
                  addLink();
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
            </HStack>
          </form>
        </>
      ) : (
        <Button
          size="sm"
          colorScheme="teal"
          onClick={() => setShowForm(!showForm)}
        >
          Add Link
        </Button>
      )}
    </>
  );
};

export default AddLink;
