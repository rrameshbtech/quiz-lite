import { Text } from '@rneui/themed';
import { StyleSheet } from 'react-native';

export function QuestionText({ children }) {
  return <Text h2 style={styles.text} >{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color:'#454442'
  }
})