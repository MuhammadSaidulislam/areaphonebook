import React, { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <a href="about-us.html">
                            <div className="row">
                                <div className="col-12">
                                    <img src="https://www.areaphonebook.com/resources/help-card/cover.jpg" alt="Help Card" style={{ width: '100%', marginTop: '15px' }} />
                                </div>
                            </div>
                        </a>
                    </Col>
                    <Col md={12}>
                        <div className="hero-text">
                            <button onClick={handleShow} className="active" data-toggle="modal">ব্যবহারের ভিডিও</button>
                            <Modal show={show} onHide={handleClose} animation={false}>
                                <Modal.Header closeButton>
                                    <Modal.Title>কীভাবে ওয়েবসাইটটি ব্যবহার করবেন</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="embed-responsive embed-responsive-1by1">
                                        <iframe src="https://www.facebook.com/plugins/video.php?height=476&amp;href=https%3A%2F%2Fwww.facebook.com%2FAreaPhonebook%2Fvideos%2F4241454192633439%2F&amp;show_text=false&amp;width=476&amp;t=0" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" width="476" height="476" frameborder="0"></iframe>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div id="signupBtn">
                            <div className="hero-btn">
                                <a className="btn btn-warning" href="https://www.areaphonebook.com/signup"><i className="fas fa-user-plus"></i> আপনার তথ্য যোগ করুন</a>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Banner