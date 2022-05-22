import { Box, Collapse, Flex, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, WishType } from "types/wish";
import { getStorageValue } from "../../../../utils/functions";
import AddLink from "./AddLink";
import LinkBar from "./LinkBar";

interface LinkListProps {
  collapsed: boolean;
  wish: WishType;
  wishlistTitle: string;
}

const LinkList: React.FC<LinkListProps> = ({
  collapsed = false,
  wish,
  wishlistTitle,
}) => {
  const [linksState, setLinksState] = useState(wish.links || []);

  return (
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
          {linksState &&
            linksState.map((link, index) => (
              <LinkBar
                link={link}
                key={index}
                wishTitle={wish.title}
                wishlistTitle={wishlistTitle}
                setLinksState={setLinksState}
              />
            ))}
          <Flex justifyContent="flex-end">
            <AddLink
              wishTitle={wish.title}
              wishlistTitle={wishlistTitle}
              onClick={setLinksState}
            />
          </Flex>
        </SimpleGrid>
      </Box>
    </Collapse>
  );
};

export default LinkList;
