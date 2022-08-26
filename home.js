import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Button, ListItem, Avatar, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from './constants';
import designTokens from './assets/styles/design-tokens';

export function Home({ navigation }) {
  const [topScorers, setTopScorers] = useState([]);

  function sortByScoreAndElapsedTime(results) {
    return results.sort(
      (prev, result) =>
        prev.score < result.score ||
        (prev.score === result.score && prev.elapsedTime > result.elapsedTime)
    );
  }

  useEffect(() => {
    async function fetchResults() {
      try {
        const resultString = await AsyncStorage.getItem(constants.STORE_KEY);
        if (resultString !== null) {
          const results = JSON.parse(resultString);
          const sortedResults = sortByScoreAndElapsedTime(results);
          setTopScorers(sortedResults.slice(0, 5));
          return;
        }
        setTopScorers([]);
      } catch (e) {
        console.log('Error retriving score: ', e);
      }
    }
    fetchResults();
  }, []);

  function coloredCelebrationIcon(color) {
    return (
      <Icon
        key={color}
        color={color}
        name='celebration'
        size={40}
        type='material'
      />
    );
  }

  function name(contestant) {
    return contestant.name ?? "No Name";
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header} h1>
        CBE FE Community Quiz
      </Text>
      <Text style={styles.subtitle} h3>
        {['red', 'green', 'blue'].map(coloredCelebrationIcon)}
        Top Scorers
        {['blue', 'green', 'red'].map(coloredCelebrationIcon)}
      </Text>
      <View>
        {topScorers.length === 0 && <Text style={styles.noScoreMessage} h4>Ohh! no. Nobody played so far. Start?</Text>}
        {topScorers.map((contestant, index) => (
          <MovingView key={contestant.username} isLeftToRight={index % 2 === 0}>
            <ListItem containerStyle={styles.leader}>
              <Avatar
                size={64}
                rounded
                title={name(contestant).toUpperCase().substring(0, 2)}
                containerStyle={{ backgroundColor: '#208bdc' }}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.leaderTitle}>
                {name(contestant)} ({contestant.username})
                </ListItem.Title>
                <ListItem.Subtitle style={styles.leaderSubtitle}>
                  Scored {contestant.score} in {contestant.elapsedTime} ms
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </MovingView>
        ))}
      </View>
      <Button
        size='lg'
        style={styles.quizButton}
        title='Start Quiz'
        onPress={() => navigation.push('start')}
      />
      <Button
        size='lg'
        style={styles.resetButton}
        title='Reset Quiz'
        onPress={() => navigation.push('reset')}
      />
    </View>
  );
}

const MovingView = ({ style, children, isLeftToRight }) => {
  const directionInt = isLeftToRight ? -1 : 1;
  const offsetX = useRef(new Animated.Value(1000 * directionInt)).current;

  useEffect(() => {
    Animated.timing(offsetX, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [offsetX]);

  return (
    <Animated.View
      style={{
        ...style,
        transform: [{ translateX: offsetX }],
      }}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginBottom: 50,
    color:"#fff"
  },
  subtitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#e8e7e6',
  },
  container: {
    backgroundColor: designTokens.colors.background,
    flex: 1,
  },
  leader: {
    backgroundColor: '#e8e7e6',
    borderRadius: 7,
    margin: 10,
  },
  leaderTitle: {
    fontSize: 35,
    color: 'black',
  },
  leaderSubtitle: {
    fontSize: 20,
    color: 'black',
  },
  quizButton: {
    margin: 10,
    marginTop: 50,
  },

  resetButton: {
    margin: 10,
    marginTop: 20,
  },
  noScoreMessage: {
    alignSelf:'center',
    marginTop:50
  }
});
