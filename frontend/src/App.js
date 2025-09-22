// frontend/src/App.js
import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  SimpleGrid,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Avatar,
  AvatarGroup,
  HStack,
  Textarea,
  Spinner,
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { FaSun, FaMoon, FaCopy } from "react-icons/fa";
import CareerAdvisor from "./components/CareerAdvisor";

function StatCard({ label, value, help }) {
  return (
    <Stat p={4} bg="white" borderRadius="12px" boxShadow="sm">
      <StatLabel>{label}</StatLabel>
      <StatNumber fontSize="2xl" color="blue.700">
        {value}
      </StatNumber>
      <StatHelpText>{help}</StatHelpText>
    </Stat>
  );
}

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const boxBg = useColorModeValue("gray.100", "gray.800");

  return (
    <Box minH="100vh" bg={boxBg} p={6}>
      {/* ---- Top Bar ---- */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="blue.700">
          Career Compass Dashboard
        </Heading>
        <HStack spacing={4}>
          <AvatarGroup size="sm" max={2}>
            <Avatar name="Bhavika R" />
            <Avatar name="Team" />
          </AvatarGroup>
          <Button variant="ghost" size="sm">
            Logout
          </Button>
          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
          />
        </HStack>
      </Flex>

      {/* ---- Search ---- */}
      <Box mb={6} bg={boxBg} borderRadius="12px" p={4} boxShadow="sm">
        <Flex align="center" gap={4}>
          <Input
            placeholder="Search jobs, skills, or companies"
            variant="filled"
            bg={useColorModeValue("gray.50", "gray.700")}
          />
          <Button colorScheme="blue" leftIcon={<Icon as={FiSearch} />}>
            Search
          </Button>
        </Flex>
      </Box>

      {/* ---- Stats ---- */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <StatCard label="Profile Strength" value="92%" help="Based on resume and assessments" />
        <StatCard label="Matched Jobs" value="24" help="Roles matching your profile" />
        <StatCard label="Applications" value="18" help="Submitted this month" />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* ---- Personalized Advice Form ---- */}
        <CareerAdvisor />
        
        {/* ---- Recent Matches ---- */}
        <Box bg={boxBg} p={6} borderRadius="12px" boxShadow="sm">
          <Heading size="md" mb={4} color="blue.700">
            Recent Matches
          </Heading>
          <Stack spacing={3}>
            <Box p={3} borderRadius="8px" bg={useColorModeValue("gray.50", "gray.700")}>
              <Flex justify="space-between">
                <Text fontWeight="600">ML Engineer</Text>
                <Text color="blue.600">Apply</Text>
              </Flex>
              <Text fontSize="sm">Company X • Remote</Text>
            </Box>
            <Box p={3} borderRadius="8px" bg={useColorModeValue("gray.50", "gray.700")}>
              <Flex justify="space-between">
                <Text fontWeight="600">Data Scientist</Text>
                <Text color="blue.600">Apply</Text>
              </Flex>
              <Text fontSize="sm">Company Y • Bangalore</Text>
            </Box>
          </Stack>
        </Box>
      </SimpleGrid>

      <Box mt={6} textAlign="center">
        <Text fontSize="sm" color="gray.600">
          Made with ❤️ for your dream internship
        </Text>
      </Box>
    </Box>
  );
}
