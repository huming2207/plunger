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
import { MassProduction } from './pages/MassProduction';

export const App = (): JSX.Element => {
  return (
    <ChakraProvider>
      <Container marginTop="5" marginBottom="5" maxW="container.lg">
        <Tabs>
          <TabList>
            <Tab>Mass Production</Tab>
            <Tab>Single mode</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MassProduction />
            </TabPanel>
            <TabPanel>doi2</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ChakraProvider>
  );
};
