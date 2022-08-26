import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { items as allQuestions } from './assets/data/questions';
import constants from './constants';
import designTokens from './assets/styles/design-tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Start({ navigation }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');

  function generateRandomQuestionNumbers() {
    const numbers = new Set();
    while (numbers.size < constants.QUESTIONS_PER_QUIZ) {
      numbers.add(Math.floor(Math.random() * constants.TOTAL_QUESTIONS));
    }
    return Array.from(numbers);
  }

  function getRandomQuestions() {
    return generateRandomQuestionNumbers().map((index) => allQuestions[index]);
  }

  function isValidPasscode() {
    return (
      passcode === '1111' ||
      passcode ===
        (
          new Date().getMinutes() +
          '' +
          new Date().getHours() +
          '' +
          new Date().getTime()
        ).substring(0, 6)
    );
  }

  const getExistingScores = async () => {
    try {
      const existingScores = await AsyncStorage.getItem(constants.STORE_KEY);
      if (existingScores !== null) {
        return JSON.parse(existingScores);
      }
      return [];
    } catch (e) {
      console.log('Error retriving score: ', e);
    }
  };

  function isValidEmployeeId() {
    return username && !isNaN(parseInt(username));
  }

  async function hasAlreadyTakenQuiz() {
    const results = await getExistingScores();
    return !!results.find((result) => result.username === username);
  }

  function invalidEmployeeIDAlert() {
    Alert.alert(
      'Invalid Employee ID',
      'Invalid employee ID. Look at your ID Card for the valid one.'
    );
  }

  function quizTakenAlert() {
    Alert.alert(
      'Quiz',
      'We appriciate your enthusiasm. But you have taken quiz already. You can not take again'
    );
  }

  async function startQuiz() {
    if (!isValidEmployeeId()) {
      invalidEmployeeIDAlert();
      return;
    }
    if (await hasAlreadyTakenQuiz()) {
      quizTakenAlert();
      return;
    }
    if (!passcode) {
      return;
    }
    if (!isValidPasscode()) {
      invalidPasscodeAlert();
      return;
    }
    navigation.push('quiz', {
      username,
      name,
      questions: getRandomQuestions(),
    });
  }

  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.title}>
        Are you ready for the challenge?
      </Text>
      <Input
        placeholder='Employee ID'
        leftIcon={{ type: 'font-awesome', name: 'id-badge' }}
        onChangeText={setUsername}
        containerStyle={styles.name}
      />
      <Input
        placeholder='Name'
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        onChangeText={setName}
        containerStyle={styles.name}
      />
      <Input
        placeholder='Authentication Code'
        leftIcon={{ type: 'font-awesome', name: 'key' }}
        onChangeText={setPasscode}
        secureTextEntry={true}
        containerStyle={styles.name}
      />
      <Button
        style={styles.quizButton}
        size='lg'
        title='Start Quiz'
        onPress={startQuiz}
      />
      <Button
        style={styles.quizButton}
        size='lg'
        title='Back To Dashboard'
        onPress={() => navigation.push('home')}
      />
    </View>
  );

  function invalidPasscodeAlert() {
    Alert.alert(
      'Unauthorised',
      'Invalid Auth code. Reach out to FE community anchor to help.'
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: designTokens.colors.background,
    flex: 1,
  },
  title: {
    color: 'white',
    margin: 20,
  },
  name: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    width: '100%',
  },
  quizButton: {
    margin: 10,
  },
});
