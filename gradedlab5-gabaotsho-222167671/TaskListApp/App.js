import React, {useState } from "react";
import { View,Text,TextInput,FlatList,TouchableOpacity,Stylesheet,Button,KeyboardAvoidingView, Platform ,} from "react-native";

export default function App(){
    const[tasks, setTasks] = useState([]);
    const [taskText,setTaskText] = useState("");

    const AddTask = () => {
        if(taskText.trim() === "") return;
        const newTask = {
            id: Date.now().toString(),
            text: taskText,
            done: false,
        };
        setTaskText([...tasks,newTask]);
        setTaskText("");
    };

    const toggleTask = () => {
        setTasks(
            tasks.map((task) => 
                task.id === id ? {...task,done: !task.done} : task
            )
        );

    };

    const DeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return(
        <KeyboardAvoidingView
        style={Stylesheet.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            
            <View style={style.inputRow}> 
                <TextInput 
                style={Stylesheet.input}
                placeholder="Enter new task"
                value={taskText}
                onChangeText={setTaskText}
                />
                <Button title="Add" onPress={AddTask} />
            </View>

            
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={Stylesheet.taskItem}>
                        <TouchableOpacity
                        style={Stylesheet.checkbox}
                        onPress={() => toggleTask(item.id)}
                        >

                            <Text>{item.done ? "☑️" : "⬜"}</Text>

                        </TouchableOpacity>

                        <Text
                        style={[styles.taskText, item.done && styles.taskTextDone]}
                        onPress={() => toggleTask(item.id)}
                        >
                            {item.text}
                        </Text>
                        <TouchableOpacity onPress={() => DeleteTask(item.id)}>
                            <Text style={styles.DeleteButton}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />  
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        backgroundColor: "#FFE5B4",
    },
    inputRow:{
        flexDirection: "row",
        marginBottom: 10,
    },
    input: {
        flex:1,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginRight: 5,
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    taskText: {
        flex:1,
        fontSize: 16,
    },
    taskTextDone:{
        textDecorationLine: "line-through",
        color: "#888",
    },
    CheckBox: {
        marginRight: 10,
    },
    DeleteButton: {
        marginLeft: 10,
        fontSize: 18,
        color: "red",
    },
    
}
);