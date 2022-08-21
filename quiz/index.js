import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Question } from './question';


export function Quiz({questions}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Question {...{currentQuestion}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});