import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constants';

export function Results({ navigation, route }) {
  const { username } = route.params;
  const [result, setResult] = useState({});

  useEffect(() => {
    const updateResult = async () => {
      try {
        const quizResults = await AsyncStorage.getItem(constants.STORE_KEY);
        if (quizResults !== null) {
          const results = JSON.parse(quizResults);
          setResult(results.find((item) => item.username === username));
        }
        return [];
      } catch (e) {
        console.log('Error retriving score: ', e);
      }
    };
    updateResult();
  }, [username]);

  return (
    <View>
      <Text h1>Congratulations!</Text>
      <Text h3>
        You has scored {result.score} in {result.elapsedTime} ms
      </Text>
      <Button title='Back To Dashboard' onPress={() => navigation.push('home')} />
    </View>
  );
}
