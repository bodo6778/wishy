import { Box } from "@chakra-ui/react";
import AddWishlistButton from "components/wish/AddButton/AddWishlistButton";
import Wishlist from "components/wish/Wishlist";
import jwt from "jsonwebtoken";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState();

  const populateName = async () => {
    const token = localStorage.getItem("token");
    console.log("hi1");

    if (!token) return;

    console.log("hi2");
    const req = await fetch("http://localhost:3001/api/name", {
      headers: {
        "x-access-token": token,
      },
    });

    const data = await req.json();
    console.log(data);

    if (data.status === "ok") {
      setName(data.name);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        populateName();
      }
    }
  }, []);

  return (
    <Box w="100%">
      <p>Hello {name || "there"}</p>
      <p>{name}</p>
      <Wishlist />
      <AddWishlistButton />
    </Box>
  );
};

export default Home;
