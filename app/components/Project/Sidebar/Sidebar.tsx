import { Box, Flex, Text } from "@radix-ui/themes";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { IoIosArrowDropleft } from "react-icons/io";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

interface Menu {
    id:number;
    title: string;
    description:string;
    repo_url?: string;
    company:string;
    month_start:string;
    year_start:string;
    month_end:string;
    year_end:string;
    tech_stack: string[];
    role?: string;
    image: string[];
    sub: string;
  }
  

interface SidebarProps{
    pickData: Menu | null;
    toggleSidebar: boolean;
    setToggleSidebar: Function;
}

export const Sidebars: React.FC<SidebarProps> = ({pickData, toggleSidebar, setToggleSidebar}) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // Tambahkan ref untuk container terluar

    const toggleSidebarHandle = () => {
        setToggleSidebar(false);
    };

    useEffect(() => {
        if (sidebarRef.current && overlayRef.current && containerRef.current) {
            if (toggleSidebar) {
                gsap.to(sidebarRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
                gsap.to(overlayRef.current, { opacity: 0.5, duration: 0.3, ease: "power2.out" });
                sidebarRef.current.style.zIndex = "50";
                sidebarRef.current.style.pointerEvents = "auto";
                containerRef.current.style.pointerEvents = "auto"; // Aktifkan pointer events pada container
            } else {
                gsap.to(sidebarRef.current, { x: "100%", duration: 0.3, ease: "power2.out" });
                gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
                sidebarRef.current.style.pointerEvents = "none";
                containerRef.current.style.pointerEvents = "none"; // Nonaktifkan pointer events pada container
                if (sidebarRef.current.style.transform === 'translateX(100%)') {
                    sidebarRef.current.style.zIndex = "-50";
                }
            }
        }
    }, [toggleSidebar]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex justify-end"
        >
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black opacity-0"
                style={{ pointerEvents: toggleSidebar ? "auto" : "none" }}
                onClick={() => setToggleSidebar(false)}
            />
            <Box
                ref={sidebarRef}
                className="relative h-screen w-[550px] bg-white dark:bg-gray-900 translate-x-full"
            >
                {/* Headers*/}
                <Box className="p-4 lg:p-8">
                    <Flex justify={'between'} align={'center'} className="mt-4 pb-4 border-b">
                        <Box onClick={toggleSidebarHandle} className="cursor-pointer">
                            <IoIosArrowDropleft size={24} />
                        </Box>
                        <Button onClick={toggleSidebarHandle} variant={'outline'}>
                            <Text as="div" className="font-bold">Back to Project</Text>
                        </Button>
                    </Flex>

                    {/* Judul*/}
                    <Box className="mt-8">
                        <Text as="div" className="text-2xl font-bold">{pickData?.title}</Text>
                    </Box>
                    {/* sub Judul*/}
                    <Box className="mt-2">
                        <Text as="div" className="text-xs">{pickData?.sub}</Text>
                    </Box>
                    {/* jobs*/}
                    <Box className="mt-8">
                        <Text as="div" className="text-xl font-semibold">Jobs</Text>
                    </Box>
                    <Box className="mt-2">
                        <Text as="div" className="text-xs text-justify">{pickData?.description}</Text>
                    </Box>
                    <Box>
                        <Flex gap="2" align="center" wrap="wrap" className="mt-4">
                            {pickData?.tech_stack.map((tech: string) => (
                                <Button key={tech} size="sm" variant="outline" className="dark:bg-gray-900 text-xs">
                                    {tech}
                                </Button>
                            ))}
                        </Flex>
                    </Box>
                    <Box className="mt-8">
                        <Text as="div" className="text-xl font-semibold">Role</Text>
                    </Box>
                    <Box className="mt-2">
                        <Text as="div" className="text-xs text-justify">{pickData?.role} - {pickData?.company}</Text>
                    </Box>
                    <Box className="mt-2">
                        <Text as="div" className="text-xs text-justify">{pickData?.year_start} - {pickData?.year_end}</Text>
                    </Box>

                </Box>

                <Box className='fixed flex justify-center items-center bottom-0 h-[50px] w-full bg-black text-white dark:bg-gray-400 dark:text-black'>
                    <Flex justify={'center'} align={'center'} className="mt-4 text-sm font-semibold cursor-pointer">
                        <a href={pickData?.repo_url} target='_blank'>
                            <Flex gap={'2'} align={'center'}>
                                <Text as="div">Open Project</Text>
                                <LiaExternalLinkAltSolid size={24} />
                            </Flex>
                        </a>
                    </Flex>
                </Box>
            </Box>
        </div>
    );
};