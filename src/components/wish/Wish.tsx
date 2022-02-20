import { ChevronLeftIcon, StarIcon } from "@chakra-ui/icons";
import { Text, Flex, Box, SimpleGrid, Collapse } from "@chakra-ui/react";
import React, { useState } from "react";
import { WishType } from "types/wish";

interface WishProps {
  wish: WishType;
}

const Wish: React.FC<WishProps> = ({ wish }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box mb="8px">
      <Flex
        w="100%"
        justifyContent="space-between"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.08)"
        px="8px"
        pt="4px"
        borderRadius="8px"
        backgroundColor="white"
      >
        <Text px="4px">{wish.title}</Text>

        <Flex py="4px">
          <Text color="blackAlpha.400" fontSize="16px" px="4px">
            {wish.description}
          </Text>
          <Text color="blackAlpha.400" px="4px">
            {wish.price}$
          </Text>
          <Flex px="4px" alignItems="center">
            {[...Array(wish.need)].map((star) => (
              <StarIcon color="yellow.500" size="1rem" p="1px" />
            ))}
            {[...Array(3 - wish.need)].map((star) => (
              <StarIcon
                color="transparent"
                size="1rem"
                stroke="yellow.500"
                p="1px"
              />
            ))}
          </Flex>
          <ChevronLeftIcon
            w={6}
            h={6}
            onClick={() => setCollapsed(!collapsed)}
            transition="0.2s ease"
            transform={collapsed ? "rotate(-90deg)" : "rotate(0deg)"}
          />
        </Flex>
      </Flex>

      {/* show when collapsed */}
      {/* {collapsed && ( */}
      <Collapse in={collapsed}>
        <Box w="100%" px="8px">
          <SimpleGrid
            backgroundColor="#E4E4E4"
            p="8px"
            borderBottomRadius="8px"
            w="100%"
            columns={1}
            rowGap="8px"
          >
            {wish.links?.map((link) => (
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
                    {[...Array(link.pricy)].map((star) => (
                      <>$</>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Wish;
