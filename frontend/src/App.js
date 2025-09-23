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
import CareerAdvisor from "./components/CareerAdvisor"; // Make sure path is correct
import API from "./api";

function StatCard({ label, value, help }) {
  const cardBg = useColorModeValue("white", "gray.700");
  return (
    <Stat p={4} bg={cardBg} borderRadius="12px" boxShadow="sm">
      <StatLabel>{label}</StatLabel>
      <StatNumber fontSize="2xl" color="blue.500">
        {value}
      </StatNumber>
      <StatHelpText>{help}</StatHelpText>
    </Stat>
  );
}

export default function App() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [goal, setGoal] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { colorMode, toggleColorMode } = useColorMode();

  const pageBg = useColorModeValue("gray.100", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const adviceBg = useColorModeValue("gray.50", "gray.800");
  const recentBg = useColorModeValue("gray.50", "gray.700");
  const projectBoxBg = useColorModeValue("blue.50", "blue.900");
  const projectTextColor = useColorModeValue("blue.800", "blue.200");

  const handleGetAdvice = async () => {
    if (!skills || !interests || !goal) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    setAdvice("");
    setLoading(true);

    try {
      const res = await API.post("/advisor", { skills, interests, goal });
      setAdvice(res.data.advice);
      setSkills("");
      setInterests("");
      setGoal("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (advice) navigator.clipboard.writeText(advice);
  };

  return (
    <Box minH="100vh" bg={pageBg} p={6}>
      {/* Top Bar */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="blue.500">
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

      {/* Project Info Boxes */}
      <Box mb={6} p={4} bg={projectBoxBg} borderRadius="12px" boxShadow="sm">
  <Text fontSize="md" color={projectTextColor}>
    Welcome to Career Compass Dashboard! This is currently a prototype. 
    The API key is not working in this version, so live advice is limited. 
    Full functionality will require proper funding to run the API and backend services. 
    Explore the features and see how personalized career guidance can work!
  </Text>
</Box>

      <Box mb={6} p={4} bg={projectBoxBg} borderRadius="12px" boxShadow="sm">
        <Text fontSize="md" color={projectTextColor} mb={2}>
          Track your career growth and measure your profile strength.
          Personalized recommendations will help you focus on the right skills
          and opportunities.
        </Text>
        <Text fontSize="sm" color={useColorModeValue("red.600", "red.300")}>
          Dark mode and light mode are fully supported.
        </Text>
      </Box>

      {/* Search */}
      <Box mb={6} bg={cardBg} borderRadius="12px" p={4} boxShadow="sm">
        <Flex align="center" gap={4}>
          <Input
            placeholder="Search jobs, skills, or companies"
            variant="filled"
            bg={useColorModeValue("gray.50", "gray.600")}
          />
          <Button colorScheme="blue" leftIcon={<Icon as={FiSearch} />}>
            Search
          </Button>
        </Flex>
      </Box>

      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
        <StatCard
          label="Profile Strength"
          value="92%"
          help="Based on resume and assessments"
        />
        <StatCard label="Matched Jobs" value="24" help="Roles matching your profile" />
        <StatCard label="Applications" value="18" help="Submitted this month" />
      </SimpleGrid>

      {/* Personalized Advice & Recent Matches */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box bg={adviceBg} p={6} borderRadius="12px" boxShadow="sm">
          <Heading size="md" mb={4} color="blue.500">
            Personalized Advice
          </Heading>
          <Text mb={4}>Enter your details to get tailored guidance.</Text>
          <Stack spacing={3} mb={4}>
            <Input
              placeholder="Your skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <Input
              placeholder="Your interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
            <Textarea
              placeholder="Your goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </Stack>
          <Button
            colorScheme="blue"
            onClick={handleGetAdvice}
            isDisabled={loading}
            w="full"
          >
            {loading ? <Spinner size="sm" /> : "Get Advice"}
          </Button>

          {error && (
            <Box mt={4} p={3} bg="red.500" color="white" borderRadius="8px">
              <Text>{error}</Text>
            </Box>
          )}

          {advice && (
            <Box mt={4} p={4} bg="gray.700" color="white" borderRadius="8px">
              <Text fontWeight="semibold" mb={2}>
                Advice:
              </Text>
              <Text mb={2}>{advice}</Text>
              <Button
                size="sm"
                leftIcon={<FaCopy />}
                onClick={handleCopy}
                colorScheme="teal"
              >
                Copy Advice
              </Button>
            </Box>
          )}
        </Box>

        {/* Recent Matches */}
        <Box bg={recentBg} p={6} borderRadius="12px" boxShadow="sm">
          <Heading size="md" mb={4} color="blue.500">
            Recent Matches
          </Heading>
          <Stack spacing={3}>
            <Box p={3} borderRadius="8px" bg={useColorModeValue("gray.50", "gray.700")}>
              <Flex justify="space-between">
                <Text fontWeight="600">ML Engineer</Text>
                <Text color="blue.400">Apply</Text>
              </Flex>
              <Text fontSize="sm">Company X • Remote</Text>
            </Box>
            <Box p={3} borderRadius="8px" bg={useColorModeValue("gray.50", "gray.700")}>
              <Flex justify="space-between">
                <Text fontWeight="600">Data Scientist</Text>
                <Text color="blue.400">Apply</Text>
              </Flex>
              <Text fontSize="sm">Company Y • Bangalore</Text>
            </Box>
          </Stack>
        </Box>
      </SimpleGrid>

      {/* Career Advisor Component */}
      <Box mt={6}>
        <CareerAdvisor />
      </Box>

      <Box mt={6} textAlign="center">
        <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
          Made with ❤️ for your dream internship
        </Text>
      </Box>
    </Box>
  );
}
