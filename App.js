import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated } from 'react-native';

import CardView from './CardView';

function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Text style={styles.header}>Connectr</Text>
      </View>
      <CardView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  header_container: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 30,
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

export default App;