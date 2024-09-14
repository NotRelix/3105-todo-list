import Input from "@/components/Input";
import { Pressable, StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import { useState } from "react";

interface Note{
  id: number;
  title: string;
  description: string;
  lists: Array<string>;
}

export default function Index() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lists, setLists] = useState<string[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const addNotes = () => {
    const curid = id + 1;
    const object: Note = { id: curid, title: title, description: description, lists: lists }; 
    setId(curid);
    setNotes([...notes, object]); 
    setTitle('');
    setDescription('');
    setLists([]);
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const addList = () => {

  }

  return (
    <View style={styles.container}>
      <Input 
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />

      <Pressable style={styles.button} onPress={addNotes}>
        <Text style={styles.buttonLabel}>Add Note</Text>
      </Pressable>
      <FlatList
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center', gap: 10}}
        numColumns={2}
        data={notes}
        renderItem={({item}) => 
        <View 
        style={styles.note}
        >
          <Text>{item.id} {item.title}</Text>
          <Text>{item.description}</Text>
          <FlatList
            data={item.lists}
            renderItem={({item})=> <Text>{item}</Text>}
          />
          <Pressable style={styles.deleteButton} onPress={() => deleteNote(item.id)}>
              <Text style={styles.buttonLabel}>Delete</Text>
            </Pressable>
        </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    width: 100,
    margin: 10,
  },
  deleteButton: {
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    marginTop: 10,
  },
  buttonLabel: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  note: {
    width: 180,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});