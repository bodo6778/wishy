import { Box } from "@chakra-ui/react";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";
import { useRecoilValue } from "recoil";
import { userState } from "state/atoms";

const Home = () => {
  const name = useRecoilValue(userState).name;

  return (
    <Box w="100%">
      <p>Hello {name || "there"}</p>
      <Wishlist />
      <AddWishlistButton />
    </Box>
  );
};

export default Home;
