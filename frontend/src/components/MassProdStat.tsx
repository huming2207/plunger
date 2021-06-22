import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { SettingStateInstance } from '../states/SettingState';

export const MassProdStat = (): JSX.Element => {
  return (
    <StatGroup marginBottom="10">
      <Stat>
        <StatLabel>Passed</StatLabel>
        <StatNumber>
          <CheckIcon w={4} h={4} marginRight="2" />
          <Observer>{() => <>{SettingStateInstance.successCount}</>}</Observer>
        </StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Failed</StatLabel>
        <StatNumber>
          <CloseIcon w={4} h={4} marginRight="2" />
          <Observer>{() => <>{SettingStateInstance.failCount}</>}</Observer>
        </StatNumber>
      </Stat>
    </StatGroup>
  );
};
