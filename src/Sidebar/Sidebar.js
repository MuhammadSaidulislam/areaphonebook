import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import data from '../jsonData/Categhory.json';
const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const dataDividede = data.valueList;
    return (
        <>
            <div className='navbar'>
                <Link to='#' className='menu-bars' onClick={showSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            close
                        </Link>
                    </li>
                </ul>
                <ul className='nav-menu-items'>
                {dataDividede.map(data => 
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                        {data.name}
                        </Link>
                    </li>
                    )}

                </ul>
            </nav>

        </>
    )
}

export default Sidebar