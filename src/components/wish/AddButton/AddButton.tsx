import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonProps, Flex } from "@chakra-ui/react";
import React, { Component, ReactNode } from "react";

interface AddButtonProps {
  customType: "wish" | "wishlist";
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  type?: string;
}

const AddWishlistButton: React.FC<AddButtonProps & ButtonProps> = ({
  customType,
  text,
  icon,
  onClick,
  type,
  ...props
}) => {
  return (
    <Button
      colorScheme="none"
      borderRadius="8px"
      border="2px dashed #DCDCDC"
      p="12px"
      color="#9B9B9B"
      width={customType === "wishlist" ? "fit-content" : "100%"}
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
      onClick={onClick}
      type={type}
      {...props}
    >
      {icon}
      {text}
    </Button>
  );
};

export default AddWishlistButton;
