import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import React from 'react';

export const MassProdStat = (): JSX.Element => {
  return (
    <StatGroup marginBottom="10">
      <Stat>
        <StatLabel>Passed</StatLabel>
        <StatNumber>
          <CheckIcon w={4} h={4} marginRight="2" />
          123
        </StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Failed</StatLabel>
        <StatNumber>
          <CloseIcon w={4} h={4} marginRight="2" />0
        </StatNumber>
      </Stat>
    </StatGroup>
  );
};
