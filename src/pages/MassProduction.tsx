import { SimpleGrid } from '@chakra-ui/layout';
import React from 'react';
import { Probe, ProbeState, ProbeType } from '../components/Probe';

export const MassProduction = (): JSX.Element => {
  return (
    <>
      <SimpleGrid columns={2} spacing={10}>
        <Probe busNumber={1} portNumber={2} type={ProbeType.DAPLINK} state={ProbeState.ERASING} />

        <Probe busNumber={1} portNumber={3} type={ProbeType.DAPLINK} state={ProbeState.IDLE} />

        <Probe busNumber={1} portNumber={4} type={ProbeType.DAPLINK} state={ProbeState.SUCCESS} />

        <Probe busNumber={1} portNumber={5} type={ProbeType.DAPLINK} state={ProbeState.ERROR} />

        <Probe busNumber={1} portNumber={6} type={ProbeType.DAPLINK} state={ProbeState.FLASHING} />

        <Probe busNumber={1} portNumber={7} type={ProbeType.DAPLINK} state={ProbeState.FLASHING} />
      </SimpleGrid>
    </>
  );
};
