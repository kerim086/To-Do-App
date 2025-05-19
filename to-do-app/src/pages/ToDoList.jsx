import React, { useState } from "react"

export default function ToDoList(){
    const [tasks, setTasks] = useState(["a", "b", "c"]);
    const [input, setInput] = useState("");

    function handleInputChange(event){
        setInput(event.target.value);
    }

    function addTask(){
        if(input.trim() !== ""){
            setTasks(t => [...t, input]);
            setInput("");
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((element, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }


    return(
        <div className="main">
            <div className={"to-do-list"}>
                <h1>To-Do-List</h1>
                <input className="input" placeholder="Enter a Task" value={input} onChange={handleInputChange}/>
                <button className={"add-btn"} onClick={addTask}>Add</button>
                <ol>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <span className={"text"}>{task}</span>
                            <div className={"wrap-btn"}>
                                <button className={"delete-btn"} onClick={() => deleteTask(index)}>X</button>
                                <button className={"moveUp-btn"} onClick={() => moveTaskUp(index)}>Up</button>
                                <button className={"moveDown-btn"} onClick={() => moveTaskDown(index)}>Down</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}