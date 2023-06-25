import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  categoryAdd,
  categoryList,
  pendingList,
  shopCreate,
  pendingDel,
  subCategoryAdd,
} from "../api/auth";

const AddService = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryMsg, setCategoryMsg] = useState(false);
  const [SubCategoryMsg, setSubCategoryMsg] = useState(false);
  const [pending, setPending] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  console.log('pending',pending);
  // category value
  const handleCategory = (e) => {
    var category = e.target.value;
    setCategoryValue(category);
  };
  // category add api function
  const addCategory = () => {
    categoryAdd(categoryValue).then((data) => {
      if (data.message) {
        setCategoryMsg(true);
        setCategoryValue("");
      }
    });
  };

  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
    });
  }, [categoryMsg]);

  const handleSubCategory = (e) => {
    let subCategory = e.target.value;
    setSubCategoryValue(subCategory);
  };
  const selectCat = (category) => {
    setSelectCategory(category);
  };
  const subCategoryApi = () => {
    if (selectCategory.length > 0 && subCategoryValue.length > 0) {
      subCategoryAdd(selectCategory, subCategoryValue).then((data) => {
        console.log("category", data);
        if (data.message) {
          setSubCategoryMsg(true);
          setSubCategoryValue("");
        }
      });
    } else {
      setSubCategoryMsg(false);
    }
  };
const [noData,setNodata]=useState(false)
  useEffect(() => {
    pendingList().then((data) => {
      setPending(data.data);
    });
  }, [noData]);

  const confirmShop = (info) => {
    pendingDel(info.shop_id).then((data)=>{
      setNodata(true)
    })
    shopCreate(info).then((data) => {
      if (data.message) {
        console.log('save');
      }
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
                value={categoryValue}
                onChange={handleCategory}
                placeholder="category add"
                className="form-control"
              />
              {categoryMsg ? <p>Category add successfully</p> : <></>}
              <button className="btn btn-info mt-2" onClick={addCategory}>
                Save
              </button>
            </Col>
            <Col md={6}>
              <label>Category select</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue>Select category</option>
                {category.map((item, i) => (
                  <option
                    onClick={() => selectCat(item.categoryName)}
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
                value={subCategoryValue}
                onChange={handleSubCategory}
                placeholder="sub-category add"
                className="form-control"
              />
              {SubCategoryMsg ? <p>Sub category select successfully</p> : <></>}
              <button className="btn btn-info mt-2" onClick={subCategoryApi}>
                Save
              </button>
            </Col>
            {pending.length === 0 ? (
              <p>No data</p>
            ) : (
              pending.map((data) => (
                <div>
                  <p>{data.mobile}</p>
                  <p>{data.category}</p>
                  <p>{data.sub_category}</p>
                  <p>{data.ward}</p>
                  <p>{data.shop_name}</p>
                  <p>{data.shop_owner}</p>
                  <p>{data.address}</p>


                  <button className="btn btn-danger">Cancel</button>
                  <button
                    className="btn btn-info"
                    onClick={() => confirmShop(data)}
                  >
                    Confirm
                  </button>
                </div>
              ))
            )}
          </Row>
        </Container>
      </div>
     
    </>
  );
};

export default AddService;
