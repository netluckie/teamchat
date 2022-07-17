import React, { useEffect } from "react";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  Avatar,
  AvatarGroup,
  VStack,
  Badge,
  Center,
} from "@chakra-ui/react";
import {
  FiCamera,
  FiFileText,
  FiImage,
  FiMic,
  FiPaperclip,
  FiPhone,
  FiSend,
} from "react-icons/fi";

function ChatContainer({
  room,
  message,
  setMessage,
  sendMessage,
  username,
  messages,
}) {
  useEffect(() => {});
  return (
    <Flex w="full" flexDirection="column">
      <HStack p={6} borderBottomColor="gray.100" borderBottomWidth={1}>
        <Text fontSize={"xl"} fontWeight="semibold">
          {room}
        </Text>
        <Spacer />
        <IconButton
          aria-label="Camera"
          variant="ghost"
          color="gray.500"
          icon={<FiCamera />}
        />
        <IconButton
          aria-label="Phone"
          variant="ghost"
          color="gray.500"
          icon={<FiPhone />}
        />
        <IconButton
          aria-label="Image"
          variant="ghost"
          color="gray.500"
          icon={<FiImage />}
        />
        <IconButton
          aria-label="Image"
          variant="ghost"
          color="gray.500"
          icon={<FiFileText />}
        />
        <Spacer />
        <AvatarGroup size="md" max={2}>
          <Avatar
            name="Ryan Florence"
            src="https://robohash.org/ryan-florence"
          />
          <Avatar
            name="Segun Adebayo"
            src="https://robohash.org/sage-adebayo"
          />
          <Avatar name="Kent Dodds" src="https://robohash.org/kent-c-dodds" />
          <Avatar
            name="Prosper Otemuyiwa"
            src="https://robohash.org/prosper-baba"
          />
        </AvatarGroup>
      </HStack>
      <Flex px={6} overflow="auto" flexDirection="column" flex={1}>
        {messages.map((msg, i) => (
          <VStack
            mt={6}
            alignItems={msg.user === username ? "flex-end" : "flex-start"}
            alignSelf={msg.user === username ? "flex-end" : "flex-start"}

          >
          
            <HStack spacing={4}>
              <Flex pb={2}>
                {msg.user !== username && msg.user !=='ChatBot' ? (
                  
                  <Avatar
                    size={'md'}
                    src={`https://robohash.org/${msg.user}`}
                    borderRadius={10}
                  />
           
                ) : ''}
              </Flex>
              <VStack
                alignItems={msg.user === username  ?  "flex-end" : "flex-start"}
                spacing={2}
              >
                <Flex w='full' spacing={8} >
                  <Text fontWeight={"semibold"} fontSize="md">
                    {msg.user !== username ? msg.user : "You"}{" "}
                  </Text>{" "}
      
                  <Text pt={1} px={2} fontSize={"sm"} color="gray">
                    {msg.date}
                  </Text>
                </Flex>
                <Box
                  bg={msg.user === username ? "blue.100" : "gray.100"}
                  px={4}
                  py={msg.user === 'ChatBot'? 0:2}
                  borderBottomLeftRadius={32}
                  borderBottomRightRadius={msg.user === 'ChatBot'? '0':'32'}
                  borderTopLeftRadius={msg.user === username   ? "32" : "0"}
                  borderTopRightRadius={msg.user === username  ? "0" : "32"}
                >
                  {msg.joinedUser == username? `${room} Odasına Hoş Geldin! `:msg.text}
                </Box>
              </VStack>
            </HStack>
          </VStack>
        ))}
      </Flex>
      <Flex p={6}>
        <HStack w="full" borderRadius={10} p={2} spacing={4} boxShadow="xl">
          <Avatar
            size={"sm"}
            name={username}
            src={`https://robohash.org/${username}`}
          />
          <Input
            variant={"unstyled"}
            placeholder="Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : "")}
          />
          <Spacer />
          <IconButton
            aria-label="Mic"
            variant="ghost"
            color="gray.500"
            icon={<FiMic />}
          />
          <IconButton
            aria-label="Attach"
            variant="ghost"
            color="gray.500"
            icon={<FiPaperclip />}
          />
          <IconButton
            colorScheme="blue"
            variant="ghost"
            color="blue.500"
            aria-label="Send"
            onClick={sendMessage}
            icon={<FiSend />}
          />
        </HStack>
      </Flex>
    </Flex>
  );
}

export default ChatContainer;
