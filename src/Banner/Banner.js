import React, { useState, useEffect } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Banner.css";
import { userInfo } from "../api/auth";
import cover from "../assets/image/banner/cover.jpg"
const Banner = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userLogin, setUserLogin] = useState(false);
  const savedUserProfile = localStorage.getItem("userProfile");
  const userProfile = JSON.parse(savedUserProfile);

  useEffect(() => {
    userInfo(userProfile.mobile).then((data) => {
      if (data.message) {
        setUserLogin(false);
      } else {
        setUserLogin(false);
      }
    });
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col md={12}>
            <a href="about-us.html">
              <div className="row">
                <div className="col-12">
                  <img
                    src={cover}
                    alt="Help Card"
                    style={{ width: "100%", marginTop: "15px" }}
                  />
                </div>
              </div>
            </a>
          </Col>
          <Col md={12}>
            <div className="hero-text">
              <button
                onClick={handleShow}
                className="active"
                data-toggle="modal"
              >
                ব্যবহারের ভিডিও
              </button>
              <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>কীভাবে ওয়েবসাইটটি ব্যবহার করবেন</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="embed-responsive embed-responsive-1by1">
                    <iframe
                      src="https://www.facebook.com/plugins/video.php?height=476&amp;href=https%3A%2F%2Fwww.facebook.com%2FAreaPhonebook%2Fvideos%2F4241454192633439%2F&amp;show_text=false&amp;width=476&amp;t=0"
                      style={{ border: "none", overflow: "hidden" }}
                      scrolling="no"
                      allowfullscreen="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      width="476"
                      height="476"
                      frameborder="0"
                    ></iframe>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </Col>
          <Col md={12}>
            <div id="signupBtn">
              <div className="hero-btn">
              {userLogin ? <>
                <Link className="btn btn-warning" to="/signup">
                  <i className="fas fa-user-plus"></i> আপনার তথ্য যোগ করুন
                </Link>
                </>:<>
                <Link className="btn btn-warning" to="/shop">
                  <i className="fas fa-user-plus"></i> আপনার তথ্য 
                </Link>
                </>}
                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;
