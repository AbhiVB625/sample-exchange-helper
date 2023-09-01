import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import avtrSrc from '../assets/avb-classy-icon.jpeg';

const Footer = () => {
  return (
    <Box
      bgColor={'blackAlpha.900'}
      color={'whiteAlpha.700'}
      minH={'48'}
      px={'16'}
      py={['16', '12']}
    >
      <Stack direction={['column', 'row']} h={'full'} alignItems={'center'}>
        <VStack w={'full'} alignItems={['center', 'flex-start']}>
          <Text fontWeight={'bold'}>About Us</Text>
          <Text
            fontSize={'sm'}
            letterSpacing={'widest'}
            textAlign={['center', 'left']}
          >
            Basic Crypto trading app, made as a project with the aim to learn
            React and playing around with API. This project gathers necessary
            real-time data about cryptocurrencies from coingecko public api and
            display them in a neat way. You are able to check useful data about
            cryprocurrencies here!
          </Text>
        </VStack>
        <VStack>
          <Avatar src={avtrSrc} boxSize={'28'} mt={['4', '0']} />
          <Text>Founder: VB</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
