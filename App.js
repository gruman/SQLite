import * as React from 'react';
import { SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';

function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <StackNavigator />
    </SafeAreaView>
  );
}

export default App;