import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";

function Register() {
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Register</Heading>
      <VStack spacing={4}>
        <Input placeholder="Name" />
        <Input placeholder="Email" type="email" />
        <Input placeholder="Password" type="password" />
        <Button colorScheme="blue" width="full">Sign Up</Button>
      </VStack>
    </Box>
  );
}

export default Register;
