import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import AddButton from "./AddButton";

const AddWishlistButton: React.FC = () => {
  return (
    <AddButton
      customType="wishlist"
      text="Add Wishlist"
      icon={<AddIcon color="#9B9B9B" w={4} h={4} mr="4px" />}
    />
  );
};

export default AddWishlistButton;
