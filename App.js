import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import { Quiz } from './quiz';
import questions from "./assets/data/questions.json";
import designTokens from './assets/styles/design-tokens';

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
    backgroundColor: designTokens.colors.background,
    padding: 20,
    paddingTop:40
  },
  button: {
    margin: 10,
  }
});
