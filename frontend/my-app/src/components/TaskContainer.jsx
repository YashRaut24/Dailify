import "./TaskContainer.css"
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function TaskContainer(props){
    const [tasksByCategory, setTasksByCategory] = useState({});
    const [focusIndex, setFocusIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const inputRefs = useRef([]);

    const currentTasks = tasksByCategory[props.category] || [{ id: Date.now(), text: "" }];

    useEffect(() => {
        loadTasksFromDB();
    }, [props.category]);

    const loadTasksFromDB = () => {
        setLoading(true);
        axios.get(`http://localhost:9000/tasks/${props.category}`)
            .then((response) => {
                const dbTasks = response.data;
                
                if (dbTasks && dbTasks.length > 0) {
                    const formattedTasks = dbTasks.map((task, index) => ({
                        id: task._id || Date.now() + index,
                        text: task.task
                    }));
                    
                    setTasksByCategory(prev => ({
                        ...prev,
                        [props.category]: formattedTasks
                    }));
                } else {
                    setTasksByCategory(prev => ({
                        ...prev,
                        [props.category]: [{ id: Date.now(), text: "" }]
                    }));
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading tasks:", error);
                setTasksByCategory(prev => ({
                    ...prev,
                    [props.category]: [{ id: Date.now(), text: "" }]
                }));
                setLoading(false);
            });
    };

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
                category: props.category
            } 
        })
        .then(() => {
            const existingTasks = [...currentTasks];
            existingTasks.splice(index, 1);
            
            if (existingTasks.length === 0) {
                existingTasks.push({ id: Date.now(), text: "" });
            }
            
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
                    category: props.category 
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

    if (loading) {
        return <div className="loading">Loading tasks...</div>;
    }

    return ( 
        <div>
            {currentTasks.map((task, index) => (
                <div key={task.id} className="taskListArea">
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