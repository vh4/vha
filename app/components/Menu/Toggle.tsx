"use client";

import React, { RefObject, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { WiMoonAltThirdQuarter } from "react-icons/wi";
import { useTheme } from "next-themes";
import { Flip } from "gsap/Flip";
import gsap from "gsap";

gsap.registerPlugin(Flip);

interface isOpenProps {
  isMenuOpen: boolean;
  menuToggleRef: RefObject<HTMLDivElement | null>;
}
export const Toggle: React.FC<isOpenProps> = ({
  isMenuOpen,
  menuToggleRef,
}) => {
  const router = useRouter();
  const [language, setLanguage] = useState("");
  const opacity = isMenuOpen ? "opacity-100" : "opacity-0 lg:opacity-100";
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedLocale = Cookies.get("locale");
    if (storedLocale) {
      setLanguage(storedLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      Cookies.set("locale", browserLocale);
      setLanguage(browserLocale);
      router.refresh();
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    Cookies.set("locale", value);
    router.refresh();
  };

  const handleToggleDarkLight = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Flex gap={"4"} className="pl-8">
      <Box
        onClick={handleToggleDarkLight}
        ref={menuToggleRef}
        className={`absolute ${opacity} top-[-100%] lg:top-0 lg:static z-50 mt-12 lg:mt-2 left-12 cursor-pointer`}
      >
        <WiMoonAltThirdQuarter
          size={32}
          className="text-gray-600 dark:text-gray-100"
        />
        <span className="sr-only">Toggle theme</span>
      </Box>
      {/* Select Dropdown */}
      <Box className="mt-0 lg:mt-1 absolute right-20 top-11 lg:static">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ja">
              <Flex align="center" gap="2" className="flex space-x-4">
                <Image
                  src="/japan.png"
                  width={25}
                  height={25}
                  alt="Japan flag"
                />
                <Text>日本語</Text>
              </Flex>
            </SelectItem>
            <SelectItem value="en">
              <Flex align="center" gap="2" className="flex space-x-4">
                <Image
                  src="/united-states.png"
                  width={25}
                  height={25}
                  alt="United States flag"
                />
                <Text>English</Text>
              </Flex>
            </SelectItem>
          </SelectContent>
        </Select>
      </Box>
    </Flex>
  );
};
