import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import main from '../jsonData/Categhory.json';
const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const categhory = main.categhory;
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
                    {categhory.map(data =>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${data.pageLink}`} aria-expanded="true" aria-controls="collapseOne">
                                        {data.name}
                                    </button>
                                </h2>
                                <div id={data.pageLink} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    {data.subCategory.map((subData) =>
                                        <div class="accordion-body">
                                            <p>{subData.name}</p>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                </ul>
            </nav>


        </>
    )
}

export default Sidebar