import { Button } from "@/components/ui/button";
import { Box, Flex, Text } from "@radix-ui/themes";
import styles from "@/app/modules/main.module.css";

interface PropsDesc {
  title: string;
}

interface Skills {
  data: PropsDesc[];
}

export const Skills: React.FC<Skills> = ({ data }) => {
  return (
    <Box className="max-w-full overflow-hidden">
      <Flex gap="4" align="center" wrap="wrap">
        {data.map((e) => (
          <Box key={e.title}>
            <Button size="lg">
              <Text as="p" className={`${styles.body_font}`}>{e.title}</Text>
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
