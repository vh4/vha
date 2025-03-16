import { Box, Text } from "@radix-ui/themes";
import { Layout } from "../components/layouts/layout";
import { Skills } from "../components/About/Skills/Skills";
import { getSkills } from "../components/AppData/Skills";
import { Descriptions } from "../components/About/Descriptions/Descriptions";
import { getDescriptions } from "../components/AppData/Descriptions";
import styles from "@/app/modules/main.module.css";
import { useTranslations } from "next-intl";

export default function Home() {
  const menu = useTranslations("about");
  return (
    <Layout>
      <Box className="px-0 lg:px-12 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
          <Box className="col-span-6">
            {/* title */}
            <Box>
              <Text
                as="div"
                style={{
                  fontSize: 36,
                  fontWeight: "bold",
                }}
                className={`${styles.body_font}`}
              >
                {menu('title')}
              </Text>
            </Box>
            {/* roles */}
            <Box
              style={{
                marginTop: 4,
              }}
              className={`${styles.body_font}`}
            >
            {menu('desc')}
            </Box>
            {/* skill */}
            <Box className="mt-8">
                <Skills data={getSkills()} />
            </Box>
          </Box>
          <Box className="col-span-6 mt-12 lg:mt-0">
              <Descriptions 
                data={getDescriptions()}
              />
          </Box>
        </div>
      </Box>
    </Layout>
  );
}
