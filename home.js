import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ListItem, Avatar } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from './constants';

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

  return (
    <View>
      <Text h1>CBE FE Community Quiz</Text>
      <Text h2>Top Scorers</Text>
      <View>
        {topScorers.map((contestant) => (
          <ListItem key={contestant.username} bottomDivider>
            <Avatar
              size={64}
              rounded
              title={contestant.username.toUpperCase().substring(0, 2)}
              containerStyle={{ backgroundColor: '#3d4db7' }}
            />
            <ListItem.Content>
              <ListItem.Title>{contestant.username}</ListItem.Title>
              <ListItem.Subtitle>
                Scored {contestant.score} in {contestant.elapsedTime} ms
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <Button title='Start Quiz' onPress={() => navigation.navigate('start')} />
    </View>
  );
}
