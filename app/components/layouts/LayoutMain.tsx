import { Box } from "@radix-ui/themes";
import { Header } from "../Navbar/Navbar";

export const LayoutMain = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Box>
      <Box className="py-4 mt-0 lg:p-4"><Header /></Box>
      <Box>{children}</Box>
    </Box>
  );
};
