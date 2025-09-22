import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

function Dashboard() {
  return (
    <Box maxW="2xl" mx="auto" mt={10} p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={4} textAlign="center">Welcome to Career Compass 🚀</Heading>
      <Text fontSize="lg" mb={6} textAlign="center">
        This is your personalized dashboard. From here, you’ll get career advice and guidance.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="blue" width="full">Get Career Advice</Button>
        <Button colorScheme="green" width="full">Update Profile</Button>
        <Button colorScheme="red" width="full">Logout</Button>
      </VStack>
    </Box>
  );
}

export default Dashboard;
