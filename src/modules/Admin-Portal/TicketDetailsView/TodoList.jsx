import React, { useState } from 'react';
import styled from 'styled-components';

import { IoMdRemove, IoMdAdd } from "react-icons/io";

// Styled components
const Container = styled.div`
  width: 40%;
  /* flex-grow: 1; */
  margin-left: 25px;
  padding: 5px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 20px; */
`;

const Input = styled.input`
  flex: 1;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #218838;
  }
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #c82333;
  }
`;

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskInput.trim()) {
            setTasks([...tasks, taskInput]);
            setTaskInput('');
        }
    };

    const handleRemoveTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <Container>
            <Form onSubmit={handleAddTask}>
                <Input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Add new Action..."
                />
                <Button type="submit">
                    <IoMdAdd  size={20} />
                </Button>
            </Form>

            {tasks.length > 0 ? <TaskList>
                {tasks.map((task, index) => (
                    <TaskItem key={index}>
                        {task}
                        <RemoveButton onClick={() => handleRemoveTask(index)}>
                            <IoMdRemove size={15} />
                        </RemoveButton>
                    </TaskItem>
                ))}
            </TaskList> : null}
        </Container>
    );
};

export default TodoList;
