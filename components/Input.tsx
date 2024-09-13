import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

export default function Input() {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input} 
        placeholder="Title"
        placeholderTextColor={'#E6E6E6'}
      />
      <AutoExpandingTextInput 
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={'#E6E6E6'}
      />
      <Pressable style={styles.button} onPress={() => alert("You Clicked on a Button!")}>
        <Text style={styles.buttonLabel}>Add</Text>
      </Pressable>
    </View>
  );
}

function AutoExpandingTextInput({...props}) {
  const [text, setText] = useState('');
  const [height, setHeight] = useState(0);

  return (
    <TextInput 
      {...props}
      multiline={true}
      onChangeText={(text) => setText(text)}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height)
      }}
      style={[styles.input, {height: Math.max(55, height)}]}
      value={text}
    />
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    width: 100,
  },
  buttonLabel: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E6E6E6',
    color: '#E6E6E6',
    maxHeight: 100,
    marginBottom: 10,
  }
});