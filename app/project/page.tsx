'use client';

import { Box, Text } from '@radix-ui/themes';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Layout } from '../components/layouts/layout';
import { MenuProject } from '../components/Project/Menu/Menu';
import { DescriptionProject } from '../components/Project/Description/Description';
import { getMenuProjects } from '../components/AppData/projects';

import styles from '@/app/modules/main.module.css';
import { Sidebars } from '../components/Project/Sidebar/Sidebar';

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

export default function Project() {
  const menu = useTranslations('project');
  const [pick, setPick] = useState(1);
  const refPick = useRef<HTMLDivElement | null>(null);
  const [pickData, setPickData] = useState<Menu | null>(null);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  return (
    <Layout>
      <Box className="px-0 lg:px-12 py-6 lg:py-10">
        <Sidebars 
          pickData={pickData}
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
          <Box className="col-span-6">
            <Box>
              <Text
                as="div"
                style={{
                  fontSize: 36,
                  fontWeight: 'bold',
                }}
                className={`${styles.body_font}`}
              >
                {menu('title')}
              </Text>
            </Box>
            <Box style={{ marginTop: 4 }} className={`${styles.body_font}`}>
              {menu('desc')}
            </Box>
            <Box style={{ marginTop: 10 }} className={`${styles.body_font}`}>
              <MenuProject setPick={setPick} data={getMenuProjects()} />
            </Box>
          </Box>
          <Box className={`${styles.body_font} col-span-6 mt-5 lg:mt-0`}>
            <DescriptionProject 
                pick={pick} 
                refPick={refPick} 
                data={getMenuProjects()}
                setPickData={setPickData}
                setToggleSidebar={setToggleSidebar}
                />
          </Box>
        </div>
      </Box>
    </Layout>
  );
}