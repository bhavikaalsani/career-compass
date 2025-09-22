// frontend/src/components/CareerAdvisor.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  Spinner,
  useColorMode,
  useColorModeValue,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaCopy } from "react-icons/fa";
import API from "../api";

export default function CareerAdvisor() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();
  const boxBg = useColorModeValue("gray.100", "gray.800");
  const inputBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const handleSubmit = async () => {
    if (!skills || !interests || !goal) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    setResult("");
    setLoading(true);

    try {
      const res = await API.post("/advisor", { skills, interests, goal });
      setResult(res.data.advice);
      setSkills("");
      setInterests("");
      setGoal("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <Box maxW="lg" mx="auto" p={6} bg={boxBg} rounded="lg" shadow="md">
      <HStack justifyContent="space-between" mb={4}>
        <Heading size="md" color={textColor}>Career Advisor</Heading>
        <IconButton
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle color mode"
        />
      </HStack>

      <VStack spacing={4}>
        <Input
          placeholder="Your skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          bg={inputBg}
          color={textColor}
        />
        <Input
          placeholder="Your interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          bg={inputBg}
          color={textColor}
        />
        <Textarea
          placeholder="Your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          bg={inputBg}
          color={textColor}
        />
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isDisabled={loading}
          w="full"
        >
          {loading ? <Spinner size="sm" /> : "Get Advice"}
        </Button>

        {error && (
          <Box bg="red.500" color="white" p={3} rounded="md" w="full">
            <Text>{error}</Text>
          </Box>
        )}

        {result && (
          <Box bg="blue.700" color="white" p={4} rounded="md" w="full">
            <Text mb={2}>{result}</Text>
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
      </VStack>
    </Box>
  );
}
