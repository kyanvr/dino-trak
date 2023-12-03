import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Start from './screens/Startup/Start'
import Start2 from './screens/Startup/Start2'

const App = () => {
  return (
    <View style={styles.container}>
      <Start2 />
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

export default App

