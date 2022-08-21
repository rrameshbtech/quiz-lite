import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { Quiz } from './quiz';
import questions from "./assets/data/questions.json";

export default function App() {
  return (
    <View style={styles.container}>
      <Quiz questions={questions.items}></Quiz>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2dea5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
  }
});
