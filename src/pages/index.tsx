import { Box } from "@chakra-ui/react";
import Homepage from "components/homepage/Homepage";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";
import { useEffect, useState } from "react";
import { getStorageValue } from "../../utils/functions";

const Home = () => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const token = getStorageValue("token");
    if (token !== undefined) setLogged(true);
  }, []);

  return (
    <>
      <>{logged === true && <Wishlist editable />}</>
      <>{logged === false && <Homepage />}</>
    </>
  );
};

export default Home;
