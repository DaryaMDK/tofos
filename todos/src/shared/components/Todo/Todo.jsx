import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "../TodoItem/TodoItem";
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
      },
    ]);
    setTaskVal("");
  };

  const onEnterPress = (e) => {
    if (e.code === 'Enter') {
      addTask();
    }
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
          {tasks.map(task => <TodoItem key={task.id} task={task} />)}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
