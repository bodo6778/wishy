import { CloseIcon } from "@chakra-ui/icons";
import { Button, IconProps } from "@chakra-ui/react";
import React from "react";

interface DeleteButtonProps {
  showDeleteButton: string;
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps & IconProps> = ({
  showDeleteButton,
  onClick,
  ...props
}) => {
  return (
    <CloseIcon
      aria-label="Delete Wishlist"
      display={showDeleteButton}
      p={1}
      w={4}
      h={4}
      bg="red"
      size="xs"
      borderRadius="100%"
      position="absolute"
      top="0px"
      left="-8px"
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
      {...props}
    />
  );
};

export default DeleteButton;
