import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, ImageStore } from 'react-native';
import Cards from './Cards.js'

function CardView() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 10 }} />
      <Cards />
    </View>
  )
}

export default CardView;