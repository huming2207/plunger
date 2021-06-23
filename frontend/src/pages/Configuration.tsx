import {
  Box,
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
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { SettingStateInstance } from '../states/SettingState';

export const Configuration = (): JSX.Element => {
  console.log(SettingStateInstance.maxSpeedKhz);
  return (
    <>
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <Observer>
            {() => (
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="probe-spd" mb="0">
                  Maximum probe clock speed (KHz):
                </FormLabel>
                <NumberInput
                  id="probe-spd"
                  max={20000}
                  min={1}
                  size="lg"
                  defaultValue={SettingStateInstance.maxSpeedKhz}
                  onChange={async (event) => {
                    await SettingStateInstance.setMaxSpeedKhz(event);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            )}
          </Observer>
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
