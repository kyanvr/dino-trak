import 'expo-dev-client';
import 'react-native-get-random-values';
import React from 'react';
import {registerRootComponent} from 'expo'
import {AppWrapperNonSync} from './app/AppWrapper';


const App = () => {
  return (
    <AppWrapperNonSync />
  )
}

registerRootComponent(App);
