import { Box } from '@chakra-ui/react';
import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import * as CSS from 'csstype';
import React from 'react';
import { ProbeDevice, ProbeStatus } from '../common/ProbeTypes';

export interface ProbeUIColor {
  status: ProbeStatus;
  color: CSS.Property.Color;
}

export const Probe = (params: ProbeDevice): JSX.Element => {
  const stateColorLut: ProbeUIColor[] = [
    { status: ProbeStatus.IDLE, color: 'orange' },
    { status: ProbeStatus.ERASING, color: 'burlywood' },
    { status: ProbeStatus.FLASHING, color: 'lightblue' },
    { status: ProbeStatus.SUCCESS, color: 'yellowgreen' },
    { status: ProbeStatus.ERROR, color: 'orangered' },
  ];

  const color = stateColorLut.find((obj) => {
    return obj.status === params.status;
  });

  return (
    <Box border="1px" boxShadow="xl" borderColor="gray.100" borderRadius="md" bg={color ? color.color : 'white'}>
      <Stat marginLeft={5} marginTop={2}>
        <StatLabel>{`${params.info.probeType}; ID: ${params.info.shortId}`}</StatLabel>
        <StatNumber>{params.status}</StatNumber>
        <StatHelpText>
          {params.targetChipId ? `Target Chip ID: ${params.targetChipId}` : 'Unknown Chip ID'}
        </StatHelpText>
      </Stat>
    </Box>
  );
};
