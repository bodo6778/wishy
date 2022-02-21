import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { Component, ReactNode } from "react";

interface AddWishButtonProps {
  type: "wish" | "wishlist";
  text: string;
  icon: ReactNode;
}

const AddWishlistButton: React.FC<AddWishButtonProps> = ({
  type,
  text,
  icon,
}) => {
  return (
    <Button
      colorScheme="none"
      borderRadius="8px"
      border="2px dashed #DCDCDC"
      p="12px"
      color="#9B9B9B"
      width={type === "wishlist" ? "fit-content" : "100%"}
      alignItems="center"
      backgroundColor="transparent"
      _hover={{
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        background: "none",
      }}
      _active={{
        borderColor: "#9B9B9B",
        outline: "none",
      }}
      _focus={{
        outline: "none",
      }}
    >
      {icon}
      {text}
    </Button>
  );
};

export default AddWishlistButton;
