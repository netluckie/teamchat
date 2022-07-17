import React, { useState, useEffect } from "react";
import ChatContainer from "./chat/ChatContainer";
import {
  Avatar,
  AvatarBadge,
  Divider,
  Flex,
  VStack,
  Text,
  HStack,
  Box,
  Tooltip,
  Spacer,
  Wrap,
  WrapItem,
  IconButton,
  InputGroup,
  useColorModeValue,
  InputLeftElement,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  useToast,
  Button,
  Heading,
  Image,
  Switch
} from "@chakra-ui/react";

import {
  FiBookmark,
  FiList,
  FiSend,
  FiEdit,
  FiMenu,
  FiSearch,
  FiTerminal,
  FiUser,
  FiMoon,
  FiTool,
  FiToggleLeft,
} from "react-icons/fi";
import ChatFiles from "./chat/chatfiles";

const ChatInfo = ({ socket }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const [onlines, setOnlines] = useState();
  const [online, setOnline] = useState(false);
  const Rooms = ["General", "Team #1", "Team #2", "DevTeam "];
  const [room, setRoom] = useState(Rooms[0]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!auth) {
      onOpen();
    }
    socket.current.on("onlines", (data) => {
      setUsers(data.users);
    });

    socket.current.on("takecare", () => {
      toast({
        title: "Bir kullanıcı ayrıldı",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    });

    socket.current.on("welcome", () => {
      toast({
        title: `Yeni bir kullanıcı katıldı!`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });

   
  }, []);

  useEffect(() => {
    socket.current.on("message", (message) => {
      setMessages([...messages, message]);
    });
    console.log(messages);
  }, [messages]);

  const join = () => {
    var index = users.findIndex(function (user) {
      return user.username === username;
    });
    if (username !== "" && index === -1) {
      socket.current.emit("join", { room, username });
      setAuth(true);
      setOnline(true);
      onClose();
    } else {
      toast({
        title: "Lütfen nickname kısmını doldurun. | Nickname alınmış olabilir.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };



  const setBusySocket = () => {
    if (online) {
      socket.current.emit("busy");
      setOnline(false);
    } else {
      socket.current.emit("online");
      setOnline(true);
    }
  };

  const sendMessage = (e) => {
    if (message !== '') {
      socket.current.emit("sendMessage", message);
      setMessage("");
    }
  };

  const joinGeneral = (e) => {
    socket.current.emit("changeRoom", Rooms[0]);
    setRoom(Rooms[0]);
    setMessages([]);
  };
  const joinTeam1 = (e) => {
    socket.current.emit("changeRoom", Rooms[1]);
    setRoom(Rooms[1]);
    setMessages([]);
  };
  const joinTeam2 = (e) => {
    socket.current.emit("changeRoom", Rooms[2]);
    setRoom(Rooms[2]);
    setMessages([]);
  };
  const joinDevTeam = (e) => {
    socket.current.emit("changeRoom", Rooms[3]);
    setRoom(Rooms[3]);
    setMessages([]);
  };

  return (
    <>
      <Flex
        as="aside"
        h="full"
        maxW="sm"
        w="full"
        borderRightColor={useColorModeValue("gray.50", "gray.700")}
        bg={useColorModeValue("gray.50", "gray.800")}
        borderRightWidth={1}
      >
        <VStack h="100vh" alignItems="center" w="full" spacing={6}>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            isCentered
            alignContent={"center"}
            justifyContent="center"
          >
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px) " />
            <ModalContent alignContent={"center"} justifyContent="center">
              {auth ? <ModalCloseButton /> : ""}
              <ModalBody p={12}>
                <Heading pb={8} size={"xl"}>
                  {username ? `Hi ${username} 👋` : `Hi 👋`}
                  <Text fontSize={"sm"} py={2} fontWeight="medium">
                    {auth
                      ? `Ayarlarını buradan değiştirebilirsin.`
                      : `Bilgileri doldur ve aramıza katıl!`}
                  </Text>
                </Heading>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiUser color="gray.300" />}
                  />
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Nickname"
                    value={username}
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </InputGroup>

                <Text
                  fontSize={"sm"}
                  py={6}
                  fontWeight="medium"
                  color={"gray.500"}
                >
                  Avatarınızı nickinize bağlı olarak otomatik oluşur.
                </Text>
                <Button
                  rightIcon={<FiSend />}
                  w="full"
                  colorScheme="teal"
                  variant="outline"
                  onClick={join}
                >
                  {auth ? "Kaydet" : "Katıl"}
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Flex
            w="full"
            flexDirection="column"
            alignItems="left"
            justifyContent="flex-start"
          >
            <HStack py={10} px={6} spacing={4} alignItems="left">
              <Avatar
                src={auth ? `https://robohash.org/${username}` : "Guest"}
                size="lg"
                boxShadow="xl"
                borderRadius={10}
              >
                <AvatarBadge
                  bg={online ? "green.300" : "yellow.300"}
                  boxSize={6}
                  borderWidth={2}
                />
              </Avatar>
              <Box>
                <Text fontSize="lg" fontWeight="semibold">
                  {auth ? username : "Guest"}{" "}
                </Text>
                <Switch size='sm' colorScheme='blackAlpha'   onChange={setBusySocket} />
                </Box>
                
            </HStack>
            <Divider />

            <Flex p={6}>
              <Text fontSize="xl" fontWeight="semibold">
                Online now
              </Text>
              <Spacer />
              <Text
                fontSize="md"
                fontWeight="semibold"
                bg="white"
                color="blue.500"
                px={2}
                borderRadius={8}
              >
                {users?.length}
              </Text>
            </Flex>
            <HStack as="aside" h="full" maxW="sm" w="full">
              <Wrap px={6} pb={6} spacing={4}>
                {users.map((user, index) => (
                  <Tooltip
                    key={index}
                    label={user.username === username ? "You" : user.username}
                  >
                    <WrapItem>
                      <Avatar
                        boxShadow="xl"
                        size="md"
                        name={user.username}
                        src={`https://robohash.org/${user.username}`}
                        borderRadius={10}
                      >
                        <AvatarBadge
                          bg={user.online ? "green.300" : "yellow.300"}
                          boxSize={4}
                          borderWidth={1}
                        />
                      </Avatar>
                    </WrapItem>
                  </Tooltip>
                ))}
              </Wrap>
            </HStack>
            <Flex p={6} pb={4} spacing={0}>
              <Text fontSize="xl" fontWeight="semibold">
                Rooms ⌵
              </Text>
              <Spacer />
              <IconButton
                aria-label="Search database"
                variant="ghost"
                color="gray.500"
                icon={<FiEdit />}
              />
              <IconButton
                aria-label="Search database"
                variant="ghost"
                color="gray.500"
                icon={<FiBookmark />}
              />
            </Flex>
            <Flex px={6}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiSearch color="gray.300" />}
                />
                <Input
                  type="search"
                  placeholder="Search"
                  bg="white.100"
                  border={"none"}
                />
              </InputGroup>
            </Flex>
          </Flex>
          <VStack spacing={6} w="full">
            <HStack
              w="full"
              px={4}
              onClick={joinGeneral}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={require("../img/Mesh-20.png")}
                h={16}
                borderRadius={18}
                boxShadow="xl"
              />
              <Box p={2}>
                <Text fontWeight={"semibold"} fontSize={"xl"}>
                  {Rooms[0]}
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  All teams members
                </Text>
              </Box>
            </HStack>
            <HStack
              w="full"
              px={4}
              onClick={joinTeam1}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={require("../img/Mesh-47.png")}
                h={16}
                borderRadius={18}
                boxShadow="xl"
              />
              <Box p={2}>
                <Text fontWeight={"semibold"} fontSize={"xl"}>
                  {Rooms[1]}{" "}
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Product Managers
                </Text>
              </Box>
            </HStack>
            <HStack
              w="full"
              px={4}
              onClick={joinTeam2}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={require("../img/Mesh-92.png")}
                h={16}
                borderRadius={18}
                boxShadow="xl"
              />
              <Box p={2}>
                <Text fontWeight={"semibold"} fontSize={"xl"}>
                  {Rooms[2]}
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Community Managers
                </Text>
              </Box>
            </HStack>
            <HStack
              w="full"
              px={4}
              onClick={joinDevTeam}
              style={{ cursor: "pointer" }}
            >
              <Image
                src={require("../img/Mesh 21.png")}
                h={16}
                borderRadius={18}
                boxShadow="xl"
              />
              <Box p={2}>
                <Text fontWeight={"semibold"} fontSize={"xl"}>
                  {Rooms[3]}
                </Text>
                <Text fontSize={"sm"} color={"gray.500"}>
                  Devolopment & Devolopers
                </Text>
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </Flex>

      <Flex
        as="main"
        h="100vh"
        flex={1}
        borderRightColor={useColorModeValue("gray.50", "gray.900")}
        borderRightWidth={1}
      >
        <ChatContainer
          username={username}
          room={room}
          message={message}
          messages={messages}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Flex>

      <Flex as="aside" h="100vh" maxW="sm" w="full">
        <ChatFiles room={room} />
      </Flex>
    </>
  );
};

export default ChatInfo;
