import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import main from '../jsonData/Categhory.json';
import './Sidebar.css'
const Sidebar = () => {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const categhory = main.categhory;
    const subCateghorySearch = (subCateghoryName, sub_id) => {
        return navigate(`/${subCateghoryName}`)
    }
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
                        <Link to='#' className='menu-bars-close'>
                            <FontAwesomeIcon icon={faClose} />
                        </Link>
                    </li>
                </ul>
                <ul className='nav-menu-items'>
                    {categhory.map(data =>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <div className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${data.pageLink}`} aria-expanded="true" aria-controls="collapseOne">
                                        {data.name}
                                    </button>
                                </div>
                                <div id={data.pageLink} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    {data.subCategory.map((subData) =>
                                        <div className="accordion-body">
                                            <button key={subData.sub_id} className='btn' onClick={() => subCateghorySearch(subData.link, subData.sub_id)}>{subData.name}</button>
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