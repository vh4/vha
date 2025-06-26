import { Flex } from "@radix-ui/themes";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export const FooterLink: React.FC = () => {
  return (
    <>
      <Flex className="mt-4 flex space-x-6 items-center">
        <a
          href="https://www.facebook.com/oni.fwj123/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF size={18} className="text-gray-600" />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter size={18} className="text-gray-600" />
        </a>
        <a
          href="https://www.linkedin.com/in/f4th0n1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn size={18} className="text-gray-600" />
        </a>
        <a
          href="https://github.com/vh4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={18} className="text-gray-600" />
        </a>
        <a
          href="https://instagram.com/fathoniwasesoj"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={18} className="text-gray-600" />
        </a>
      </Flex>
    </>
  );
};
