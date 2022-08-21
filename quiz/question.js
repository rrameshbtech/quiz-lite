import { View, Text } from 'react-native';

export function Question({ description, options, answer, onSelect }) {
  return (
    <View>
      <Text>Question: {description}</Text>
    </View>
  );
}
