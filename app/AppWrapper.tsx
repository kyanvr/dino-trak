import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNonSync from './App';

import colors from './constants/colors';

import {RealmProvider} from '@realm/react';
import {schemas} from './models';

export const AppWrapperNonSync = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider schema={schemas}>
        <AppNonSync />
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
