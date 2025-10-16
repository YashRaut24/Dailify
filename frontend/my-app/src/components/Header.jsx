import './Header.css'

function Header(props) {
  return (
    <div className={props.mode ? "dark-header" : "header"}>
      Dailify
    </div>
  )
}

export default Header;
