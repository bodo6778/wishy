import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { userState, wishlistsState } from "state/atoms";
import { getStorageValue } from "../../utils/functions";

const Profile = () => {
  const wishlists = useRecoilValue(wishlistsState);
  const profile = useRecoilValue(userState);
  const token = getStorageValue("token");

  const getNumberOfWishes = wishlists.reduce(
    (count, current) => count + current.wishes.length,
    0
  );

  if (!token) return <></>;

  return (
    <Box>
      <Text fontSize="3xl">
        Hello, <b>{profile.name}</b>! This is your profile.
      </Text>
      <Text fontSize="md">Here you can see your stats.</Text>
      <Box h={10}></Box>
      <Text>
        Currently you have {wishlists.length} wishlist
        {wishlists.length !== 1 && "s"} with a total of {getNumberOfWishes} wish
        {getNumberOfWishes !== 1 && "es"}.
      </Text>
      <Text>
        Your email is <b>{profile.email}</b> and your username is{" "}
        <b>@{profile.username}</b>
      </Text>
    </Box>
  );
};

//ducesa
export default Profile;
