
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import { HStack,Flex, useToast, VStack, IconButton, Tooltip , useColorMode, useColorModeValue} from '@chakra-ui/react'
import { FiSlack, FiMessageCircle, FiUsers, FiPhoneCall, FiSettings, FiMoon, FiSun } from 'react-icons/fi';
import Chatinfo from "./components/chatinfo";


function App() {
  const socket = useRef();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();

  socket.current = io("http://localhost:4000");

  useEffect(() => {
    socket.current.on("connection", () => {
      console.log("connected to server",{ upgrade: false, transports: ['websocket'] });
    });

  }, {});


  return (
	<HStack h='full' spacing={0} >
		<Flex as='nav' h='100vh' maxW={20} w='full' pt='24'> 
		<VStack p={8} spacing={18}   h='full' justifyContent="space-between" alignItems="center" w="full">
		
      <VStack spacing={4}>
        <Tooltip label="Dashboard" placement="right">
          <IconButton   variant='ghost' color="gray.500" icon={<FiSlack />} aria-label="Dashboard" />
        </Tooltip>
        <Tooltip label="Chat" placement="right">
          <IconButton  variant='ghost' color="gray.500" icon={<FiMessageCircle />} aria-label="Chat" />
        </Tooltip>
        <Tooltip label="Friends" placement="right">
          <IconButton variant='ghost'  color="gray.500" icon={<FiUsers />} aria-label="Friends" />
        </Tooltip>
        <Tooltip label="Calls" placement="right">
          <IconButton variant='ghost'  color="gray.500" icon={<FiPhoneCall />} aria-label="Calls" />
        </Tooltip>
      </VStack>
     
	  <Tooltip label="Settings" placement="right" >
          <IconButton  variant='ghost' color="gray.500"  icon={<FiSettings />} aria-label="Settings" />
    </Tooltip>
    </VStack>
		</Flex>
		
			<Chatinfo socket={socket} />
	
	
	</HStack>
   );
}

export default App;
