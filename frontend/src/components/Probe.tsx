import { Box } from '@chakra-ui/react';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import * as CSS from 'csstype';
import React from 'react';

export enum ProbeType {
  DAPLINK = 'DAPLink',
  STLINK = 'ST-Link',
}

export enum ProbeState {
  IDLE = 'Waiting',
  ERASING = 'Erasing',
  FLASHING = 'Flashing',
  SUCCESS = 'Success',
  ERROR = 'Error',
}

export interface ProbeStatus {
  busNumber: number;
  portNumber: number;
  type: ProbeType;
  state: ProbeState;
  targetChipId?: string;
}

export interface ProbeStateColor {
  state: ProbeState;
  color: CSS.Property.Color;
}

export const Probe = (status: ProbeStatus): JSX.Element => {
  const stateColorLut: ProbeStateColor[] = [
    { state: ProbeState.IDLE, color: 'orange' },
    { state: ProbeState.ERASING, color: 'burlywood' },
    { state: ProbeState.FLASHING, color: 'lightblue' },
    { state: ProbeState.SUCCESS, color: 'yellowgreen' },
    { state: ProbeState.ERROR, color: 'orangered' },
  ];

  const color = stateColorLut.find((obj) => {
    return obj.state === status.state;
  });

  console.log('Color', color);
  console.log('State', status.state);

  return (
    <Box border="1px" boxShadow="xl" borderColor="gray.100" borderRadius="md" bg={color ? color.color : 'white'}>
      <Stat marginLeft={5} marginTop={2}>
        <StatLabel>{`${status.type} at Bus ${status.busNumber}, Port ${status.portNumber}`}</StatLabel>
        <StatNumber>{status.state}</StatNumber>
        <StatHelpText>
          {status.targetChipId ? `Target Chip ID: ${status.targetChipId}` : 'Unknown Chip ID'}
        </StatHelpText>
      </Stat>
    </Box>
  );
};
