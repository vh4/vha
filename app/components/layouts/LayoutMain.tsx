import { Box } from "@radix-ui/themes";
import { Header } from "../Navbar/Navbar";

export const LayoutMain = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Box>
      <Box className="pt-4 pb-2 mt-0 lg:mt-4"><Header /></Box>
      <Box>{children}</Box>
    </Box>
  );
};
