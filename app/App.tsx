import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Start from './screens/Startup/Start'
import Start2 from './screens/Startup/Start2'
import Start3 from './screens/Startup/Start3'

const App = () => {
  return (
    <View style={styles.container}>
      {/* <Start /> */}
      {/* <Start2 /> */}
      <Start3 />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
})

export default App

