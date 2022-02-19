import { StarIcon } from "@chakra-ui/icons";
import { Text, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { WishType } from "types/wish";

interface WishProps {
  wish: WishType;
}

const Wish: React.FC<WishProps> = ({ wish }) => {
  return (
    <Flex
      w="100%"
      backgroundColor="blackAlpha.200"
      mb="8px"
      justifyContent="space-between"
      px="8px"
      pt="4px"
      borderRadius="4px"
    >
      <Box>
        <Text>{wish.title}</Text>
        <Text color="blackAlpha.400" fontSize="16px">
          {wish.description}
        </Text>
      </Box>
      <Box p="4px">
        <Text>{wish.price}$</Text>
        {[...Array(wish.need)].map((star) => (
          <StarIcon color="yellow.500" size="1rem" />
        ))}
      </Box>
    </Flex>
  );
};

export default Wish;
