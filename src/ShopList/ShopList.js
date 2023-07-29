import React, { useEffect } from "react";
import { filterList, subCategoryShopList } from "../api/auth";
import { useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../config";
import "./ShopList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faStar } from "@fortawesome/free-solid-svg-icons";
import ShopCard from "../Component/ShopCard/ShopCard";
import Loader from "../Component/Loader/Loader";
const ShopList = () => {

  const [wardSelect, setWardSelect] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");

  const { category } = useParams();
  const { sub } = useParams();
  const categoryTitle = category;
  const suCategoryTitle = sub;

  useEffect(() => {
    subCategoryShopList(sub).then((data) => {
      console.log('shop', data);
      setWardSelect(true);
      if (selectedOption === "all") {
        setFilteredData(data);
      } else {
        const filtered = data.filter((item) => item.tags === selectedOption);
        setFilteredData(filtered);
      }
    });
    // filter list
    filterList(categoryTitle, suCategoryTitle).then((data) => {
      // console.log('filter',data[0].tags);
      if (data.length) {
        setFilterTags(data[0].tags)
      }
    })
  }, [sub, selectedOption]);

  return (
    <>
      <Sidebar />
      <Banner wardSelect={wardSelect} filterTags={filterTags} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Container>
        <Row>
        {filteredData && filteredData.length > 0  ? <>
          {filteredData.length === 0 ? (
            <>
              <h1 className="text-center">No data</h1>
            </>
          ) : (
            filteredData.map((value, i) => (
              <Col md={4} key={`shop` + i}>
                <ShopCard value={value} />
              </Col>
            ))
          )}
          </>:<><Loader/></>}
          
        </Row>
      </Container>
    </>
  );
};

export default ShopList;
