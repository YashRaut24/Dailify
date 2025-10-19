import "./TaskContainer.css"
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function TaskContainer(props){
    const [tasksByCategory, setTasksByCategory] = useState({});
    const [focusIndex, setFocusIndex] = useState(null);
    const inputRefs = useRef([]);

    const currentTasks = tasksByCategory[props.category] || [{ id: Date.now(), text: "" }];

    useEffect(() => {
        if (!tasksByCategory[props.category]) {
            setTasksByCategory(prev => ({
                ...prev,
                [props.category]: [{ id: Date.now(), text: "" }]
            }));
        }
    }, [props.category]);

    useEffect(() => {
        if (focusIndex !== null && inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex].focus();
        }
    }, [focusIndex, currentTasks.length]);

    const updateCurrentCategoryTasks = (newTasks) => {
        setTasksByCategory(prev => ({
            ...prev,
            [props.category]: newTasks
        }));
    };

    const addTask = (index) => {
        const newId = Date.now();
        const newTasks = [...currentTasks];
        
        if(currentTasks[index].text.trim() === "" ){
            alert("Please enter a note");
        } else {
            newTasks.splice(index + 1, 0, { id: newId, text: "" });
            updateCurrentCategoryTasks(newTasks);
            setFocusIndex(index + 1);
        }
    };

    const removeTask = (index) => {
        const taskToDelete = currentTasks[index];

        if (!taskToDelete || taskToDelete.text.trim() === "") {
            alert("Cannot delete an empty task!");
            return;
        }

        axios.delete("http://localhost:9000/delete", { 
            data: { 
                task: taskToDelete.text,
                category: props.category // Send category to backend
            } 
        })
        .then(() => {
            const existingTasks = [...currentTasks];
            existingTasks.splice(index, 1);
            updateCurrentCategoryTasks(existingTasks);
            alert("Task deleted successfully!");
        })
        .catch(() => {
            alert("Error deleting task!");
        });
    };

    const updateTask = (index, value) => {
        const newTasks = [...currentTasks];
        newTasks[index] = { ...newTasks[index], text: value };
        updateCurrentCategoryTasks(newTasks);
    };

    const handleKeyPress = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();
            
            if (currentTasks[index].text.trim() === "") {
                alert("Please enter a note");
            } else {
                axios.post("http://localhost:9000/add", { 
                    task: currentTasks[index].text,
                    category: props.category // Send category to backend
                })
                .then(() => {
                    addTask(index);
                })
                .catch(() => {
                    alert("Error adding task");
                });
            }
        }
    };

    return (
        <div>
            {currentTasks.map((task, index) => (
                <div key={task.id} className="taskListArea">
                    <div className="listContainer">
                        <input
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            placeholder="Enter your task"
                            className={props.mode ? "darklist" : "list"}
                            value={task.text}
                            onChange={(e) => updateTask(index, e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, index)}
                        />
                        <button 
                            className="remove-note" 
                            onClick={() => {
                                if (currentTasks.length > 1) removeTask(index);
                                else alert("At least one note required!");
                            }}
                            aria-label="Remove task"
                        >
                            ×
                        </button>
                    </div>
                    <button 
                        className={props.mode ? "dark-addNote" : "add-note"}
                        onClick={() => addTask(index)}
                        aria-label="Add task"
                    >
                        +
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TaskContainer;