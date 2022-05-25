import { Box } from "@chakra-ui/react";
import Homepage from "components/homepage/Homepage";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";
import { getStorageValue } from "../../utils/functions";

const Home = () => {
  const token = getStorageValue("token");
  return <>{token ? <Wishlist /> : <Homepage />}</>;
};

export default Home;
