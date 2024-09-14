import { Pressable, StyleSheet, Text, View, TextInput, FlatList} from "react-native";
import { useState } from "react";

interface Note{
  id: number;
  title: string;
  lists: Array<string>;
}

export default function Input() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [lists, setLists] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const addNotes = () => {
    const curid = id+1;
    const object: Note = { id: curid, title: title, lists: lists }; 
    setId(curid);
    setNotes([...notes, object]); 
    setTitle('');
    setLists([]);
  }

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
        value={lists}
        placeholderTextColor={'#E6E6E6'}
      />
      <Pressable style={styles.button} onPress={addNotes}>
        <Text style={styles.buttonLabel}>Add</Text>
      </Pressable>
      <View>
        <FlatList
          data={notes}
          renderItem={({item}) => 
          <View 
          style={styles.note}
          >
            <Text>{item.id} {item.title}</Text>
            <FlatList
              data={item.lists}
              renderItem={({item})=> <Text>{item}</Text>}
            />
          </View>}
        />
      </View>
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
  note: {
    width: 'auto',
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'white',
  },
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