import { useTranslations } from "next-intl";

interface Menu {
  title: string;
  url: string;
}

export const getMenuList = (): Menu[] => {
  const menu = useTranslations("menu");

  return [
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
  ];
};