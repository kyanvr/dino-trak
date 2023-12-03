import React, { useCallback, useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import App from './App';
import * as SplashScreen from "expo-splash-screen";
import colors from './constants/colors';

import {RealmProvider} from '@realm/react';
import {schemas} from './models';

import { useFonts, OpenSans_400Regular  } from "@expo-google-fonts/open-sans";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const AppWrapper = () => {
  let [fontsLoaded, fontError] = useFonts({
		OpenSans: OpenSans_400Regular,
	});

  const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
		return null;
   }

  return (
		<SafeAreaView style={styles.screen} onLayout={onLayoutRootView}>
			<RealmProvider schema={schemas}>
				<App />
			</RealmProvider>
		</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.black,
    fontFamily: 'OpenSans',
    padding: 25,
  },
});

export default AppWrapper
