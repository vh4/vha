'use server'

import { getLocale } from 'next-intl/server';
import { Poppins, Inter_Tight, Zen_Kurenaido } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    display: "swap",
});
  
const interTight = Inter_Tight({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    display: "swap",
});

const zenKurenaido = Zen_Kurenaido({
    variable: "--font-zen",
    weight: "400",
    style: "normal",
    display: "swap",
});

// Fungsi ini mengembalikan className dari font
export const getFontClassName = async () => {
    const locale = await getLocale();
    
    const fontMap: Record<string, string> = {
        en: poppins.className,
        // ja: zenKurenaido.className,
    };

    return fontMap[locale] || interTight.className;
};
