'use client'

import { Box, Text } from "@radix-ui/themes";
import { LayoutMain } from "../components/layouts/LayoutMain";
import { Skills } from "../components/About/Skills/Skills";
import { useGetSkills } from "../components/AppData/Skills";
import { Descriptions } from "../components/About/Descriptions/Descriptions";
import { useGetDescriptions } from "../components/AppData/Descriptions";
import styles from "@/app/modules/main.module.css";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Home() {
  const menu = useTranslations("about");

  useEffect(() => {
    document.title = "About";
  }, []);


  return (
    <LayoutMain>
      <Box className="px-0 lg:px-12 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
          <Box className="col-span-6">
            {/* title */}
            <Box>
              <Text
                as="div"
                style={{
                  fontSize: 36,
                  fontWeight: "bold",
                }}
                className={`${styles.body_font}`}
              >
                {menu('title')}
              </Text>
            </Box>
            {/* roles */}
            <Box
              style={{
                marginTop: 4,
              }}
              className={`${styles.body_font}`}
            >
            {menu('desc')}
            </Box>
            {/* skill */}
            <Box className="mt-8">
                <Skills data={useGetSkills()} />
            </Box>
          </Box>
          <Box className="col-span-6 mt-12 lg:mt-0">
              <Descriptions 
                data={useGetDescriptions()}
              />
          </Box>
        </div>
      </Box>
    </LayoutMain>
  );
}
