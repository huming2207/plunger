import {
  Button,
  ChakraProvider,
  Container,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { Configuration } from './pages/Configuration';
import { MassProduction } from './pages/MassProduction';

export const App = (): JSX.Element => {
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
