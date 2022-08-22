import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Quiz as QuizScreen } from './quiz';
import designTokens from './assets/styles/design-tokens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Results as ResultsScreen } from './results';
import { Thanks as ThanksScreen } from './thanks';
import { Home as HomeScreen } from './home';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='home' component={HomeScreen} />
          <Stack.Screen
            name='quiz'
            component={QuizScreen}
          />
          <Stack.Screen name='results' component={ResultsScreen} />
          <Stack.Screen name='thanks' component={ThanksScreen} /> 
        </Stack.Navigator>
        {/* <StatusBar style='auto' /> */}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.background,
    padding: 20,
    paddingTop: 40,
  },
  button: {
    margin: 10,
  },
});
