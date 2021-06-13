import { SimpleGrid, VStack } from '@chakra-ui/layout';
import { Button, ButtonGroup, Container } from '@chakra-ui/react';
import { Observer } from 'mobx-react';
import React from 'react';
import { MassProdStat } from '../components/MassProdStat';
import { Probe } from '../components/Probe';
import { ProbeStateInstance } from '../states/ProbeState';

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
            <Observer>
              {() => (
                <>
                  {ProbeStateInstance.connectedProbes.map((device) => {
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
