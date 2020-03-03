import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, ImageStore, PanResponder } from 'react-native';

import images from './fishData.js'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCardIndex: 0,
    }

    this.position = new Animated.ValueXY();

    this.rotate = this.position.x.interpolate({
      inputRange: [-(SCREEN_WIDTH/2), 0, SCREEN_WIDTH/2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { 
              x: SCREEN_WIDTH + 100,
              y: gestureState.dy
            }
          }).start(() => {
            this.props.handleSwipeRight();
            this.setState({
              currentCardIndex: (this.state.currentCardIndex+1),
            }, () => {
              this.position.setValue({x: 0, y: 0});
            });
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: {
              x: -SCREEN_WIDTH - 100,
              y: gestureState.dy
            }
          }).start(() => {
            this.props.handleSwipeLeft();
            this.setState({
              currentCardIndex: (this.state.currentCardIndex+1),
            }, () => {
              this.position.setValue({x: 0, y: 0});
            });
          })
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0}
          }).start();
        }
      }
    })

  }


  render() {
    const { currentCardIndex } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {images.map((image, index) => {
          if (index < currentCardIndex) {
            return null;
          } else if (index === currentCardIndex) {
            return (
              <Animated.View
                {...this.PanResponder.panHandlers}
                key={image.id}
                style={[
                  this.rotateAndTranslate,
                  {
                    height: SCREEN_HEIGHT - 300,
                    width: SCREEN_WIDTH,
                    padding: 10,
                    position: 'absolute'
                  }
                ]}
              >
                <Image
                  style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: "cover",
                    borderRadius: 20
                  }}
                  source={image.uri}
                />
              </Animated.View>
            )
          } else {
            return (
              <Animated.View
                key={image.id}
                style={
                  {
                    height: SCREEN_HEIGHT - 300,
                    width: SCREEN_WIDTH,
                    padding: 10,
                    position: 'absolute'
                  }
                }
              >
                <Image
                  style={{
                    flex: 1,
                    height: null,
                    width: null,
                    resizeMode: "cover",
                    borderRadius: 20
                  }}
                  source={image.uri}
                />
              </Animated.View>
            )
          }
        }).reverse()
        }
      </View>
    )
  }
}

export default Cards;