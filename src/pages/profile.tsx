import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, wishlistsState } from "state/atoms";
import { getStorageValue } from "../../utils/functions";

const Profile = () => {
  const wishlists = useRecoilValue(wishlistsState);
  const [profile, setProfile] = useRecoilState(userState);
  const token = getStorageValue("token");

  const populateProfile = async () => {
    if (!token) return;
    const req = await fetch("http://localhost:3001/api/users/getProfile", {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await req.json();
    setProfile(data);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    populateProfile();
  }, []);

  const getNumberOfWishes = wishlists.reduce(
    (count, current) => count + current.wishes.length,
    0
  );

  return (
    <Box>
      <Text fontSize="3xl">
        Hello, <b>{profile.name}</b>! This is your profile.
      </Text>
      <Text fontSize="md">
        Here you can see your stats and change your settings.
      </Text>
      <Box h={10}></Box>
      <Text>
        Currently you have {wishlists.length} wishlist
        {wishlists.length !== 1 && "s"} with a total of {getNumberOfWishes} wish
        {getNumberOfWishes !== 1 && "es"}.
      </Text>
    </Box>
  );
};

//ducesa
export default Profile;
