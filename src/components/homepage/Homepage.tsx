import { Box, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import "@fontsource/grape-nuts";
import React from "react";
import Hero from "styles/hero";
import { getStorageValue } from "../../../utils/functions";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  const token = getStorageValue("token");
  const heroSize = useBreakpointValue({
    base: { height: "215", width: "200" },
    md: { height: "429", width: "400" },
  }) || { height: "429", width: "400" };

  if (token) return null;
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Hero width={heroSize?.width} height={heroSize?.height} />

      <Flex
        direction="column"
        alignItems="center"
        w={{ base: "70%", md: "60%", lg: "40%" }}
      >
        <Heading as="h1" size="3xl" textShadow="0px 0px 4px rgba(0,0,0,0.3)">
          Wishy
        </Heading>
        <Text
          fontFamily="Grape Nuts, cursive"
          fontSize="5xl"
          position="relative"
          color="orange.300"
          top="-50px"
          left="-24px"
          transform="rotate(3deg)"
          transformOrigin="top left"
          textShadow="1px 1px rgba(0,0,0,0.8)"
        >
          Lists you need
        </Text>
        <Text textAlign="justify">
          Always remember what you wished, in an organized manner and never run
          out of gift ideas!
        </Text>
      </Flex>
    </Flex>
  );
};

export default Homepage;
