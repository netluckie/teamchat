import {
  Image,
  VStack,
  Flex,
  HStack,
  IconButton,
  Text,
  Heading,
  Spacer,
  Box,
} from "@chakra-ui/react";
import React from "react";
import {
  FiBell,
  FiFile,
  FiFilm,
  FiImage,
  FiList,
  FiMapPin,
  FiMoreHorizontal,
  FiMusic,
  FiPlay,
  FiRepeat,
  FiShuffle,
  FiSkipBack,
  FiSkipForward,
  FiStar,
} from "react-icons/fi";

export default function ChatFiles({ room }) {
  const mockFiles = [
    {
      id: 1,
      name: "Charts.pdf",
      date: "10.03.2022 at 11:23",
      size: "2.3 MB",
      icon: <FiFile size={"18"} />,
    },
    {
      id: 1,
      name: "menuAuido.mp3",
      date: "09.03.2022 at 09:23",
      size: "1.4 MB",
      icon: <FiMusic size={"18"} />,
    },
    {
      id: 1,
      name: "attackVFX.mp4",
      date: "02.03.2022 at 06:23",
      size: "22.5 MB",
      icon: <FiFilm size={"18"} />,
    },
    {
      id: 1,
      name: "background.png",
      date: "01.03.2022 at 12:23",
      size: "3.1 MB",
      icon: <FiImage size={"18"} />,
    },
  ];
  return (
    <VStack w="full" h="full" px={12} py={8} spacing={6}>
      <Flex w="full" py={4}>
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Play Together
        </Text>
        <Spacer />
        <IconButton size={"sm"} icon={<FiList />} />
      </Flex>

      <VStack maxW={"sm"} align="center">
        <Image
          src={require("../../img/playerfallback.png")}
          h={{ base: 16, lg: 24 }}
          w={{ base: 16, lg: "full" }}
          fallbackSrc={""}
          borderRadius={18}
          boxShadow="xl"
        />
        <Text fontWeight={"semibold"}> S.T.A.Y</Text>
        <Text fontWeight={"normal"}> Hans Zimmer</Text>
        <HStack>
          <IconButton size={"sm"} variant={"ghost"} icon={<FiShuffle />} />
          <IconButton size={"sm"} variant={"ghost"} icon={<FiSkipBack />} />
          <IconButton
            size={"md"}
            variant={"ghost"}
            icon={<FiPlay size={"24"} />}
          />
          <IconButton size={"sm"} variant={"ghost"} icon={<FiSkipForward />} />
          <IconButton size={"sm"} variant={"ghost"} icon={<FiRepeat />} />
        </HStack>
      </VStack>
      <Spacer />
      <Flex w="full">
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Notifications
        </Text>
        <Spacer />
        <IconButton size={"sm"} icon={<FiBell />} />
      </Flex>
      <VStack w="full" align={"flex-start"} spacing={0}>
        <Box
          bg={"gray.100"}
          px={2}
          py={2}
          borderBottomLeftRadius={32}
          borderBottomRightRadius={32}
          borderTopLeftRadius={0}
          borderTopRightRadius={32}
        >
          Hi guys, we will team up at saturday.
        </Box>
        <Text fontSize={"sm"} color="gray">
          Team #1 Leader. 02.03.2022
        </Text>
      </VStack>
      <VStack w="full" align={"flex-end"} spacing={0}>
        <Box
          bg={"blue.100"}
          px={2}
          py={2}
          borderBottomLeftRadius={32}
          borderBottomRightRadius={32}
          borderTopLeftRadius={32}
          borderTopRightRadius={0}
        >
          Don't forget attach docs.
        </Box>
        <Text fontSize={"sm"} color="gray">
          You. 29.02.2022
        </Text>
      </VStack>
      <Spacer />
      <Flex w="full">
        <Text fontWeight={"semibold"} fontSize={"xl"}>
          Chat Files
        </Text>
        <Spacer />
        <IconButton size={"sm"} icon={<FiMoreHorizontal />} />
      </Flex>

      {mockFiles.map((file, i) => (
        <HStack w="full" spacing={3} key={i}>
          <IconButton size={"lg"} icon={file.icon} />

          <VStack spacing={0} alignItems="flex-start" w="full">
            <Heading fontSize={12} w="full">
              {file.name}
            </Heading>
            <HStack w="full" justifyContent="space-between">
              <Text fontSize={12} color="gray.400">
                {file.date}
              </Text>
              <Text fontSize={12} color="gray.400">
                {file.size}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
}
