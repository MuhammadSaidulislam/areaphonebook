import React from 'react'
import { API } from "../../config";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
const NewsCard = (props) => {
    return (
        <>
            <div className="newsCard">
                <div className="cardNewsImg"><img src={`${API}/${props.value.shop_image}`} className="" alt="..." /></div>
                <div className="cardContent">
                    <Link to={`${props.value.shop_id}`} className="card-title">
                        {props.value.title}
                    </Link>
                   <p>মোবাইল: {props.value.mobile}</p>
                   <p>সার্ভিস: {props.value.service.length > 100 ? `${props.value.service.slice(0, 60)}...` : props.value.service}</p>
                </div>
                <div className="newsSocial">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <FontAwesomeIcon icon={faPhone} />
                </div>
            </div>
        </>
    )
}

export default NewsCard