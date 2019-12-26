import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default class App extends React.Component {
  state = {
    points: 100,
    characters: [],
    showChars: false
  }

  generateCharacters = () => {
    const charsArray = ['W', 'L', 'N']

    function getRandomNumber(min, max) {
      return Math.trunc(Math.random() * (max - min) + min)
    }

    const nextCharsArray = []

    for(let i = 0; i < 9; i++) {
      nextCharsArray.push(charsArray[getRandomNumber(0, 3)])
    }

    this.setState({ characters: nextCharsArray })
  }

  restartGame = () => {
    this.setState({ showChars: false })
    this.generateCharacters()
  }

  gameResult = (pressedKey) => {
    const index = pressedKey - 1
    const selectedCharacter = this.state.characters[index]

    let matches = 1

    console.log(index)

    if(this.state.characters[index - 1] === selectedCharacter) {
      matches += 1
    }

    if(this.state.characters[index + 1] === selectedCharacter) {
      matches += 1
    }

    if(this.state.characters[index + 3] === selectedCharacter) {
      matches += 1
    }

    if(this.state.characters[index - 3] === selectedCharacter) {
      matches += 1
    }

    this.setState(prevState => ({
        ...prevState,
        points: prevState.points - (matches * (selectedCharacter === 'W' ? -5 : selectedCharacter === 'L' ? 5 : 1))
      })
    )
  }

  componentDidMount = () => {
    this.generateCharacters()
  }

  render() {
    const { showChars } = this.state

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            color: '#ff3d00',
            marginBottom: 40
          }}
        >
          Points: {this.state.points}
        </Text>

        <View
          style={{
            flex: 0.5,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            position: 'relative'
          }}
        >
          {this.state.characters.map((character, key) => (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
                height: '30%',
                backgroundColor: '#9c27b0',
                margin: '1%',
                borderRadius: 10
              }}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({ showChars: true })
                this.gameResult(key)
              }}
            >
              <Text style={{ color: '#fff', fontSize: 40 }} >{showChars ? character : ++key}</Text>
            </TouchableOpacity>))}
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginTop: 60 }}
          onPress={() => this.restartGame()}
        >
          <Text
            style={{
              fontSize: 20,
              backgroundColor: '#283593',
              color: '#e8eaf6',
              paddingTop: 18,
              paddingBottom: 20,
              paddingRight: 20,
              paddingLeft: 20,
              borderRadius: 10
            }}
          >
            Restart
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center'
  }
});
