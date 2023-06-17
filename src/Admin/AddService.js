import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { categoryAdd, categoryList, subCategoryAdd } from "../api/auth";

const AddService = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryMsg,setCategoryMsg]=useState(false)
  // category value
  const handleCategory = (e) => {
    var category = e.target.value;
    setCategoryValue(category);
  };
  // category add api function
  const addCategory = () => {
    categoryAdd(categoryValue).then((data) => {
      if (data.message) {
        setCategoryMsg(true)
      }
    });
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
    });
  }, [categoryMsg]);

  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const handleSubCategory = (e) => {
    let subCategory = e.target.value;
    setSubCategoryValue(subCategory);
  };
  const selectCat = (category) => {
    setSelectCategory(category);
  };
  const subCategoryApi = () => {
    subCategoryAdd(selectCategory, subCategoryValue).then((data) => {
      console.log("category", data);
    });
  };

  return (
    <>
      <div className="categoryAdd">
        <Container>
          <Row>
            <Col md={6}>
              <label>Category add</label>
              <input
                type="text"
                onChange={handleCategory}
                placeholder="category add"
                className="form-control"
              />
              <button className="btn btn-info" onClick={addCategory}>
                Save
              </button>
            </Col>
            <Col md={6}>
              <label>Category select</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue>Open this select menu</option>
                {category.map((item, i) => (
                  <option
                    onClick={()=>selectCat(item.categoryName)}
                    key={`category` + i}
                    value={item.categoryName}
                  >
                    {item.categoryName}
                  </option>
                ))}
              </select>
              <label>Sub-category add</label>
              <input
                type="text"
                onChange={handleSubCategory}
                placeholder="sub-category add"
                className="form-control"
              />
              <button className="btn btn-info" onClick={subCategoryApi}>
                Save
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      {/*
    
    <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                {subValue.map(data =>
                    <option value="1" onClick={() => submenu(data.pageLink)}>{data.name}</option>)}
            </select>
            {subMenu ? <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                {showCategory.map(data =>
                    <option value="1" onClick={() => secondData(data.link)}>{data.name}</option>)}
            </select> : null}

            <button type='submit' className='btn btn-info' onClick={() => pushData()}>Submit data</button>
    */}
    </>
  );
};

export default AddService;
