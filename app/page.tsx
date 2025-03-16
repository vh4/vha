'use client'

import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import styles from "./modules/main.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import RotatingText from "./animations/RotatingText/RotatingText";
import { FooterLink } from "./components/Footer/Footer";
import { Layout } from "./components/layouts/layout";
import Link from "next/link";

interface SplitTextProps {
  text?: string;
}

const SplitText: React.FC<SplitTextProps> = ({ text = "" }) => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const home = useTranslations("home");

  useEffect(() => {
    if (textRef.current) {
      const letters = textRef.current.querySelectorAll("span");

      gsap.fromTo(
        letters,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power3.out",
          stagger: 0.1,
        }
      );
    }
  }, [text]);

  return (
    <Box>
      <Text
        as="div"
        ref={textRef}
        className="text-split"
        style={{ whiteSpace: "pre" }}
      >
        {text.split("").map((char, index) => (
          <span key={index} className="inline-block">
            {index === text.length - 1 ? (
              <RotatingText
                texts={[home("name_1"), home("name_2"), home("name_3")]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            ) : char === " " ? (
              "\u00A0"
            ) : (
              char
            )}
          </span>
        ))}
      </Text>
    </Box>
  );
};

export default function Home() {
  
  const home = useTranslations("home");
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 px-0 lg:px-12 py-6 lg:py-10">
        {/* Left box for descriptions */}
        <Box className="col-span-8">
          <Box className="min-h-[360px]">
            <Box className="">
              <Text as="div" className="text-5xl font-semibold">
                <SplitText text={home("title")} />
              </Text>
            </Box>
            <Box className={`mt-4 ${styles.body_font}`}>
              <Text as="div" style={{ lineHeight: 1.8 }}>
                {home("description_1")}
              </Text>
            </Box>
            <Box className={`mt-4 ${styles.body_font}`}>
              <Text as="div" style={{ lineHeight: 1.8 }}>
                {home("description_2")}
              </Text>
            </Box>
            <Box
              style={{ display: "flex", alignItems: "center", marginTop: 32 }}
              className="space-x-2"
            >
              <Box className="cursor-pointer">
                <Link href={'/about'}>
                <Text className={`mt-4 ${styles.body_font}`}>
                  {home("see_more")}
                </Text>
                </Link>
              </Box>
              <Box className={`scroll`}>
                <Box className={`line`}></Box>
              </Box>
            </Box>
            {/* footer */}
            <Box>
              <FooterLink />
            </Box>
            {/* end footer */}
          </Box>
        </Box>
        {/* Right box for image */}
        <div className="col-span-4 mt-8 w-full justify-center hidden lg:flex">
          <Box className="min-h-[360px]">
            <Box className="flex items-center justify-center">
              <div className={styles.picture_magazine}>
                <Image
                  className="z-50"
                  src={"/fotos.png"}
                  alt="profile.png"
                  width={450}
                  height={450}
                />
              </div>
            </Box>
          </Box>
        </div>
      </div>
    </Layout>
  );
}
