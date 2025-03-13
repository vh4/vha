import { Box } from "@radix-ui/themes";
import { Header } from "../Navbar/Navbar";

export const Layout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Box>
      <Box className="p-4 mt-8"><Header /></Box>
      <Box>{children}</Box>
    </Box>
  );
};
