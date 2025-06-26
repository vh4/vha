"use client";

import { useTranslations } from "next-intl";

interface Menu {
  title: string;
  url: string;
}

export const useGetMenuList = (): Menu[] => {
  const menu = useTranslations("menu");

  return [
    {
      title: menu("home"),
      url: "/",
    },
    {
      title: menu("about"),
      url: "/about",
    },
    {
      title: menu("project"),
      url: "/project",
    },
    {
      title: menu("sale"),
      url: "/sale",
    },
        {
      title: menu("economic-calendar"),
      url: "/economic-calendar",
    },
  ];
};
