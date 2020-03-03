import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated } from 'react-native';
import axios from 'axios';

import images from './fishData.js'

import CardView from './CardView';
import Opportunities from './Opportunities';
import { APP_ID, APP_KEY } from './apiKey';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientScores: null,
      currentCardIndex: 0,
      bestOpportunities: [],
    }

    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
  };

  getCharityData() {
    let apiRoot = 'https://api.data.charitynavigator.org/v2';
    let endPoint = 'Organizations';

    axios.get(`${apiRoot}/${endPoint}?app_id=${APP_ID}&app_key=${APP_KEY}&pageSize=4`)
      .then(data => {
        let bestOpportunities = data.data.slice(1)
        console.log(bestOpportunities)
        this.setState({
          bestOpportunities,
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSwipeRight() {
    let currentScores = this.state.currentScores;
    let cause = images[this.state.currentCardIndex].id;
    if (currentScores) {
      let currentCauses = Object.keys(currentScores);
      if (currentCauses.includes(cause)) {
        currentScores[cause] += 1;
      } else {
        currentScores[cause] = 1;
      }
      if (this.state.currentCardIndex >= 0) {
        this.getCharityData();
      }
      this.setState({
        clientScores: { cause: 1 },
        currentCardIndex: (this.state.currentCardIndex + 1),
      });
    } else {
      if (this.state.currentCardIndex >= 0) {
        this.getCharityData();
      }
      this.setState({
        clientScores: { cause: 1 },
        currentCardIndex: (this.state.currentCardIndex + 1),
      });
    }
  }

  handleSwipeLeft() {
    if (this.state.currentCardIndex >= 0) {
      this.getCharityData();
    }
    this.setState({
      currentCardIndex: (this.state.currentCardIndex + 1),
    });
  }

  render() {
    const { currentCardIndex, bestOpportunities } = this.state
    let provideOptions = currentCardIndex === 10 ? true : false;

    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Text style={styles.header}>Connectr</Text>
          <Text style={styles.subheader}>Discover. Help. Change.</Text>
        </View>
        {!provideOptions ?
          <>
            <CardView handleSwipeLeft={this.handleSwipeLeft} handleSwipeRight={this.handleSwipeRight} />
            <View style={styles.header_container}>
              <Text style={styles.body}>What causes most impact the world?</Text>
              <Text style={styles.subbody}>I want to support: {images[currentCardIndex].desc}</Text>
            </View>
          </>
          :
          <>
            <Opportunities bestOpportunities={bestOpportunities} />
          </>
        }
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',

  },
  header_container: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 50,
  },
  subheader: {
    fontSize: 35,
  },
  body: {
    fontSize: 35,
  },
  subbody: {
    fontSize: 30,
  }
});

export default App;