import {
  Box,
  Heading,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import React from 'react';

export const Configuration = (): JSX.Element => {
  return (
    <>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="probe-spd" mb="0">
              Maximum probe clock speed (KHz):
            </FormLabel>
            <NumberInput id="probe-spd" max={20000} min={1} size="lg">
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="skip-verify" mb="0">
              Skip verification:
            </FormLabel>
            <Switch id="skip-verify" size="lg" />
          </FormControl>
        </Box>
      </VStack>
    </>
  );
};
