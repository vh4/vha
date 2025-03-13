"use client";

import { Box, Flex } from "@radix-ui/themes";
import { Menu } from "../Menu/Menu";
import { getMenuList } from "../AppData/MenuList";
import { Toggle } from "../Menu/Toggle";
import { Logo } from "../Menu/Logo";
import { Button } from "@/components/ui/button";
import { CiMenuBurger } from "react-icons/ci";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export const Header = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showMenuMobile = () => {
    if (!menuRef.current) return;

    if (!isMenuOpen) {
      gsap.to(menuRef.current, {
        top: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, {
        top: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box>
      <Box style={{ width: "full" }}>
        <Flex style={{ padding: 12 }} justify={"between"} align={"center"}>
          {/* Logo */}
          <Box>
            <Logo />
          </Box>
          <Box>
            {/* Navigation Menu */}
            <Flex gap={"8"} align={"center"}>
               <div ref={menuRef} className='absolute lg:static bg-white dark:bg-black top-[-100%] opacity-0 lg:opacity-100 min-h-full lg:min-h-fit left-0 w-full z-50 flex items-center justify-center' >
                <Menu 
                    data={getMenuList()} 
                />
               </div>
               <Toggle/>   
               <Button onClick={() => showMenuMobile()} size={'lg'} className="cursor-pointer p-4 block lg:hidden" variant="ghost">
                <CiMenuBurger size={32} />
              </Button>          
            {/* End Navigation Menu */}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
