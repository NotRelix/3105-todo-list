import Input from "@/components/Input";
import { Pressable, StyleSheet, Text, View, TextInput, FlatList, Modal} from "react-native";
import { useState } from "react";
import { CheckBox } from '@rneui/themed';
import { ListItem } from "@rneui/base";

interface Note{
  id: number;
  title: string;
  description: string;
  lists: Array<string>;
  completedLists: Array<number>;
  selectAll: boolean;
}

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lists, setLists] = useState<string[]>(['']);
  const [notes, setNotes] = useState<Note[]>([]);
  const [singleNote, setSingleNote] = useState<Note>();

  const addNotes = () => {
    if (title.trim() === '' && description.trim() === '' && lists.every(list => list.trim() === '')) {
      return;
    }
    const curid = id + 1;
    const object: Note = { id: curid, title: title, description: description, lists: lists, completedLists: [], selectAll: false }; 
    setId(curid);
    setNotes([...notes, object]); 
    setTitle('');
    setDescription('');
    setLists(['']);
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const passNoteValue = (note: Note) => {
    setSingleNote(note);
  }

  const updateTitle = (text: string, id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, title: text } : note
    );
    
    setNotes(updatedNotes);
  
    if (singleNote?.id === id) {
      setSingleNote({ ...singleNote, title: text });
    }
  };

  const updateDesc = (text: string, id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, description: text } : note
    );
    
    setNotes(updatedNotes);
  
    if (singleNote?.id === id) {
      setSingleNote({ ...singleNote, description: text });
    }
  };

  const updateList = (text: string, id: number) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, description: text } : note
    );
    
    setNotes(updatedNotes);
  
    if (singleNote?.id === id) {
      setSingleNote({ ...singleNote, description: text });
    }
  };

  const handleListInputChange = (text: string, index: number) => {
    if (singleNote) {
      const updatedLists = [...singleNote.lists]; 
      updatedLists[index] = text; 
      if (index === updatedLists.length - 1 && text !== '') {
          updatedLists.push('');
      }

      if (text === '' && index !== updatedLists.length - 1) {
          updatedLists.splice(index, 1);
      }
      
      const updatedNote = { ...singleNote, lists: updatedLists };
      setSingleNote(updatedNote);  

      const updatedNotes = notes.map(note => 
        note.id === singleNote.id ? { ...note, lists: updatedLists } : note
      );
      setNotes(updatedNotes);
    }
  }

  return (
    <View style={styles.container}>
      <Input 
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        lists={lists}
        setLists={setLists}
      />
      <Pressable style={styles.button} onPress={addNotes}>
        <Text style={styles.buttonLabel}>Add Note</Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topcontainer}>
              <View style={styles.buttoncontainer}>
                <Pressable
                      onPress={() => {
                        if (singleNote) {
                          deleteNote(singleNote.id);
                          setModalVisible(!modalVisible);
                        }
                      }}
                    >
                  <Text style={styles.notetext}>Delete</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.inputTitle]} 
                value={singleNote?.title}
                placeholderTextColor={'#E6E6E6'}
                placeholder="Title"
                onChangeText={(text)=> {if(singleNote){updateTitle(text, singleNote.id)}}}
              />
              <TextInput
                style={styles.input} 
                value={singleNote?.description}
                placeholderTextColor={'#E6E6E6'}
                placeholder="Description"
                onChangeText={(text)=> {if(singleNote){updateDesc(text, singleNote.id)}}}
              />
              
              {/* //Edit Incompleted List */}
              <FlatList
               data={singleNote?.lists
                .map((listItem, index) => ({ listItem, index })) 
                .filter(({ index }) => !singleNote?.completedLists.includes(index)) 
              }
              renderItem={({ item: { listItem, index } }) => {
                const isPlaceholder = listItem === '';
                const isChecked = singleNote?.completedLists.includes(index)||false;
                return (
                  <View style={{flexDirection: 'row'}}>
                    {!isPlaceholder && (
                    <CheckBox
                      checked={isChecked}
                      containerStyle={styles.checkboxContainer}
                      textStyle={[styles.checkboxText, styles.checkboxComplete]}
                      checkedColor="#979797"
                      onPress={() => {
                        const updatedNotes = notes.map((note) => {
                          if (note.id === singleNote?.id) {
                            const updatedCompletedLists = isChecked
                              ? note.completedLists.filter(i => i !== index)
                              : [...note.completedLists, index];
                            return { ...note, completedLists: updatedCompletedLists };
                          }
                          return note;
                        });
                        setNotes(updatedNotes);
                      }}
                    />
                    )}
                    <TextInput
                      key={index}
                      style={styles.input} 
                      value={listItem}
                      placeholderTextColor={'#E6E6E6'}
                      placeholder="+ List item"
                      onChangeText={(text)=> {if(singleNote){handleListInputChange(text, index)}}}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              extraData={notes}
              />

              {/* Edit Completed List */}
              <FlatList
               data={singleNote?.lists
                .map((listItem, index) => ({ listItem, index })) 
                .filter(({ index }) => singleNote?.completedLists.includes(index)) 
              }
              renderItem={({ item: { listItem, index } }) => {
                const isChecked = singleNote?.completedLists.includes(index)||false;
                return (
                  <View style={{flexDirection: 'row'}}>
                    <CheckBox
                      checked={isChecked}
                      containerStyle={styles.checkboxContainer}
                      textStyle={[styles.checkboxText, styles.checkboxComplete]}
                      checkedColor="#979797"
                      onPress={() => {
                        const updatedNotes = notes.map((note) => {
                          if (note.id === singleNote?.id) {
                            const updatedCompletedLists = isChecked
                              ? note.completedLists.filter(i => i !== index)
                              : [...note.completedLists, index];
                            return { ...note, completedLists: updatedCompletedLists };
                          }
                          return note;
                        });
                        setNotes(updatedNotes);
                      }}
                    />
                    <TextInput
                      key={index}
                      style={styles.input} 
                      value={listItem}
                      placeholderTextColor={'#E6E6E6'}
                      placeholder="+ List item"
                      onChangeText={(text)=> {if(singleNote){handleListInputChange(text, index)}}}
                    />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              extraData={notes}
              />
            </View>
            <View style={styles.buttoncontainer}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.notetext}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        numColumns={1}
        data={notes}
        key={singleNote?.id}
        renderItem={({item}) => 
        <View style={styles.note}>
          <Text style={[styles.notetext, styles.notetitle]}>{item.title}</Text>
          <Text style={[styles.notetext, styles.notedesc]}>{item.description}</Text>

          <FlatList
            data={item.lists
              .map((listItem, index) => ({ listItem, index }))
              .filter(({listItem}) => listItem !== '')
              .filter(({ index }) => !item.completedLists.includes(index))
            }
            renderItem={({ item: { listItem, index } }) => {
              const isChecked = item.completedLists.includes(index);
              return (
                <View>
                  <CheckBox
                    title={listItem}
                    checked={isChecked}
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxText}
                    onPress={() => {
                      const updatedNotes = notes.map((note) => {
                        if (note.id === item.id) {
                          const updatedCompletedLists = isChecked
                            ? note.completedLists.filter(i => i !== index)
                            : [...note.completedLists, index];
                          return { ...note, completedLists: updatedCompletedLists };
                        }
                        return note;
                      });
                      setNotes(updatedNotes);
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            extraData={notes} 
          />

          <FlatList
            data={item.lists
              .map((listItem, index) => ({ listItem, index })) 
              .filter(({ index }) => item.completedLists.includes(index)) 
            }
            renderItem={({ item: { listItem, index } }) => {
              const isChecked = item.completedLists.includes(index);
              return (
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    title={listItem}
                    checked={isChecked}
                    containerStyle={styles.checkboxContainer}
                    textStyle={[styles.checkboxText, styles.checkboxComplete]}
                    checkedColor="#979797"
                    onPress={() => {
                      const updatedNotes = notes.map((note) => {
                        if (note.id === item.id) {
                          const updatedCompletedLists = isChecked
                            ? note.completedLists.filter(i => i !== index)
                            : [...note.completedLists, index];
                          return { ...note, completedLists: updatedCompletedLists };
                        }
                        return note;
                      });
                      setNotes(updatedNotes);
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            extraData={notes}
          />

          <CheckBox
            title={item.completedLists.length === item.lists.filter(listItem => listItem !== '').length ? "Unselect All" : "Select All"}
            checked={item.completedLists.length === item.lists.filter(listItem => listItem !== '').length}
            containerStyle={styles.checkboxContainer}
            onPress={() => {
              const updatedNotes = notes.map((note) => {
                if (note.id === item.id) {
                  const nonEmptyIndexes = item.lists
                    .map((listItem, index) => listItem.trim() !== '' ? index : null)
                    .filter(index => index !== null);
                  const updatedCompletedLists = item.completedLists.length === nonEmptyIndexes.length
                    ? [] 
                    : nonEmptyIndexes;
                  return { ...note, completedLists: updatedCompletedLists };
                }
                return note;
              });
              setNotes(updatedNotes);
            }}
          />

          <Pressable 
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
              passNoteValue(item);
            }}
          >
            <Text style={styles.buttonLabel}>Edit</Text>
          </Pressable>
        </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notetitle: {
    fontWeight: 'bold',
    fontSize: 20,
    height: 50,
    marginBottom: -10,
  },
  topcontainer:{
    flexDirection: 'row',
    width: '100%',
  },
  buttoncontainer: {
    // padding: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 5,
    borderWidth: 1,
    backgroundColor:'#25292E',
    borderColor: '#E6E6E6',
    borderRadius: 8,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    alignItems: "center",
    // paddingTop: 10,
    // paddingBottom: 20, 
  },
  input: {
    width: 280,
    padding: 5,
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E6E6E6',
    color: '#E6E6E6',
    maxHeight: 150,
    minHeight: 10,
    textAlignVertical: 'top',
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    height: 50,
    marginBottom: -10,
  },
  container: {
    flex: 1,
    paddingTop: 60,
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
    backgroundColor: '#F06868',
    padding: 10,
    width: 100,
  },
  buttonLabel: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  note: {
    width: 300,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderBlockColor: '#E6E6E6',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    margin: 5,
    flexDirection: 'column',
    minHeight: 50,
  },
  notetext: {
    color: '#E6E6E6'
  },
  notedesc: {
    marginBottom: 10,
  },
  content: {
    color: '#E6E6E6',
  },
  completed: {
    color: '#979797',
    marginTop: 10,
  },
  checkboxContainer: {
    backgroundColor: '#25292e',
    padding: 0,
  },
  checkboxText: {
    color: '#E6E6E6'
  },
  checkboxComplete: {
    textDecorationLine: 'line-through',
    color: '#979797',
  }
});