import { SimpleGrid, VStack } from '@chakra-ui/layout';
import { Button, ButtonGroup, Container, Stack, Text } from '@chakra-ui/react';
import { OpenDialogReturnValue } from 'electron';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import { listAllProbes, openFirmwareChooseDialog } from '../common/MainProcessBindings';
import { MassProdStat } from '../components/MassProdStat';
import { Probe } from '../components/Probe';
import { ProbeStateInstance } from '../states/ProbeState';

export const MassProduction = (): JSX.Element => {
  const [firmware, setFirmware] = useState<OpenDialogReturnValue>();
  const probeState = ProbeStateInstance;
  return (
    <>
      <VStack>
        <Container
          maxHeight="80px"
          height="80px"
          border="2px"
          paddingTop="3"
          paddingBottom="3"
          borderColor="gray.100"
          borderRadius="md"
          maxW="container.md"
        >
          <MassProdStat />
        </Container>
        <Container
          maxHeight="80px"
          height="70px"
          border="2px"
          paddingTop="3"
          paddingBottom="3"
          borderColor="gray.100"
          borderRadius="md"
          maxW="container.md"
        >
          <Stack direction="row" spacing={5} align="center">
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={async () => {
                setFirmware(await openFirmwareChooseDialog());
              }}
            >
              Select firmware blob
            </Button>
            <Text fontSize="md">
              {firmware?.canceled
                ? 'You have cancelled the selection, try again'
                : firmware?.filePaths && firmware.filePaths.length > 0
                ? firmware.filePaths[0]
                : 'No file selected'}
            </Text>
          </Stack>
        </Container>
        <Container
          maxHeight="80px"
          height="80px"
          border="2px"
          maxW="container.md"
          paddingTop="3"
          paddingBottom="3"
          borderColor="gray.100"
          borderRadius="md"
          centerContent
        >
          <ButtonGroup variant="solid" spacing="10">
            <Button
              colorScheme="blue"
              size="lg"
              onClick={async () => {
                const result = await listAllProbes();
                ProbeStateInstance.setConnectedProbe(result);
              }}
            >
              Scan Probe
            </Button>
            <Button colorScheme="green" size="lg">
              Start
            </Button>
            <Button colorScheme="orange" size="lg">
              Stop
            </Button>
          </ButtonGroup>
        </Container>

        <Container maxW="container.md" marginTop="5">
          <SimpleGrid columns={2} spacing={10}>
            <Observer>
              {() => (
                <>
                  {probeState.connectedProbes.slice().map((device) => {
                    return (
                      <div key={device.info.shortId}>
                        <Probe {...device} />
                      </div>
                    );
                  })}
                </>
              )}
            </Observer>
          </SimpleGrid>
        </Container>
      </VStack>
    </>
  );
};
