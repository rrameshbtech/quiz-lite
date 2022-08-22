import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import designTokens from '../assets/styles/design-tokens';
import { QuestionText } from './question-text';
import { Timer } from './timer';

const SCORE = 10;
export function SingleAnswerQuestion({
  description,
  options,
  answer,
  onSubmit,
}) {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (answer[0] === selected[0]) {
      setScore(SCORE);
      console.log(selected, answer);
    } else {
      setScore(0);
    }
  }, [selected]);

  useEffect(() => {
    submitAnswer();
  }, [score]);

  function submitAnswer() {
    onSubmit(score, selected);
  }
  return (
    <View>
      <Timer duration={10} onElapse={submitAnswer}></Timer>
      <QuestionText>{description}</QuestionText>
      {options.map((option) => (
        <CheckBox
          key={option}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={selected.includes(option)}
          onPress={() => setSelected([option])}
          title={<Text h4>{option}</Text>}
          containerStyle={styles.option}
        ></CheckBox>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: designTokens.colors.background,
  },
});
