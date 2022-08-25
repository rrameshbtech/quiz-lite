import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constants';
import designTokens from '../assets/styles/design-tokens';

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
    <View style={styles.container}>
      <Text style={styles.title} h1>Congratulations!</Text>
      <Text h3 style={styles.subtitle}>
        You have scored {result.score} in {result.elapsedTime} ms
      </Text>
      <Button size='lg' title='Back To Dashboard' onPress={() => navigation.push('home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.background,
  },
  title: {
    color: 'white',
    margin:20,
    alignSelf:"center"
  },
  subtitle: {
    color: 'white',
    margin:10,
    alignSelf:"center"
  }

});