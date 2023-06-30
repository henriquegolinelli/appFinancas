import 'react-native-gesture-handler';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { default as theme } from './src/themes/custom-theme.json'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/routes/AppNavigator';

export default function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
}