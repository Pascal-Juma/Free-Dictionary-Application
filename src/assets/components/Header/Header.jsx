import './Header.css'
import logo from '../../../assets/logo.png'
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineHelp } from "react-icons/md";

function Header() {
  return (
    <>
      <div className="dictionary-header">
        <div className="header-logo"><img src={logo} alt="logo" /></div>
        <div className="header-text">
        <h1>Check out a word and memorize it for life</h1>
        </div>
        <div className="header-contents">
        <p><FaCircleUser /> Advanced Search </p>
        <p><MdOutlineHelp /> Help</p>
        </div>
      </div>
    </>
  )
}

export default Header
