import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text, Button } from '@rneui/themed';
import designTokens from '../assets/styles/design-tokens';
import { QuestionText } from './question-text';
import { Timer } from './timer';
import constants from '../constants';

export function MultiAnswerQuestion({
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

  function setSelectedOptions(selectedOption) {
    selected.includes(selectedOption)
      ? setSelected((current) =>
          current.filter((option) => option !== selectedOption)
        )
      : setSelected((current) => [...current, selectedOption]);
  }

  const score = () => {
    if (isCorrectAnswer()) {
      return constants.SCORE;
    }
    return 0;
  };

  function isCorrectAnswer() {
    console.log(selected.sort().join(''),  answer.sort().join(''));
    return selected.sort().join('') === answer.sort().join('');
  }

  function submitAnswer() {
    onSubmit(score(), elapsedTime, selected);
  }

  return (
    <View>
      <Timer
        code={questionNumber}
        duration={10}
        onElapse={submitAnswer}
        onTick={setElapsedTime}
      ></Timer>
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
      <Button title='Submit' size='lg' onPress={submitAnswer} />
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: designTokens.colors.background,
  },
});
