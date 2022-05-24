import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, IconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps & IconButtonProps> = ({
  onClick,
  ...props
}) => {
  return (
    <IconButton
      icon={<DeleteIcon color="red" />}
      bg="transparent"
      _hover={{
        backgroundColor: "transparent",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
      }}
      onClick={onClick}
      {...props}
    />
  );
};

export default DeleteButton;
