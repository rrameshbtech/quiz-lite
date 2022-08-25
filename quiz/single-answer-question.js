import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import designTokens from '../assets/styles/design-tokens';
import { QuestionText } from './question-text';
import { Timer } from './timer';
import constants from '../constants';

export function SingleAnswerQuestion({
  questionNumber,
  description,
  options,
  answer,
  onSubmit,
}) {
  const [selected, setSelected] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setSelected([]);
    setElapsedTime(0);
  }, [questionNumber]);

  useEffect(() => {
    if (selected.length > 0) {
      submitAnswer();
    }
  }, [selected]);

  function score() {
    return answer[0] === selected[0] ? constants.SCORE : 0;
  }

  function submitAnswer() {
    onSubmit(score(), elapsedTime, selected);
  }

  return (
    <View>
      <Timer
        code={questionNumber}
        duration={constants.TIMER_DURATION}
        onElapse={submitAnswer}
        onTick={setElapsedTime}
      ></Timer>
      <QuestionText>{description}</QuestionText>
      {options.map((option) => (
        <CheckBox
          key={option}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={selected.includes(option)}
          checkedColor="#454442"
          onPress={() => setSelected([option])}
          title={<Text h4 style={styles.optionText}>{option}</Text>}
          containerStyle={styles.option}
        ></CheckBox>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: designTokens.colors.background,
  },
  option: {
    backgroundColor: designTokens.colors.background,
  },
  optionText: {
    color: '#454442',
    margin:5
  }
});
