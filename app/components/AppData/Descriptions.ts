'use client'

import { useTranslations } from "next-intl";

interface Descriptions {
    description: string;
}

export const useGetDescriptions = (): Descriptions[] => { // Changed to a React Hook
    const menu = useTranslations("about");
    return [
        {
            description: menu('desc_1'),
        },
        {
            description: menu('desc_2'),
        },
        {
            description: menu('desc_3'),
        }
    ];
};