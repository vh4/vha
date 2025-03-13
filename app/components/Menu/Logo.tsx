import { Flex, Text } from "@radix-ui/themes";
import { HiOutlineCodeBracket } from "react-icons/hi2";

export const Logo = () => {
  return (
    <Flex align={"center"} gap={"2"}>
      <HiOutlineCodeBracket size={28} className="text-[#ACD8FC]" />
      <Text size={"3"} className="font-extrabold text-4xl">
        <span className="text-blue-400 text-4xl">A</span>
        <span className="text-2xl">rch</span>
        <span className="text-indigo-400 text-4xl">M</span>
      </Text>
    </Flex>
  );
};
