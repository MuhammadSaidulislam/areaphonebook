import React, { useState, useEffect } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Banner.css";
import { userInfo } from "../api/auth";
import cover from "../assets/image/banner/cover.jpg";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"; import Select from 'react-select';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const Banner = ({
  wardSelect,
  onValueChange,
  filterTags,
  profileFunction,
  postFunction,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userLogin, setUserLogin] = useState(false);
  const savedUserProfile = localStorage.getItem("areaphonebook");
  const userProfile = JSON.parse(savedUserProfile);
  const [selectedWard, setSelectedWard] = useState("");
  const { category } = useParams();
  const { sub } = useParams();
  const profileUrl = window.location.pathname;
  const [selectedOption, setSelectedOption] = useState(null);
  // profile button

  const categoryTitle = category;
  const suCategoryTitle = sub;


  const convertedArray = filterTags.map((item) => {
    return { value: item, label: item };
  });

  console.log('convertedArray', convertedArray);

  useEffect(() => {
    if (userProfile) {
      userInfo(userProfile.mobile).then((data) => {
        if (data.message) {
          setUserLogin(true);
        } else {
          setUserLogin(true);
        }
      });
    } else {
      setUserLogin(false);
    }
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
              <div className="bannerHeading">

                {category && category.length ? (
                  <>
                    <>
                      <Link to={`/narayanganj/${category}`}>
                        {categoryTitle && categoryTitle.length ? (
                          <>{category} </>
                        ) : (
                          <></>
                        )}
                      </Link>
                      <Link to={`/narayanganj/${category}/${sub}`}>
                        {suCategoryTitle && suCategoryTitle.length ? (
                          <>
                            <FontAwesomeIcon icon={faArrowRightLong} />
                            {sub}
                          </>
                        ) : (
                          <></>
                        )}
                      </Link>

                      <div className="app">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={convertedArray}
                        />
                      </div>
                    </>
                  </>
                ) : profileUrl === "/profile" ? (
                  <>
                    <div className="profileHeading">
                      <button className="btn" onClick={() => profileFunction()}>
                        আপনার প্রোফাইল দেখুন
                      </button>
                      <button className="btn" onClick={() => postFunction()}>
                        আপনার পোস্ট দেখুন
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleShow}
                      className="active trailVideo"
                      data-toggle="modal"
                    >
                      ব্যবহারের ভিডিও
                    </button>
                  </>
                )}
              </div>

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
              {profileUrl === "/profile" ? <></> : <>
                <div className="hero-btn">
                  {userLogin ? (
                    <>
                      <Link className="btn btn-warning" to="/profile">
                        <i className="fas fa-user-plus"></i> আপনার তথ্য
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link className="btn btn-warning" to="/signup">
                        <i className="fas fa-user-plus"></i> আপনার তথ্য যোগ করুন
                      </Link>
                    </>
                  )}
                </div>
              </>}

            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;
