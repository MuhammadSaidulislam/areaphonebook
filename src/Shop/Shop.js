import React, { useEffect, useState } from "react";
import "./Shop.css";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import {
  categoryList,
  shopCreate,
  subCategoryList,
  userInfo,
} from "../api/auth";
import { useNavigate } from "react-router-dom";
const Shop = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const savedUserProfile = localStorage.getItem("userProfile");
  const userProfile = JSON.parse(savedUserProfile);
  const [userShop, setUserShop] = useState([]);
 
  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
    });
  }, []);
  const [subCategory, setSubCategory] = useState([]);
  const selectCat = (category) => {
    setSelectCategory(category);
    subCategoryList(category).then((data) => {
      setSubCategory(data);
    });
  };
  // shop
  const [sub_category, setSub_category] = useState("");
  const [shop_owner, setShop_owner] = useState("");
  const [shop_name, setShop_name] = useState("");
  const [email, setEmail] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState("");
  const handleSubCategoryChange = (e) => {
    setSub_category(e.target.value);
  };
  const handleShopOwner = (e) => {
    setShop_owner(e.target.value);
  };
  const handleShopName = (e) => {
    setShop_name(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleWard = (e) => {
    setWard(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleService = (e) => {
    setService(e.target.value);
  };
  const createShopFunction = () => {
    const shop = {
      mobile: userProfile.mobile,
      shop_owner,
      shop_name,
      category: selectCategory,
      sub_category,
      email,
      ward,
      address,
      service,
    };
    shopCreate(shop).then((data) => {
      if (data.message) {
        return navigate("/");
      }
    });
  };
  // profile info

  useEffect(() => {
    userInfo(userProfile.mobile).then((data) => {
      if (data.message) {
        console.log("no shop");
      } else {
        setUserShop(data);
      }
    });
  }, []);
  return (
    <>
      <Sidebar />
      <Banner />
      <div className="shopInformation">
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="text-center">Shop information</h1>
            </Col>
          </Row>
          <Row>
            {userShop &&
              userShop.map((data) => (
                <Col md={6} className="shopBox">
                  <h6>Shop Information</h6>
                  <p>Mobile: {data.mobile}</p>
                  <p>Shop owner: {data.shop_owner}</p>
                  <p>Shop name: {data.shop_name}</p>
                  <p>Category: {data.category}</p>
                  <p>Sub category: {data.sub_category}</p>
                  <p>Service: {data.service}</p>
                </Col>
              ))}
          </Row>
          <Row>
            <Col md={6}>
              <label>Category select</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue>Open this select menu</option>
                {category.map((item, i) => (
                  <option
                    onClick={() => selectCat(item.categoryName)}
                    key={`categoryName` + i}
                    value={item.categoryName}
                  >
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={6}>
              <label>Sub-category select</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleSubCategoryChange}
              >
                <option defaultValue>Open this select menu</option>
                {subCategory.map((item, i) => (
                  <option
                    key={`subcategory` + i}
                    value={item.sub_category_name}
                  >
                    {item.sub_category_name}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={6}>
              <label>Shop owner</label>
              <input
                type="text"
                onChange={handleShopOwner}
                className="form-control"
                placeholder="Shop owner"
                required
              />
            </Col>
            <Col md={6}>
              <label>Shop name</label>
              <input
                type="text"
                onChange={handleShopName}
                className="form-control"
                placeholder="Shop name"
                required
              />
            </Col>
            <Col md={6}>
              <label>E-mail address</label>
              <input
                type="text"
                onChange={handleEmail}
                className="form-control"
                placeholder="E-mail"
                required
              />
            </Col>
            <Col md={6}>
              <label>Ward no</label>
              <input
                type="text"
                onChange={handleWard}
                className="form-control"
                placeholder="Ward"
                required
              />
            </Col>
            <Col md={6}>
              <label>Address</label>
              <input
                type="text"
                onChange={handleAddress}
                className="form-control"
                placeholder="Address"
                required
              />
            </Col>
            <Col md={6}>
              <label>Service</label>
              <input
                type="text"
                onChange={handleService}
                className="form-control"
                placeholder="Service"
                required
              />
            </Col>
            <Col md={12} className="text-center mt-3">
              <button
                type="submit"
                className="btn btn-info"
                onClick={createShopFunction}
              >
                Save
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Shop;
