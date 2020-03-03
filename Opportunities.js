import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Opportunities({ bestOpportunities }) {

  return (
    bestOpportunities.map(opportunity => {
      return (
        <View style={styles.container}>
          <Text style={styles.name}>{opportunity.charityName}</Text>
          <Text style={styles.donate}>Donate Now</Text>
          <Button style={styles.button} title="Donate" />
        </View>
      )
    })
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 30
  },
  donate: {
    fontSize: 20
  },
  button: {
    width: 400
  }
});

export default Opportunities;