import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

interface Note {
  id: number;
  title: string;
  description: string;
  lists: Array<string>;
}

interface AutoExpandingTextInputProps extends React.ComponentProps<typeof TextInput> {
  value?: string;
  onChangeText?: (text: string) => void;
}

interface InputProps {
  title: string;
  setTitle: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  notes: Note[];
}

export default function Input({title, setTitle, description, setDescription, notes}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.input} 
        placeholder="Title"
        placeholderTextColor={'#E6E6E6'}
        value={title}
        onChangeText={(val)=>setTitle(val)}
      />
      <AutoExpandingTextInput 
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={'#E6E6E6'}
        value={description}
        onChangeText={(val)=>setDescription(val)}
      />
    </View>
  );
}

function AutoExpandingTextInput({value, onChangeText, ...props}: AutoExpandingTextInputProps) {
  const [height, setHeight] = useState(0);

  return (
    <TextInput 
      {...props}
      multiline={true}
      onChangeText={onChangeText}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height)
      }}
      style={[styles.input, {height: Math.max(55, height)}]}
      value={value}
    />
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
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