import React from 'react'
import { API } from "../../config";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faGripLines, faMinus, faPhone, faStar } from "@fortawesome/free-solid-svg-icons";

const ShopCard = (props) => {
    return (
        <>
            <div className="shopCard mb-3">
                <div className="shopCardImg">
                    <img src={`${API}/${props.value.shop_image}`} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="shopCardContent">
                    <Link to={`${props.value.shop_id}`} className="card-title">
                        {props.value.title}
                    </Link>
                    <div style={{display: 'flex',alignItems: 'center'}}>
                        <p className="card-text">{props.value.number}</p><p style={{margin: '0px 4px',fontSize: '8px'}}><FontAwesomeIcon icon={faCircle} /></p>
                        <p className="card-text">{props.value.address}</p>
                    </div>
                </div>
                <div className="shopCardSocial">
                    <div className="rating">
                        <FontAwesomeIcon icon={faStar} />
                        <span>2</span>
                    </div>
                    <FontAwesomeIcon icon={faPhone} />
                </div>
            </div>
        </>
    )
}

export default ShopCard