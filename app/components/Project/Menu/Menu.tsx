'use client';

import { Box, Flex, Text } from "@radix-ui/themes";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

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
    tech_stack?: string[];
    role?: string;
    image: string[];
    sub: string;
}

interface MenuProps {
    data: DataProps[];
    setPick: (id: number) => void;
}

export const MenuProject: React.FC<MenuProps> = ({ data, setPick }) => {
    const toLarge = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        toLarge.current.forEach((element, idx) => {
            if (!element) return;
            gsap.to(element, {
                width: selectedId === data[idx].id ? 80 : 50,
                duration: 0.25,
                ease: "power2.out",
            });
        });
    }, [selectedId, data]);

    const handlePick = (id: number) => {
        setSelectedId(id);
        setPick(id);
    };

    return (
        <Box>
            <Box className="mt-10">
                {data.map((e, index) => (
                    <Box
                        key={e.id}
                        onClick={() => handlePick(e.id)}
                        onMouseEnter={() => {
                            if (selectedId !== e.id) {
                                gsap.to(toLarge.current[index], { width: 80, duration: 0.25, ease: "power2.out" });
                            }
                        }}
                        onMouseLeave={() => {
                            if (selectedId !== e.id) {
                                gsap.to(toLarge.current[index], { width: 50, duration: 0.25, ease: "power2.out" });
                            }
                        }}
                        className="cursor-pointer"
                    >
                        <Flex gap="2" align="center" className="mb-4">
                            <Box
                                ref={(el) => { toLarge.current[index] = el; }}
                                className="bg-gray-800 dark:bg-white h-0.25 w-[50px]"
                            ></Box>
                            <Box>
                                <Text as="div">{e.title}</Text>
                            </Box>
                        </Flex>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
