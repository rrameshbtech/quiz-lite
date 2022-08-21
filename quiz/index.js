import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MultiAnswerQuestion } from './multi-answer-question';
import { SingleAnswerQuestion } from './single-answer-question';

export function Quiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  function isSingleAnswerQuestion(question) {
    return question.type === 'single';
  }

  function addScore(currentScore) {
    setScore(score + currentScore);
  }

  function handleSubmittedAnswer(currentScore) {
    addScore(currentScore);
    if (!isLastQuestion()) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }
    showResults();
  }

  function isLastQuestion() {
    return currentQuestionIndex === questions.length - 1;
  }

  function showResults() {
    console.log(`You scored ${score} out of ${questions.length}`);
  }

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
