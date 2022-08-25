import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MultiAnswerQuestion } from './multi-answer-question';
import { SingleAnswerQuestion } from './single-answer-question';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constants';
import designTokens from '../assets/styles/design-tokens';

export function Quiz({ navigation, route }) {
  const { username, questions } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const currentQuestion = questions[currentQuestionIndex];
  
  function isSingleAnswerQuestion(question) {
    return question.type.toLowerCase() === 'single';
  }

  async function handleSubmittedAnswer(score, elapsedTime) {
    setAnswers((existingAnswers) => [
      ...existingAnswers,
      { score, elapsedTime, index: currentQuestionIndex },
    ]);
    if (!isLastQuestion()) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  function totalScore() {
    return answers.reduce((total, answer) => total + answer.score, 0);
  }

  function totalElapsedTime() {
    return answers.reduce((total, answer) => total + answer.elapsedTime, 0);
  }

  useEffect(() => {
    const submitResults = async () => {
      await storeScore();
      showResults();
    };
    if (isLastQuestionAnswered()) {
      submitResults();
    }
  }, [answers]);

  function isLastQuestion() {
    return currentQuestionIndex === questions.length - 1;
  }

  function isLastQuestionAnswered() {
    return isLastQuestion() && answers.length === currentQuestionIndex + 1;
  }

  function showResults() {
    navigation.navigate('results', { username });
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

  const storeScore = async () => {
    try {
      const existingResults = await getExistingScores();
      const currentResult = {
        username,
        answers,
        score: totalScore(),
        elapsedTime: totalElapsedTime(),
      };
      const updatedResults = [
        currentResult,
        ...existingResults.filter((result) => result.username !== username),
      ];

      await AsyncStorage.setItem(
        constants.STORE_KEY,
        JSON.stringify(updatedResults)
      );
    } catch (e) {
      console.log('Error saving score: ', e);
    }
  };

  return (
    <View style={styles.container}>
      {isSingleAnswerQuestion(currentQuestion) ? (
        <SingleAnswerQuestion
          {...currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          onSubmit={handleSubmittedAnswer}
        />
      ) : (
        <MultiAnswerQuestion
          {...currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          onSubmit={handleSubmittedAnswer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: designTokens.colors.background,
    flex:1,
    color: 'white'
  },
});
