'use client'

import { Box, Flex, Text } from "@radix-ui/themes";
import { LayoutMain } from "../components/layouts/LayoutMain";
import styles from "@/app/modules/main.module.css";
import { useTranslations } from "next-intl";
import { IoIosCheckmark } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useGetSales } from "../components/AppData/sales";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { useEffect } from "react";

export default function Home() {
  const menu = useTranslations("sale");
  const sales = useGetSales();

  useEffect(() => {
    document.title = "Sales";
  }, []);

  return (
    <LayoutMain>
      <Box className="px-0 lg:px-12">
        {/* title */}
        <Box>
          <Text
            as="div"
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
            className={`${styles.body_font}`}
          >
            {menu("title")}
          </Text>
          <Text as="div" className="text-sm mt-5">
            {menu("desc")}
          </Text>
        </Box>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-5">
          {sales.map((e, i) => (
            <div key={i} className="h-full">
              <Box className="w-full max-w-sm border rounded-lg overflow-hidden h-full flex flex-col">
                {/* <Image
                  src={e.image}
                  width={300}
                  height={100}
                  className="w-full h-25 object-cover"
                  alt="ai.jpeg"
                /> */}
                <Box className="p-4 flex-grow flex flex-col">
                  <h3 className="text-sm font-semibold">{e.title}</h3>
                  <Box className="text-gray-600 mt-4 text-xs flex-grow">
                    {e.desc}
                  </Box>
                  <Box className="mt-6 text-xs">
                    {e.offer.map((m, i) => (
                      <Flex key={i} gap={"2"} align={"center"} className="mt-3">
                        <Box className="bg-green-100 rounded-full">
                          <IoIosCheckmark size={24} className="text-green-500" />
                        </Box>
                        <Box>
                          <Text as="div">{m}</Text>
                        </Box>
                      </Flex>
                    ))}
                  </Box>
                  <Box className="w-full mt-5 mb-4">
                    <a href={e.url} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full cursor-pointer">
                      <Flex gap={'1'} align={'center'}>
                        <Text>Checkout</Text>
                        <LiaExternalLinkAltSolid size={24} />
                      </Flex>
                    </Button>
                    </a>
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
        </div>
        <Flex justify={'center'} className="mt-10">
        <div className="relative bg-gradient-to-r from-black via-gray-800 to-black rounded-xl w-full max-w-2xl border dark:border-gray-400 border-gray-800 shadow-lg">
        {/* Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {menu("text_title")}
        </div>
        
        {/* Text */}
        <p className="text-gray-300 text-center my-4">
        {menu("text_1")} <span className="font-bold">{menu("text_2")}</span> {menu("text_3")}
        </p>

      </div>
        </Flex>
      </Box>
    </LayoutMain>
  );
}
