import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text } from '@rneui/themed';
import designTokens from '../assets/styles/design-tokens';
import { QuestionText } from './question-text';

const SCORE = 10;

export function SingleAnswerQuestion({
  description,
  options,
  answer,
  onSubmit,
}) {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  function setSelectedOptions(selectedOption) {
    setSelected([selectedOption]);
    updateScore();
    onSubmit(score, selected);
  }

  function updateScore() {
    if (answer[0] === selected[0]) {
      setScore(SCORE);
      return;
    }

    setScore(0);
  }

  return (
    <View>
      <QuestionText>{description}</QuestionText>
      {options.map((option) => (
        <CheckBox
          key={option}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={selected.includes(option)}
          onPress={() => setSelectedOptions(option)}
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
