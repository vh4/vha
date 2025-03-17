'use client'

import { Box, Flex, Text } from "@radix-ui/themes";
import { LayoutMain } from "../components/layouts/LayoutMain";
import styles from "@/app/modules/main.module.css";
import { useTranslations } from "next-intl";
import { IoIosCheckmark } from "react-icons/io";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetSales } from "../components/AppData/sales";

export default function Home() {
  const menu = useTranslations("sale");
  const sales = useGetSales();

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
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 mt-5">
          {sales.map((e, i) => (
            <div key={i} className="h-full">
              <Box className="w-full max-w-sm border rounded-lg overflow-hidden h-full flex flex-col">
                <Image
                  src={e.image}
                  width={300}
                  height={200}
                  className="w-full h-35 object-cover"
                  alt="ai.jpeg"
                />
                <Box className="p-4 flex-grow flex flex-col">
                  <h3 className="text-sm font-semibold">{e.title}</h3>
                  <Box className="text-gray-600 mt-4 text-xs flex-grow">
                    {e.desc}
                  </Box>
                  <Box className="mt-4 text-xs">
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
                    <Button className="w-full">Checkout</Button>
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
        </div>
      </Box>
    </LayoutMain>
  );
}
