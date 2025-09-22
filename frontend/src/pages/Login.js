import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";

function Login() {
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Login</Heading>
      <VStack spacing={4}>
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button colorScheme="teal" width="full">Login</Button>
      </VStack>
    </Box>
  );
}

export default Login;
