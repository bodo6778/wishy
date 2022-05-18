import { Box } from "@chakra-ui/react";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";

const Home = () => {
  return (
    <Box w="100%">
      <p>Hello there</p>
      <Wishlist />
    </Box>
  );
};

export default Home;
