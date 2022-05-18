import { ChevronLeftIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Box,
  SimpleGrid,
  Collapse,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { WishType } from "types/wish";
import DeleteButton from "./DeleteButton/DeleteButton";
import AddLink from "./link/AddLink";
import LinkBar from "./link/LinkBar";

interface WishProps {
  wish: WishType;
  wishlistTitle: string;
}

const Wish: React.FC<WishProps> = ({ wish, wishlistTitle }) => {
  const [showDeleteButton, setShowDeleteButton] = useState("none");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box mb="12px">
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.08)"
        px="8px"
        py="4px"
        borderRadius="8px"
        backgroundColor="white"
        onMouseEnter={(e) => {
          setShowDeleteButton("block");
        }}
        onMouseLeave={(e) => {
          setShowDeleteButton("none");
        }}
        position="relative"
      >
        <DeleteButton
          showDeleteButton={showDeleteButton}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          top="-8px"
        />
        <Text px="4px">{wish.title}</Text>

        <Flex py="4px">
          <Text color="blackAlpha.400" fontSize="16px" px="4px">
            {wish.description}
          </Text>
          <Text color="blackAlpha.400" px="4px">
            {wish.price}$
          </Text>
          <Flex px="4px" alignItems="center">
            {[...Array(wish.need)].map((_, index) => (
              <StarIcon color="yellow.500" size="1rem" p="1px" key={index} />
            ))}
            {[...Array(3 - wish.need)].map((_, index) => (
              <StarIcon
                color="transparent"
                size="1rem"
                stroke="yellow.500"
                p="1px"
                key={index}
              />
            ))}
          </Flex>
          <ChevronLeftIcon
            w={6}
            h={6}
            onClick={() => setCollapsed(!collapsed)}
            _hover={{
              cursor: "pointer",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
            }}
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
            {wish.links?.map((link, index) => (
              <LinkBar link={link} key={index} />
            ))}
            <Flex justifyContent="flex-end">
              <AddLink wishTitle={wish.title} wishlistTitle={wishlistTitle} />
            </Flex>
          </SimpleGrid>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Wish;
