import React,{useState} from 'react'
import Sidebar from './Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
    <Sidebar isCollapsed={isCollapsed} />
    <button className="sideBtn" onClick={handleSidebarToggle}>
    <FontAwesomeIcon icon={faBars} />
    </button>
    <section className={`main-body ${isCollapsed ? 'bodyCollapsed' : ''}`}>
    <h1>area phone book</h1>
    </section>
    </>
  )
}

export default Dashboard