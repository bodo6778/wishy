import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";
import React from "react";

interface HideButtonProps {
  onClick: () => void;
  hidden: boolean;
}

const HideButton: React.FC<HideButtonProps & IconButtonProps> = ({
  onClick,
  hidden = true,
  ...props
}) => {
  return (
    <Tooltip
      label="Make wish private"
      aria-label="Hide wishlist"
      borderRadius={4}
    >
      <IconButton
        icon={hidden ? <ViewOffIcon /> : <ViewIcon />}
        bg="transparent"
        _hover={{
          backgroundColor: "transparent",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        }}
        onClick={onClick}
        {...props}
      />
    </Tooltip>
  );
};

export default HideButton;
