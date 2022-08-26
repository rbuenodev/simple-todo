import React, { useState, FormEvent, useEffect } from "react";
import styles from "./taskForm.module.css";
import { ITask } from "../../interfaces/Task";

interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(updatedTask: ITask): void;
}

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Math.floor(Math.random() * 2000);
    const newTask: ITask = { id, title, difficulty };
    setTaskList!([...taskList, newTask]);
    setTitle("");
    setDifficulty(0);
    setId(0);
  };

  const updateTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTask: ITask = { id, title, difficulty };

    handleUpdate!(updatedTask);
    setTitle("");
    setDifficulty(0);
    setId(0);
  };

  useEffect(() => {
    if (task) {
      setId(task!.id);
      setTitle(task!.title);
      setDifficulty(task!.difficulty);
    }
  }, [task]);

  return (
    <form
      onSubmit={handleUpdate ? updateTaskHandler : addTaskHandler}
      className={styles.form}
    >
      <div className={styles.input_container}>
        <label htmlFor="title">Titulo:</label>
        <input
          type="text"
          name="title"
          placeholder="Titulo da tarefa"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input
          type="number"
          name="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={(e) => setDifficulty(+e.target.value)}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText}></input>
    </form>
  );
};

export default TaskForm;
