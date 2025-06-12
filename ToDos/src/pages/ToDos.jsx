import React, { useState, useEffect, useRef } from "react"

export default function ToDos(){
    const [tasks, setTasks] = useState(()=> {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    useEffect(()=>{
       localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event){
        setInput(event.target.value);
    }

    function addTask(){
        if(input.trim() !== ""){
            setTasks(t => [...t, input]);
            setInput("");
        }
        inputRef.current?.focus();
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

    function clearAll(){
        setTasks([]);
    }


    return(
        <div className="main">
            <div className={"to-do-list"}>
                <h1>To-Do-List</h1>
                <div className="oben">
                    <input ref={inputRef} className="input" placeholder="Enter a Task" value={input} onChange={handleInputChange} onKeyDown={(e) => {if(e.key === 'Enter'){addTask();}}}/>
                    <button className={"add-btn"} onClick={addTask}>Add</button>
                    <button className={"add-btn"} onClick={clearAll}>Clear All</button>
                </div>
                <ol>
                    {tasks.map((task, index) => (
                        <li key={index} className="element">
                            <span className={"text"}>{task}</span>
                            <div className={"wrap-btn"}>
                                <button className={"delete-btn"} onClick={() => deleteTask(index)}><img src="../../public/delete.svg" alt="Close"/></button>
                                <button className={"moveUp-btn"} onClick={() => moveTaskUp(index)}><img src="../../public/up.png" alt="Up"/></button>
                                <button className={"moveDown-btn"} onClick={() => moveTaskDown(index)}><img src="../../public/down.png" alt="Down"/></button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}