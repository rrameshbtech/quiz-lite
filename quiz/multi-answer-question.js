import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text, Button } from '@rneui/themed';
import designTokens from '../assets/styles/design-tokens';
import { QuestionText } from './question-text';

const SCORE = 10;

export function MultiAnswerQuestion({
  description,
  options,
  answer,
  onSubmit,
}) {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  function setSelectedOptions(selectedOption) {
    updateSelectedOptions(selectedOption);
    updateScore();
  }

  function updateSelectedOptions(selectedOption) {
    selected.includes(selectedOption)
      ? setSelected(selected.filter((option) => option !== selectedOption))
      : setSelected([...selected, selectedOption]);
  }

  function updateScore() {
    if (selected.length === 0) {
      setScore(0);
      return;
    }

    if (isAnswerCorrect()) {
      setScore(SCORE);
    } else {
      setScore(0);
    }
  }

  function isAnswerCorrect() {
    return selected.sort().join('') === answer.sort().join('');
  }

  return (
    <View>
      <QuestionText>{description}</QuestionText>
      {options.map((option) => (
        <CheckBox
          key={option}
          checked={selected.includes(option)}
          onPress={() => setSelectedOptions(option)}
          title={<Text h4>{option}</Text>}
          containerStyle={styles.option}
        ></CheckBox>
      ))}
      <Button
        title='Submit'
        size='lg'
        onPress={() => onSubmit(score, selected)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: designTokens.colors.background,
  },
});
