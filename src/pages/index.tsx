import { Box } from "@chakra-ui/react";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";

const Home = () => {
  return (
    <Box w="100%">
      <Wishlist />

      <AddWishlistButton />
    </Box>
  );
};

export default Home;
