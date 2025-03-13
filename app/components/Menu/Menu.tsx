import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";

interface MenuItem {
  title: string;
  url: string;
}

interface MenuProps {
  data: MenuItem[];
}

const HoverAnimation = (element: HTMLParagraphElement | null, reverse = false) => {
  if (!element) return;
  const hoverLine = element.querySelector(".hover-line") as HTMLSpanElement | null;
  if (!hoverLine) return;

  gsap.fromTo(
    hoverLine,
    { width: reverse ? "100%" : "0%", opacity: reverse ? 1 : 0 },
    {
      width: reverse ? "0%" : "100%",
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    }
  );
};

const MenuItemComponent: React.FC<{ item: MenuItem; index: number; menuRefs: React.MutableRefObject<(HTMLParagraphElement | null)[]> }> = ({
  item,
  index,
  menuRefs,
}) => (
  <Link key={index} href={item.url}>
    <Text
      as="p"
      ref={(el) => {
        menuRefs.current[index] = el as HTMLParagraphElement | null;
      }}
      onMouseEnter={() => HoverAnimation(menuRefs.current[index])}
      onMouseLeave={() => HoverAnimation(menuRefs.current[index], true)}
      className="cursor-pointer relative pb-1 min-w-[40px] text-center"
    >
      {item.title}
      <span className="hover-line absolute left-0 bottom-0 h-[0.5px] bg-black"></span>
    </Text>
  </Link>
);

export const Menu: React.FC<MenuProps> = ({ data }) => {
  const menuRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  return (
    <Flex
      gap="5"
      align="center"
      className="font-light text-sm mt-2 flex-col items-center lg:flex-row"
    >
      {data.map((item, index) => (
        <MenuItemComponent key={index} item={item} index={index} menuRefs={menuRefs} />
      ))}
    </Flex>
  );
};
