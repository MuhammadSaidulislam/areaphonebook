import React, { useEffect ,useRef } from "react";
import { filterList, subCategoryShopList } from "../api/auth";
import { useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../config";
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
      setWardSelect(true);
     // setFilteredData(data);
     console.log('selectedOption',selectedOption);
 
      if (selectedOption === "all") {
        setFilteredData(data);
        console.log('filtered',data);
      } else {
        const filtered = data.filter((item) => item.tags === selectedOption);
        setFilteredData(filtered);
        console.log('filtered',filtered);
      }
    });
    // filter list
    filterList(categoryTitle,suCategoryTitle).then((data)=>{
    //  console.log('filter',data.tags);
      setFilterTags(data.tags)
    })
    
  }, [sub,selectedOption]);
 
  return (
    <>
      <Sidebar />
      <Banner wardSelect={wardSelect} filterTags={filterTags}  selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <Container>
        <Row>
          {filteredData.length === 0 ? (
            <>
              <h1 className="text-center">No data</h1>
            </>
          ) : (
            filteredData.map((value,i) => (
              <Col md={4} key={`shop`+i}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4 d-flex">
                      <img
                        src={`${API}/${value.shop_image}`}
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
