import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Start from './screens/Startup/Start'
import colors from './constants/colors'

const AppNonSync = () => {
  return (
    <View style={styles.container}>
      <Start />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default AppNonSync

