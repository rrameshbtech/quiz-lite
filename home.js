import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
export function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title='Start Quiz'
        onPress={() => navigation.navigate('quiz', {username: 'rrameshbtech'})}
      />
    </View>
  );
}
