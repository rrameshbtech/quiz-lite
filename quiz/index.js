import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MultiAnswerQuestion } from './multi-answer-question';
import { SingleAnswerQuestion } from './single-answer-question';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constants';
import { items as questions } from '../assets/data/questions';

export function Quiz({ navigation, route }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const { username } = route.params;

  function isSingleAnswerQuestion(question) {
    return question.type === 'single';
  }

  function addScore(newScore) {
    setScore((currentScore) => currentScore + newScore);
  }

  async function handleSubmittedAnswer(newScore) {
    addScore(newScore);
    if (!isLastQuestion()) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }
    await showResults();
  }

  function isLastQuestion() {
    return currentQuestionIndex === questions.length - 1;
  }

  async function showResults() {
    await storeScore();
    navigation.navigate('results');
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
      const scores = await getExistingScores();
      scores.push({ username, score });
      await AsyncStorage.setItem(constants.STORE_KEY, JSON.stringify(scores));
    } catch (e) {
      console.log('Error saving score: ', e);
    }
  };

  return (
    <View style={styles.container}>
      {isSingleAnswerQuestion(currentQuestion) ? (
        <SingleAnswerQuestion
          {...currentQuestion}
          onSubmit={handleSubmittedAnswer}
        />
      ) : (
        <MultiAnswerQuestion
          {...currentQuestion}
          onSubmit={handleSubmittedAnswer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
