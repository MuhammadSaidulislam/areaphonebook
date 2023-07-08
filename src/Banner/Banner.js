import React, { useState, useEffect } from "react";
import { Col, Container, Modal, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Banner.css";
import { userInfo } from "../api/auth";
import cover from "../assets/image/banner/cover.jpg";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
const Banner = ({ wardSelect, onValueChange }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userLogin, setUserLogin] = useState(false);
  const savedUserProfile = localStorage.getItem("areaphonebook");
  const userProfile = JSON.parse(savedUserProfile);
  const [selectedWard, setSelectedWard] = useState("");

  const { category } = useParams();
  const { sub } = useParams();

  // const [categoryTitle,setCategoryTitle]=useState("")
  // const [suCategoryTitle,setSubCategoryTitle]=useState("")

  const categoryTitle = category;
  const suCategoryTitle = sub;
  // console.log('categoryTitle',categoryTitle);
  // console.log('suCategoryTitle',suCategoryTitle);

  useEffect(() => {
    // setCategoryTitle(category);
    // setSubCategoryTitle(suCategoryTitle)
    if (userProfile) {
      userInfo(userProfile.mobile).then((data) => {
        console.log("data", data);
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

  const handleWardChange = (event) => {
    onValueChange(event.target.value);
    setSelectedWard(event.target.value);
  };

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
                {/*
              
               {wardSelect === true ? <>
                <p><FontAwesomeIcon icon={faArrowRightLong} />Select ward No: </p>
                <select className="dropdownSelect" value={selectedWard} onChange={handleWardChange}>
                <option value="all">All Wards</option>
                <option value="1">Ward 1</option>
                <option value="2">Ward 2</option>
                <option value="3">Ward 3</option>
                <option value="4">Ward 4</option>
                <option value="5">Ward 5</option>
                <option value="6">Ward 6</option>
                <option value="7">Ward 7</option>
                <option value="8">Ward 8</option>
                <option value="9">Ward 9</option>
                <option value="10">Ward 10</option>
              </select>
                </>:<></>}
              */}

                {category && category.length ? (
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
              <div className="hero-btn">
                {userLogin ? (
                  <>
                    <Link className="btn btn-warning" to="/userDashboard">
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
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;
