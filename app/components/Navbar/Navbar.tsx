"use client";

import { Box, Flex } from "@radix-ui/themes";
import { Menu } from "../Menu/Menu";
import { useGetMenuList } from "../AppData/MenuList";
import { Toggle } from "../Menu/Toggle";
import { Logo } from "../Menu/Logo";
import { CiMenuBurger } from "react-icons/ci";
import { useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export const Header = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuToggleRef = useRef<HTMLDivElement | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();

  const showMenuMobile = () => {
    const lg = window.innerWidth < 1024;

    if (!lg) return;

    if (!menuRef.current) return;

    if (!isMenuOpen) {
      gsap.to(menuRef.current, {
        top: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(menuToggleRef.current, {
        top: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, {
        top: "-100%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      });

      gsap.to(menuToggleRef.current, {
        top: "-100%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.in",
      });
    }

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box>
      <Box style={{ width: "full" }}>
        <Flex className="p-0 lg:p-4" justify={"between"} align={"center"}>
          {/* Logo */}
          <Box>
            <Logo />
          </Box>
          <Box>
            {/* Navigation Menu */}
            <Flex align={"center"}>
              <div
                ref={menuRef}
                className="absolute lg:static bg-white dark:bg-black lg:dark:bg-transparent top-[-100%] opacity-0 lg:opacity-100 min-h-full lg:min-h-fit left-0 w-full z-50 flex pt-4 lg:pt-0 justify-center"
              >
                <Menu
                  data={useGetMenuList()}
                  showMenuMobile={showMenuMobile}
                  path={path}
                />
              </div>
              <Toggle isMenuOpen={isMenuOpen} menuToggleRef={menuToggleRef} />
              <Box
                onClick={() => showMenuMobile()}
                className="cursor-pointer p-4 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg active:bg-gray-150"
              >
                <CiMenuBurger className="text-2xl block lg:hidden" />
              </Box>
              {/* End Navigation Menu */}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
