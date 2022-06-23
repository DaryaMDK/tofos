import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "../TodoItem/TodoItem";
import TasksCounter from "../TasksCounter/TasksCounter";
import { findAmountOfDoneTasks, setIsDoneToFalse} from "../../utils/tasksUtils";
import styles from "./styles.module.scss";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [taskVal, setTaskVal] = useState("");

  const onInputValue = (e) => {
    setTaskVal(e.target.value);
  };


  const addTask = () => {
    if (!taskVal) return;
    const id = uuidv4();

    setTasks([
      ...tasks,
      {
        id,
        text: taskVal,
        isDone: false,
      },
    ]);
    setTaskVal("");
  };

  const onEnterPress = (e) => {
    if (e.code === "Enter") {
      addTask();
    }
  };

  const onDeleteTask = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const removeChecked = () => {
    setTasks(setIsDoneToFalse);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const saveToLS = (e) => {
    let pol = localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log("задаем: " + pol);

    let storageProfileString = localStorage.getItem('tasks');
    console.log("получаем: ", storageProfileString);

    let data = JSON.parse(localStorage.getItem('tasks'));
    console.log("получаем после парсинга: " + data);
  }

  return (
    <div className={styles.todo}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          onInput={onInputValue}
          onKeyPress={onEnterPress}
          value={taskVal}
          type="text"
        />
        <button className={styles.addButton} onClick={addTask}>
          Add
        </button>

        <ul className={styles.content}>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              setTasks={setTasks}
            />
          ))}
        </ul>
        <TasksCounter
          completedTasks={findAmountOfDoneTasks(tasks)}
          tasksAmount={tasks.length}
        />
        <button className={styles.removeBtn} onClick={removeChecked}>Remove checked</button>
        <button className={styles.clearTasksBtn} onClick={clearTasks}>Clear</button>
        <button className={styles.saveBtn} onClick={saveToLS}>Save</button>
      </div>
    </div>
  );
};

export default Todo;
