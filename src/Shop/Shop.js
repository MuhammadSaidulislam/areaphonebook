import React, { useEffect, useState } from "react";
import "./Shop.css";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import { categoryList, shopCreate, subCategoryList } from "../api/auth";

const Shop = () => {
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
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
  const [sub_category,setSub_category]=useState("");
  const [shop_owner,setShop_owner]=useState("");
  const [shop_name,setShop_name]=useState("");
  const [email,setEmail]=useState("");
  const [ward,setWard]=useState("");
  const [address,setAddress]=useState("");
  const [service,setService]=useState("");
  const handleSubCategoryChange=(e)=>{
    setSub_category(e.target.value)
  }
  const handleShopOwner=(e)=>{
    setShop_owner(e.target.value)
  }
  const handleShopName=(e)=>{
    setShop_name(e.target.value)
  }
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  const handleWard=(e)=>{
    setWard(e.target.value)
  }
  const handleAddress=(e)=>{
    setAddress(e.target.value)
  }
  const handleService=(e)=>{
    setService(e.target.value)
  }
  const createShopFunction = () => {
    const shop = {
      mobile:"0163",
      shop_owner,
      shop_name,
      category:selectCategory,
      sub_category,
      email,
      ward,
      address,
      service,
    };
     console.log("shop", shop);
     shopCreate(shop).then((data)=>{
      console.log('shop data',data);
     })
  };
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
              />
            </Col>
            <Col md={6}>
              <label>Shop name</label>
              <input
                type="text"
                onChange={handleShopName}
                className="form-control"
                placeholder="Shop name"
              />
            </Col>
            <Col md={6}>
              <label>E-mail address</label>
              <input
                type="text"
                onChange={handleEmail}
                className="form-control"
                placeholder="E-mail"
              />
            </Col>
            <Col md={6}>
              <label>Ward no</label>
              <input type="text" onChange={handleWard} className="form-control" placeholder="Ward" />
            </Col>
            <Col md={6}>
              <label>Address</label>
              <input
                type="text"
                onChange={handleAddress}
                className="form-control"
                placeholder="Address"
              />
            </Col>
            <Col md={6}>
              <label>Service</label>
              <input
                type="text"
                onChange={handleService}
                className="form-control"
                placeholder="Service"
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
