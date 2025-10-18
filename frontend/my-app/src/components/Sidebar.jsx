import './Sidebar.css';

function Sidebar({ mode, collapsed, setCollapsed }) {
  return (
    <div className={`${mode ? "darkSidebar" : "sidebar"} ${collapsed ? "collapsed" : ""}`}>
      <button
        className={mode ? "darkToggleButton" : "toggleButton"}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "→" : "←"}
      </button>
      {!collapsed && <p className={mode ? "darkTask" : "task"}>
        Tasks 1
        </p>}
      {collapsed && <p className={mode? "darkST" : "ST"}>T1</p>}

       {!collapsed && <p className={mode ? "darkTask" : "task"}>
        Task 2
        </p>}
      {collapsed && <p className={mode? "darkST" : "ST"}>T2</p>}
    </div>
  );
}

export default Sidebar;
