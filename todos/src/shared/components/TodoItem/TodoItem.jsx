import { useState } from "react";
import styles from "../Todo/styles.module.scss";

const TodoItem = ({ task }) => {

const [todoItem, setTodoItem] = useState([task]);

const deleteItem = task => {
    const removeArr = [...todoItem].filter(todoItem => task.id !== todoItem)
    setTodoItem(removeArr)
}

console.log('todoitem ' + todoItem);

  return (
    <li>{task.text}
        <button 
        className={styles.clearTasksBtn}
        onClick={() => deleteItem(task.id)}>
        delete</button> 
    </li>
  )
}

export default TodoItem;
