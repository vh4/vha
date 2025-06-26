import { Box, Text } from "@radix-ui/themes";
import styles from "@/app/modules/main.module.css";

interface PropsDesc {
  description: string;
}

interface Descriptions {
  data: PropsDesc[];
}

export const Descriptions: React.FC<Descriptions> = ({ data }) => {
  return (
    <Box className="w-full">
      {data.map((e, i) => (
        <Box key={e.description} className={`${i === 0 ? "mt-0" : "mt-4"}`}>
          <Text as="p" className={`${styles.body_font}`}>
            {e.description}
          </Text>
        </Box>
      ))}
    </Box>
  );
};
