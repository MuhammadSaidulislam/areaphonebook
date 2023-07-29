import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Banner.css";
import { userInfo } from "../api/auth";
import cover from "../assets/image/banner/cover.jpg";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"; import Select from 'react-select';



const Banner = ({
  selectedOption,
  filterTags,
  profileFunction,
  postFunction,
  setSelectedOption,
  selectedTagsOption
}) => {




  const [userLogin, setUserLogin] = useState(false);
  const savedUserProfile = localStorage.getItem("areaphonebook");
  const userProfile = JSON.parse(savedUserProfile);
  const { category } = useParams();
  const { sub } = useParams();
  const profileUrl = window.location.pathname;

  // profile button
  const categoryTitle = category;
  const suCategoryTitle = sub;

  const FilterValue = (value) => {
    setSelectedOption(value);
  }




  const convertedArray = filterTags && filterTags.length > 0
    ? [
      { value: 'all', label: 'All' },
      ...filterTags.map((item) => ({ value: item, label: item })),
    ]
    : [];
  // tags



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
                  <img src={cover} alt="Help Card" style={{ width: "100%", marginTop: "15px" }} />
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
                            <FontAwesomeIcon className="arrowHeading" icon={faArrowRightLong} />
                            {sub}
                          </>
                        ) : (
                          <></>
                        )}
                      </Link>
                      {sub && sub.length > 0 ? <>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon className="arrowHeading" icon={faArrowRightLong} /> <Select
                            defaultValue={selectedOption}
                            onChange={(selectedOption) => FilterValue(selectedOption.value)}
                            options={convertedArray}
                          />
                        </div>
                      </> : <></>}
                    </>
                  </>
                ) : profileUrl === "/profile" ? (
                  <>
                    <div className="profileHeading">
                      <button className="btn" onClick={() => profileFunction()}>
                        আপনার সার্ভিস দেখুন
                      </button>
                      <button className="btn" onClick={() => postFunction()}>
                        আপনার পোস্ট দেখুন
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/narayanganj/newsFeed" className="active trailVideo">নিউজ ফীড</Link>

                  </>
                )}
              </div>
            </div>
          </Col>
          {/* category link */}
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
