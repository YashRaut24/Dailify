import { useState, useEffect } from "react";
import './Sidebar.css';
import axios from "axios";

function Sidebar(props) {
  useEffect(() => {
    loadCategoriesFromDB();
  }, []);

  const loadCategoriesFromDB = () => {
    axios.get("http://localhost:9000/categories")
      .then((response) => {
        const dbCategories = response.data;
        
        if (dbCategories && dbCategories.length > 0) {
          props.setTaskCategories(dbCategories);
          
          props.setSelectedTask(dbCategories[0].id);
        } else {
          const defaultCategory = { id: "task1", name: "Tasks 1" };
          
          axios.post("http://localhost:9000/category/add", defaultCategory)
            .then(() => {
              props.setTaskCategories([defaultCategory]);
              props.setSelectedTask(defaultCategory.id);
            })
            .catch((error) => {
              console.error("Error creating default category:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
      });
  };

  const handleAddCategory = () => {
    const newId = `task${props.taskCategories.length + 1}`;
    const newCategory = {
      id: newId,
      name: `Tasks ${props.taskCategories.length + 1}`
    };

    axios.post("http://localhost:9000/category/add", newCategory)
      .then(() => {
        props.addTaskCategory();
        console.log("New task category added!");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        alert("Error adding category!");
      });
  };

  const handleDeleteCategory = (categoryId) => {
    if (props.taskCategories.length <= 1) {
      alert("You must have at least one task category!");
      return;
    }

    axios.delete("http://localhost:9000/category/delete", {
      data: { id: categoryId }
    })
      .then(() => {
        axios.get(`http://localhost:9000/tasks/${categoryId}`)
          .then((response) => {
            const tasks = response.data;
            
            const deletePromises = tasks.map(task => 
              axios.delete("http://localhost:9000/delete", {
                data: { 
                  task: task.task,
                  category: categoryId
                }
              })
            );

            return Promise.all(deletePromises);
          })
          .then(() => {
            props.deleteTaskCategory(categoryId);
            console.log("Category and its tasks deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting tasks:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        alert("Error deleting category!");
      });
  };

  return (
    <div className={`${props.mode ? "darkSidebar" : "sidebar"} ${props.collapsed ? "collapsed" : ""}`}>
      <button
        className={props.mode ? "darkToggleButton" : "toggleButton"}
        onClick={() => props.setCollapsed(!props.collapsed)}
      >
        {props.collapsed ? "→" : "←"}
      </button>

      <div className="sidebar-content">
        {props.taskCategories.map((category) => (
          <div key={category.id} className="task-item-wrapper">
            {!props.collapsed && (
              <div className="task-with-delete">
                <p 
                  onClick={() => props.setSelectedTask(category.id)} 
                  className={`${props.mode ? "darkTask" : "task"} ${props.selectedTask === category.id ? "active" : ""}`}
                >
                  {category.name}
                </p>
                {props.taskCategories.length > 1 && (
                  <button 
                    className="delete-category-btn"
                    onClick={() => handleDeleteCategory(category.id)}
                    title="Delete category"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            {props.collapsed && (
              <div className="collapsed-task-wrapper">
                <p 
                  onClick={() => props.setSelectedTask(category.id)}
                  className={`${props.mode ? "darkST" : "ST"} ${props.selectedTask === category.id ? "active" : ""}`}
                >
                  T{category.id.replace('task', '')}
                </p>
                {props.taskCategories.length > 1 && (
                  <button 
                    className="delete-category-btn-collapsed"
                    onClick={() => handleDeleteCategory(category.id)}
                    title="Delete category"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {!props.collapsed && (
          <button 
            className={props.mode ? "darkAddCategory" : "addCategory"}
            onClick={handleAddCategory}
          >
            + Add New Task
          </button>
        )}
        {props.collapsed && (
          <button 
            className={props.mode ? "darkAddCategoryCollapsed" : "addCategoryCollapsed"}
            onClick={handleAddCategory}
            title="Add new task"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;