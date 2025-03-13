"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IoSunnyOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export const Toggle = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("");

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

  return (
    <Flex gap="2">
      <Button className="cursor-pointer" variant="ghost">
        <IoSunnyOutline size={32} />
        <span className="sr-only">Toggle theme</span>
      </Button>
      {/* Select Dropdown */}
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ja">
            <Flex align="center" gap="2" className="flex space-x-4">
              <Image src="/japan.png" width={25} height={25} alt="Japan flag" />
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
    </Flex>
  );
};
