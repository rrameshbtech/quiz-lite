import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { items as allQuestions } from './assets/data/questions';
import constants from './constants';
import designTokens from './assets/styles/design-tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Reset({ navigation }) {
  const [passcode, setPasscode] = useState('');

  function isValidPasscode() {
    return passcode === '097865';
  }

  const resetResults = async () => {
    try {
      await AsyncStorage.setItem(
        constants.STORE_KEY,
        JSON.stringify([])
      );
    } catch (e) {
      console.log('Error saving score: ', e);
    }
  };

  async function resetQuiz() {
    if (!passcode) {
      return;
    }
    if (!isValidPasscode()) {
      invalidPasscodeAlert();
      return;
    }
    await resetResults();
    resetSuccessAlert()
  }

  function invalidPasscodeAlert() {
    Alert.alert(
      'Unauthorised',
      'Invalid Auth code. Reach out to FE community anchor to help.'
    );
  }
  function resetSuccessAlert() {
    Alert.alert(
      'Reset Success',
      'Reset successfull. You can start play again.'
    );
  }
  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.title}>
        Are you sure to reset quiz? Once done can not be revoked.
      </Text>
      <Input
        placeholder='Authentication Code'
        leftIcon={{ type: 'font-awesome', name: 'key' }}
        onChangeText={setPasscode}
        secureTextEntry={true}
        containerStyle={styles.name}
      />
      <Button
        style={styles.quizButton}
        size='lg'
        title='Reset Quiz'
        onPress={resetQuiz}
      />
      <Button
        style={styles.quizButton}
        size='lg'
        title='Back To Dashboard'
        onPress={() => navigation.push('home')}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: designTokens.colors.background,
    flex: 1,
  },
  title: {
    color: 'white',
    margin: 20,
  },
  name: {
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    width: '100%',
  },
  quizButton: {
    margin: 10,
  },
});
