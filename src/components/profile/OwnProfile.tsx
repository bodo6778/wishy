import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useRecoilValue } from "recoil";
import { userState } from "state/atoms";
import { UserProfile } from "types/wish";
import { getStorageValue } from "../../../utils/functions";

interface OwnProps {
  user: UserProfile;
}

const OwnProfile: NextPage<OwnProps> = ({ user }) => {
  const { name, username, wishlists } = user;
  const ownUsername = useRecoilValue(userState).username;
  const token = getStorageValue("token");
  const router = useRouter();
  const toast = useToast();

  const getNumberOfWishes = wishlists.reduce(
    (count, current) => count + current.wishes.length,
    0
  );

  if (!token || ownUsername !== username)
    return (
      <>
        <Text fontSize="xl" mb={6}>
          This is <b>{user.name}</b>&apos;s profile. Take a look at it&apos;s
          wishes:
        </Text>
      </>
    );

  return (
    <Box>
      <Text fontSize="3xl">
        Hello, <b>{name}</b>! This is your profile.
      </Text>
      <Text fontSize="md">Here you can see your stats.</Text>
      <Box h={10}></Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Text>
            Currently you have {wishlists.length} wishlist
            {wishlists.length !== 1 && "s"} with a total of {getNumberOfWishes}{" "}
            wish
            {getNumberOfWishes !== 1 && "es"}.
          </Text>
          <Text mb={4}>
            Share your profile to show your friends what you wish!
          </Text>
        </Box>
        <Button
          leftIcon={<ExternalLinkIcon />}
          colorScheme="yellow"
          variant="outline"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://wishy.vercel.app${router.asPath}`
            );
            toast({
              title: "Link copied!",
              status: "success",
              isClosable: true,
            });
          }}
        >
          Share
        </Button>
      </Flex>
    </Box>
  );
};

//ducesa
export default OwnProfile;
