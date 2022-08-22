import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckBox, Text, Button } from '@rneui/themed';
import designTokens from '../assets/styles/design-tokens';
import { QuestionText } from './question-text';
import { Timer } from './timer';
import constants from '../constants';

export function MultiAnswerQuestion({
  description,
  options,
  answer,
  onSubmit,
}) {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  function setSelectedOptions(selectedOption) {
    selected.includes(selectedOption)
      ? setSelected((current) =>
          current.filter((option) => option !== selectedOption)
        )
      : setSelected((current) => [...current, selectedOption]);
  }

  useEffect(() => {
    if (selected.length === 0) {
      setScore(0);
      return;
    }

    if (isAnswerCorrect()) {
      setScore(constants.SCORE);
    } else {
      setScore(0);
    }
  }, [selected]);

  function isAnswerCorrect() {
    console.log(selected.sort().join(''), answer.sort().join(''));
    return selected.sort().join('') === answer.sort().join('');
  }

  function submitAnswer() {
    onSubmit(score, elapsedTime, selected);
  }

  return (
    <View>
      <Timer duration={10} onElapse={submitAnswer} onTick={setElapsedTime}></Timer>
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
