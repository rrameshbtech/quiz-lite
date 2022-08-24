import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { items as allQuestions } from './assets/data/questions';
import constants from './constants';

export function Home({ navigation }) {

  function generateRandomQuestionNumbers() {
    const numbers = new Set();
    while (numbers.size < constants.QUESTIONS_PER_QUIZ) {
      numbers.add(Math.floor(Math.random() * constants.TOTAL_QUESTIONS + 1));
    }
    return Array.from(numbers);
  }

  function getRandomQuestions() {
    return generateRandomQuestionNumbers().map((index) => allQuestions[index]);
  }

  return (
    <View>
      <Text>Home</Text>
      <Button
        title='Start Quiz'
        onPress={() => navigation.navigate('quiz', {username: 'rrameshbtech', questions: getRandomQuestions()})}
      />
    </View>
  );
}
