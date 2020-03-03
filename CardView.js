import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, ImageStore, ShadowPropTypesIOS } from 'react-native';
import Cards from './Cards.js'

function CardView(props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 60 }} />
      <Cards handleSwipeLeft={props.handleSwipeLeft} handleSwipeRight={props.handleSwipeRight} />
    </View>
  )
}

export default CardView;