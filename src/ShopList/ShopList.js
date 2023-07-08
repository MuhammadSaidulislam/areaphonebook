import React, { useEffect } from "react";
import { subCategoryShopList } from "../api/auth";
import { useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
const ShopList = () => {
  const { sub } = useParams();
  const [shopList, setShopList] = useState([]);
  const [wardSelect, setWardSelect] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [valueFromChild, setValueFromChild] = useState("all");

  const handleValueFromChild = (value) => {
    setValueFromChild(value);
  };


  useEffect(() => {
    subCategoryShopList(sub).then((data) => {
      setWardSelect(true);
     // setFilteredData(data);
      if (valueFromChild === "all") {
        setFilteredData(data);
      } else {
        const filtered = data.filter((item) => item.ward === valueFromChild);
        setFilteredData(filtered);
      }
    });
    
  }, [sub,valueFromChild]);
 

  return (
    <>
      <Sidebar />
      <Banner wardSelect={wardSelect} onValueChange={handleValueFromChild} />
      <Container>
        <Row>
          {filteredData.length === 0 ? (
            <>
              <h1 className="text-center">No data</h1>
            </>
          ) : (
            filteredData.map((value) => (
              <Col md={4} key={value.id}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={value.photo}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body subcategory">
                        <Link to={`${value.shop_id}`} className="card-title">
                          {value.shop_name}
                        </Link>
                        <p className="card-text">মোবাইল: {value.ward}</p>
                        <p className="card-text">মালিক: {value.shop_owner}</p>
                        <p className="card-text">স্থান: {value.address}</p>
                        <p className="card-text">বিস্তারিত: {value.service}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default ShopList;
