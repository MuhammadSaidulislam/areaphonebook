import React, { useState, useRef } from 'react';
import { Col, ProgressBar, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { useForm } from "react-hook-form";
import { addReview } from '../../api/auth';
const Review = (props) => {
    const [rating, setRating] = useState(0);
    const [userName, setUserName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const handleRating = (rate) => {
        setRating(rate);
    }
    const reviewAdd = () => {
        addReview(userName, reviewText, rating.toString(), props.id).then((data) => {
            console.log('review add', data);
            // setRelatedShopList(data)
        });
    };
    return (
        <Row className='d-flex justify-content-left'>
            <Col md={12}>
                <h1>Add Review</h1>
                 {/* <ProgressBar now={60} /> */}
                <Rating onClick={handleRating} initialValue={rating} />
                <input name='user_name' onChange={(e) => setUserName(e.target.value)} className='form-control mt-3' type='text' placeholder='Your name' required />
                <textarea name='review' onChange={(e) => setReviewText(e.target.value)} className='form-control mt-3' placeholder='Review' required></textarea>
                <button type='submit' onClick={reviewAdd} className='btn btn-info mt-2'>Submit</button>
            </Col>
        </Row>
    )
}

export default Review