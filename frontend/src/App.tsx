import { ChakraProvider, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Configuration } from './pages/Configuration';
import { MassProduction } from './pages/MassProduction';
import { SettingStateInstance } from './states/SettingState';

export const App = (): JSX.Element => {
  useEffect(() => {
    (async () => {
      await SettingStateInstance.initFromDisk();
    })();
  }, []);

  return (
    <ChakraProvider>
      <Container marginTop="5" marginBottom="5" maxW="container.lg">
        <Tabs>
          <TabList>
            <Tab>Mass Production</Tab>
            <Tab>Configuration</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MassProduction />
            </TabPanel>
            <TabPanel>
              <Configuration />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ChakraProvider>
  );
};
