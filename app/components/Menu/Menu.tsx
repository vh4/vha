"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { RxCross1 } from "react-icons/rx";
import { useTheme } from "next-themes";

interface MenuItem {
  title: string;
  url: string;
}

interface MenuProps {
  data: MenuItem[];
  showMenuMobile: () => void;
  path: string;
}

interface Menu {
  title: string;
  url: string;
}

const HoverAnimation = (
  element: HTMLParagraphElement | null,
  reverse = false,
) => {
  if (!element) return;
  const hoverLine = element.querySelector(
    ".hover-line",
  ) as HTMLSpanElement | null;
  if (!hoverLine) return;

  gsap.fromTo(
    hoverLine,
    { width: reverse ? "100%" : "0%", opacity: reverse ? 1 : 0 },
    {
      width: reverse ? "0%" : "100%",
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    },
  );
};

const MenuItemComponent: React.FC<{
  item: MenuItem;
  path: string;
  index: number;
  menuRefs: React.MutableRefObject<(HTMLParagraphElement | null)[]>;
}> = ({ item, index, menuRefs, path }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const element = menuRefs.current[index];
    if (!element) return;

    const hoverLine = element.querySelector(
      ".hover-line",
    ) as HTMLSpanElement | null;
    if (!hoverLine) return;

    if (path == item.url) {
      gsap.fromTo(
        hoverLine,
        { width: "0%", opacity: 0 },
        {
          width: "100%",
          color: theme === "dark" ? "white" : "black",
          duration: 0.5,
          opacity: 1,
          ease: "power2.inOut",
        },
      );

      gsap.to(menuRefs.current[index], {
        color: theme === "dark" ? "white" : "black",
      });
    }
  });

  return (
    <Link key={index} href={item.url}>
      <Text
        as="p"
        ref={(el) => {
          menuRefs.current[index] = el as HTMLParagraphElement | null;
        }}
        onMouseEnter={() => HoverAnimation(menuRefs.current[index])}
        onMouseLeave={() => HoverAnimation(menuRefs.current[index], true)}
        className="cursor-pointer relative pb-1 min-w-[40px] text-center text-2xl text-slate-500 lg:text-black lg:dark:text-white font-semibold lg:font-normal lg:text-sm py-6 lg:py-0"
      >
        {item.title}
        <span className="hover-line absolute left-0 bottom-0 h-[0.5px] bg-black dark:bg-white"></span>
      </Text>
    </Link>
  );
};

export const Menu: React.FC<MenuProps> = ({ data, showMenuMobile, path }) => {
  const menuRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  return (
    <Flex justify={"between"}>
      <Flex
        gap="5"
        align="center"
        className="font-light text-sm mt-2 flex-col items-center lg:flex-row"
      >
        {data.map((item, index) => (
          <MenuItemComponent
            path={path}
            key={index}
            item={item}
            index={index}
            menuRefs={menuRefs}
          />
        ))}
      </Flex>
      <Box
        onClick={() => showMenuMobile()}
        className="absolute right-12 mt-8 cursor-pointer"
      >
        <RxCross1 size={28} className="text-gray-500 block lg:hidden" />
      </Box>
    </Flex>
  );
};
