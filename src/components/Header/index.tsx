import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { Flex, Image, Text } from "@chakra-ui/react";

export function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });
  return (
    <Flex
      as="header"
      bg="white"
      h="6.5rem"
      align="center"
      px="16"
      py="8"
      borderBottom="1px solid"
      borderColor="gray.100"
    >
      <Image src="/logo.svg" alt="logo" />
      <Text
        as="p"
        ml="8"
        py="1"
        pr="0"
        pl="8"
        borderLeft="1px solid"
        borderColor="gray.100"
      >
        O melhor para você ouvir, sempre
      </Text>
      <Text as="span" ml="auto" textTransform="capitalize">
        {currentDate}
      </Text>
    </Flex>
  );
}
