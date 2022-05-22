import { SmallCloseIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "types/wish";
import { getStorageValue } from "../../../../utils/functions";

interface LinkBarProps {
  link: Link;
  setLinksState: React.Dispatch<React.SetStateAction<Link[]>>;
  wishTitle: string;
  wishlistTitle: string;
}

const LinkBar: React.FC<LinkBarProps> = ({
  link,
  setLinksState,
  wishTitle,
  wishlistTitle,
}) => {
  const deleteLink = async () => {
    const token = getStorageValue("token");
    if (!token) return;

    try {
      await fetch("http://localhost:3001/api/wishes/deleteLink", {
        method: "DELETE",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlistTitle: wishlistTitle,
          wishTitle: wishTitle,
          linkTitle: link.link,
        }),
      });

      setLinksState((prevLinks) =>
        prevLinks.filter((l) => l.link !== link.link)
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        onClick={deleteLink}
      />
    </Flex>
  );
};

export default LinkBar;
