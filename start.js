import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { items as allQuestions } from './assets/data/questions';
import constants from './constants';
import designTokens from './assets/styles/design-tokens';

export function Start({ navigation }) {
  const [username, setUsername] = useState('');
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
    <View style={styles.container}>
      <Text h1 h1Style={styles.title}>
        Are you ready for the challenge?
      </Text>
      <Input
        placeholder='User Name'
        leftIcon={{ type: 'font-awesome', name: 'user' }}
        onChangeText={setUsername}
        containerStyle={styles.name}
      />
      <Button
        style={styles.quizButton}
        size='lg'
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
