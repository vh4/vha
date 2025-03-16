'use client';

import { Button } from "@/components/ui/button";
import { Box, Flex, Text } from "@radix-ui/themes";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect} from "react";

gsap.registerPlugin(ScrollToPlugin);

interface DataProps {
    id: number;
    title: string;
    description: string;
    repo_url?: string;
    company: string;
    month_start: string;
    year_start: string;
    month_end: string;
    year_end: string;
    tech_stack: string[];
    role?: string;
    image: string[];
    sub: string;
}

interface MenuProps {
    data: DataProps[];
    pick: number;
    refPick: React.RefObject<HTMLDivElement | null>;
    setPickData:  React.Dispatch<React.SetStateAction<DataProps | null>>;
    setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;

}

export const DescriptionProject: React.FC<MenuProps> = ({ data, pick, refPick, setPickData, setToggleSidebar }) => {

    useEffect(() => {
        if (refPick.current) {
            const selectedElement = document.getElementById(`project-${pick}`);
            if (selectedElement) {
                gsap.to(refPick.current, {
                    scrollTo: { y: selectedElement.offsetTop - 20 },
                    duration: 1,
                    ease: "power2.out",
                });
            }
        }
    }, [pick]);

    const getShortDescription = (description: string) => {
        
        const words = description.split(' ');
        const limit = 30;
        return words.slice(0, limit).join(' ') + '... - see more';
    };

    const handleDescription = (data: DataProps) => {
        setPickData(data);
        setToggleSidebar(true);
    }

    return (
        <Box ref={refPick} className="max-h-140 overflow-y-auto relative">
            {data.map((e: DataProps) => (
                <Box onClick={() => handleDescription(e)} key={e.id} id={`project-${e.id}`} className="cursor-pointer p-4">
                    <Flex gap="2" align="center" className="mb-6">
                        <Box>
                            <Text as="div" className="font-semibold">{e.title} - {e.company}</Text>
                            <Text as="div" className="text-sm font-light text-gray-500 dark:text-gray-200">
                                {e.role}, {e.year_start} - {e.year_end}
                            </Text>
                            <Text as="div" className="pt-2 text-justify">
                                {getShortDescription(e.description)}
                            </Text>
                            <Box>
                                <Flex gap="2" align="center" wrap="wrap" className="mt-4">
                                    {e.tech_stack.map((tech: string) => (
                                        <Button key={tech} size="sm" variant="outline" className="dark:bg-gray-900">
                                            {tech}
                                        </Button>
                                    ))}
                                </Flex>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            ))}
        </Box>
    );
};