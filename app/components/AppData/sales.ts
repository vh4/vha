"use client";

import { useTranslations } from "next-intl";

interface Menu {
  title: string;
  url: string;
  desc: string;
  image: string;
  offer: string[];
}

export const useGetSales = (): Menu[] => {
  const menu = useTranslations("sale");

  return [
    {
      title: menu("title_sale_1"),
      desc: menu("desc_sale_1"),
      url: "https://www.fiverr.com/fathoniwasesoj/",
      image: "/ai.jpeg",
      offer: [
        menu("offer1_sale_1"),
        menu("offer2_sale_1"),
        menu("offer3_sale_1"),
        menu("offer4_sale_1"),
        menu("offer5_sale_1"),
      ],
    },
    {
      title: menu("title_sale_2"),
      desc: menu("desc_sale_2"),
      url: "https://www.fiverr.com/fathoniwasesoj/",
      image: "/web.jpg",
      offer: [
        menu("offer1_sale_2"),
        menu("offer2_sale_2"),
        menu("offer3_sale_2"),
        menu("offer4_sale_2"),
        menu("offer5_sale_2"),
      ],
    },
    {
      title: menu("title_sale_3"),
      desc: menu("desc_sale_3"),
      url: "https://www.fiverr.com/fathoniwasesoj/",
      image: "/blockchain.png",
      offer: [
        menu("offer1_sale_3"),
        menu("offer2_sale_3"),
        menu("offer3_sale_3"),
        menu("offer4_sale_3"),
        menu("offer5_sale_3"),
      ],
    },
  ];
};
