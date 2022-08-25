import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { items as allQuestions } from './assets/data/questions';
import constants from './constants';
import { StackActions } from '@react-navigation/native';

export function Start({ navigation }) {
  const [username, setUsername] = useState('')
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

  return (
    <View>
      <Text>Are you ready to challenge your FE knowledge?</Text>
      <Input
        placeholder='User Name'
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        onChangeText={setUsername}
      />
      <Button
        title='Start Quiz'
        onPress={() =>
          navigation.navigate('quiz', {
            username,
            questions: getRandomQuestions(),
          })
        }
      />
    </View>
  );
}

