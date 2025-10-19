import { useState } from "react";
import './Sidebar.css';

function Sidebar({ mode, collapsed, setCollapsed, selectedTask, setSelectedTask, taskCategories, addTaskCategory, deleteTaskCategory }) {

  return (
    <div className={`${mode ? "darkSidebar" : "sidebar"} ${collapsed ? "collapsed" : ""}`}>
      <button
        className={mode ? "darkToggleButton" : "toggleButton"}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "→" : "←"}
      </button>

      <div className="sidebar-content">
        {taskCategories.map((category) => (
          <div key={category.id} className="task-item-wrapper">
            {!collapsed && (
              <div className="task-with-delete">
                <p 
                  onClick={() => setSelectedTask(category.id)} 
                  className={`${mode ? "darkTask" : "task"} ${selectedTask === category.id ? "active" : ""}`}
                >
                  {category.name}
                </p>
                {taskCategories.length > 1 && (
                  <button 
                    className="delete-category-btn"
                    onClick={() => deleteTaskCategory(category.id)}
                    title="Delete category"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            {collapsed && (
              <div className="collapsed-task-wrapper">
                <p 
                  onClick={() => setSelectedTask(category.id)}
                  className={`${mode ? "darkST" : "ST"} ${selectedTask === category.id ? "active" : ""}`}
                >
                  T{category.id.replace('task', '')}
                </p>
                {taskCategories.length > 1 && (
                  <button 
                    className="delete-category-btn-collapsed"
                    onClick={() => deleteTaskCategory(category.id)}
                    title="Delete category"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {!collapsed && (
          <button 
            className={mode ? "darkAddCategory" : "addCategory"}
            onClick={addTaskCategory}
          >
            + Add New Task
          </button>
        )}
        {collapsed && (
          <button 
            className={mode ? "darkAddCategoryCollapsed" : "addCategoryCollapsed"}
            onClick={addTaskCategory}
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