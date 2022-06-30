import Homepage from "components/homepage/Homepage";
import Wishlist from "components/wish/Wishlist";
import { useEffect, useState } from "react";
import { getStorageValue } from "../../utils/functions";

const Home = () => {
  console.log(process.env.API_URL);

  const [token, setToken] = useState<string | undefined>(undefined);
  useEffect(() => {
    setToken(getStorageValue("token"));
  }, []);
  return (
    <>
      <>{token && <Wishlist editable />}</>
      <>{!token && <Homepage />}</>
    </>
  );
};

export default Home;
