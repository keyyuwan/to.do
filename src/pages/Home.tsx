import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface HandleEditTaskParams {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const chosenTask = tasks.find((task) => task.id === id);
    const updatedTasks = tasks.map((task) => ({ ...task }));
    updatedTasks.forEach((task) => {
      if (task.id === chosenTask?.id) {
        task.done = !task.done;
      }
    });
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            const filteredTasks = tasks.filter((task) => task.id !== id);
            setTasks(filteredTasks);
          },
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: HandleEditTaskParams) {
    const editedTask = tasks.find((task) => task.id === taskId);
    const updatedTasks = tasks.map((task) => ({ ...task }));
    updatedTasks.forEach((task) => {
      if (task.id === editedTask?.id) {
        task.title = taskNewTitle;
      }
    });
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
