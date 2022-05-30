import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRecoilValue } from "recoil";
import { userState, wishlistsState } from "state/atoms";
import { UserProfile } from "types/wish";
import { getStorageValue } from "../../../utils/functions";

interface OwnProps {
  user: UserProfile;
}

const OwnProfile: NextPage<OwnProps> = ({ user }) => {
  const { name, username, wishlists } = user;
  const token = getStorageValue("token");

  const getNumberOfWishes = wishlists.reduce(
    (count, current) => count + current.wishes.length,
    0
  );

  if (!token) return <></>;

  return (
    <Box>
      <Text fontSize="3xl">
        Hello, <b>{name}</b>! This is your profile.
      </Text>
      <Text fontSize="md">Here you can see your stats.</Text>
      <Box h={10}></Box>
      <Text>
        Currently you have {wishlists.length} wishlist
        {wishlists.length !== 1 && "s"} with a total of {getNumberOfWishes} wish
        {getNumberOfWishes !== 1 && "es"}.
      </Text>
      <Text mb={4}>Share your profile to show your friends what you wish!</Text>
    </Box>
  );
};

//ducesa
export default OwnProfile;
