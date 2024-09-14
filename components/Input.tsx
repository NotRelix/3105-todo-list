import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useState } from "react";

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
}

export default function Input({title, setTitle, description, setDescription}: InputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={[styles.input, styles.inputTitle]} 
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
      <View style={styles.listItemContainer}>
        <Pressable>
          <Text style={styles.listItem}>+ List item</Text>
        </Pressable>
      </View>
    </View>
  );
}

function AutoExpandingTextInput({value, onChangeText, ...props}: AutoExpandingTextInputProps) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (value == '') {
      setHeight(0);
    }
  }, [value])

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
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E6E6E6',
    paddingTop: 10,
    paddingBottom: 20, 
  },
  input: {
    padding: 10,
    height: 40,
    width: 280,
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E6E6E6',
    color: '#E6E6E6',
    maxHeight: 150,
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    height: 50,
    marginBottom: -15,
  },
  listItemContainer: {
    width: 300,
    // borderWidth: 1,
    borderColor: '#E6E6E6',
    paddingLeft: 40,
  },
  listItem: {
    color: '#E6E6E6',
  }
});