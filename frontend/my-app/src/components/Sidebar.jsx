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
      {!collapsed && <p>Sidebar Content</p>}
      {collapsed && <p>SC</p>}
    </div>
  );
}

export default Sidebar;
