import { Divider, SimpleGrid, StackDivider, VStack } from '@chakra-ui/layout';
import { Box, Button, ButtonGroup, Container } from '@chakra-ui/react';
import React from 'react';
import { MassProdStat } from '../components/MassProdStat';
import { Probe, ProbeState, ProbeType } from '../components/Probe';

export const MassProduction = (): JSX.Element => {
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
            <Probe busNumber={1} portNumber={2} type={ProbeType.DAPLINK} state={ProbeState.ERASING} />

            <Probe busNumber={1} portNumber={3} type={ProbeType.DAPLINK} state={ProbeState.IDLE} />

            <Probe busNumber={1} portNumber={4} type={ProbeType.DAPLINK} state={ProbeState.SUCCESS} />

            <Probe busNumber={1} portNumber={5} type={ProbeType.DAPLINK} state={ProbeState.ERROR} />

            <Probe busNumber={1} portNumber={6} type={ProbeType.DAPLINK} state={ProbeState.FLASHING} />

            <Probe busNumber={1} portNumber={7} type={ProbeType.DAPLINK} state={ProbeState.FLASHING} />
          </SimpleGrid>
        </Container>
      </VStack>
    </>
  );
};
