import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "types/wish";

interface LinkBarProps {
  link: Link;
  onDelete?: () => void;
}

const LinkBar: React.FC<LinkBarProps> = ({ link, onDelete }) => {
  return (
    <Flex>
      <Flex
        backgroundColor="white"
        w="100%"
        borderRadius="8px"
        justifyContent="space-between"
        p="4px"
      >
        <Text color="blackAlpha.400" fontSize="16px" px="4px">
          {link.link}
        </Text>
        <Flex>
          <Text color="blackAlpha.400" px="4px">
            {link.price}$
          </Text>
          <Flex px="4px" alignItems="center">
            {[...Array(link.pricy)].map((_, key) => (
              <p key={key}>$</p>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <IconButton
        aria-label="Delete Link"
        icon={<SmallCloseIcon color="red" />}
        bg="transparent"
        size="sm"
        onClick={onDelete}
      />
    </Flex>
  );
};

export default LinkBar;
