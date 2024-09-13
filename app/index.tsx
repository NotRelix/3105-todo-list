import Input from "@/components/Input";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#25292e',
  },
});