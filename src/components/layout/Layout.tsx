import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex margin="0 auto" transition="0.5s ease-out" justifyContent="center">
      <Meta />
      <Box margin="8" width="800px">
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
