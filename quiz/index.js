import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MultiAnswerQuestion } from './multi-answer-question';
import { SingleAnswerQuestion } from './single-answer-question';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constants';
import { items as questions } from '../assets/data/questions';

export function Quiz({ navigation, route }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const { username } = route.params;

  function isSingleAnswerQuestion(question) {
    return question.type === 'single';
  }

  function updateTotalScore(newScore) {
    setTotalScore((currentScore) => currentScore + newScore);
  }
  function updateTotalElapsedTime(newElapsedTime) {
    setTotalElapsedTime(
      (existingElapsedTime) => newElapsedTime + existingElapsedTime
    );
  }

  async function handleSubmittedAnswer(score, elapsedTime) {
    updateTotalScore(score);
    updateTotalElapsedTime(elapsedTime);

    if (!isLastQuestion()) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }
    await storeScore();
    showResults();
  }

  function isLastQuestion() {
    return currentQuestionIndex === questions.length - 1;
  }

  function showResults() {
    navigation.navigate('results', { username: 'rrameshbtech' });
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
        score: totalScore,
        elapsedTime: totalElapsedTime,
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
