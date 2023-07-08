import React, { useEffect, useState, useRef } from "react";
import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  categoryAdd,
  categoryList,
  pendingList,
  shopCreate,
  pendingDel,
  subCategoryAdd,
  createData,
  reportList,
  allShopList,
  shopDelete,
} from "../api/auth";

const AddService = () => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryMsg, setCategoryMsg] = useState(false);
  const [SubCategoryMsg, setSubCategoryMsg] = useState(false);
  const [pending, setPending] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const form = useRef(null);
  const [tagsValue, setTagsValue] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  // category value
  const handleCategory = (e) => {
    var category = e.target.value;
    setCategoryValue(category);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Do something with the selected file
    setCategoryImage(file);
  };

  // category add api function
  const addCategory = () => {
    categoryAdd(categoryValue, categoryImage).then((data) => {
      // if (data.message) {
      //   setCategoryMsg(true);
      //   setCategoryValue("");
      // }
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
      subCategoryAdd(selectCategory, subCategoryValue, tagsValue).then(
        (data) => {
          if (data.message) {
            setSubCategoryMsg(true);
            setSubCategoryValue("");
          }
        }
      );
    } else {
      setSubCategoryMsg(false);
    }
  };
  const [noData, setNodata] = useState(false);
  useEffect(() => {
    pendingList().then((data) => {
      setPending(data.data);
    });
  }, [noData]);

  const confirmShop = (info) => {
    pendingDel(info.shop_id).then((data) => {
      setNodata(true);
    });
    shopCreate(info).then((data) => {
      if (data.message) {
        console.log("save");
      }
    });
  };

  let onSubmit = () => {
    const userRegister = new FormData(form.current);
    categoryAdd(userRegister).then((data) => {
      // if (data.error) {
      //   console.log("error");
      // } else {
      //   setValue("username", "", { shouldValidate: false });
      //   setValue("password", "", { shouldValidate: false });
      //   setValue("photo", "", { shouldValidate: false });
      //   // return navigate("/login")
      // }
    });
  };
  const [reportItem, setReportItem] = useState([]);
  const [shopItem, setShopItem] = useState([]);

  // report list
  useEffect(() => {
    reportList().then((data) => {
      setReportItem(data.data);
    });
    allShopList().then((data) => {
      setShopItem(data.data);
    });
  }, []);
  // delete shop
  const deleteShop = (shopId) => {
    shopDelete(shopId).then((data) => {
      console.log("delete", data);
    });
  };

  const handleTags = (e) => {
    setTagsValue(e.target.value);
  };
  return (
    <>
      <div className="categoryAdd">
        <div className="adminNavbar">
          <Container>
            <Row>
              <Col md={12}>
                <h1>Admin Dashboard</h1>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column adminSidebar">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Category add</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Sub-category add</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">All shop list</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Pending list</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Report list</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    {/* category add */}
                    <Tab.Pane eventKey="first">
                      <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                        <label>Category add</label>
                        <input
                          type="text"
                          value={categoryValue}
                          onChange={handleCategory}
                          placeholder="category add"
                          className="form-control"
                        />
                        {categoryMsg ? <p>Category add successfully</p> : <></>}

                        <input
                          id="image"
                          type="file"
                          name="image"
                          className="form-control mt-3"
                          {...register("image")}
                          required
                        />

                        {/*  <button className="btn btn-info mt-2" onClick={addCategory}>Save</button> */}

                        <button type="submit" className="btn btn-info mt-2">
                          Submit
                        </button>
                      </form>
                    </Tab.Pane>
                    {/* sub-category add */}
                    <Tab.Pane eventKey="second">
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
                      {SubCategoryMsg ? (
                        <p>Sub category select successfully</p>
                      ) : (
                        <></>
                      )}

                      <label>Tag add</label>
                      <input
                        type="text"
                        value={tagsValue}
                        onChange={handleTags}
                        placeholder="Tag add"
                        className="form-control"
                      />
                      <button
                        className="btn btn-info mt-2"
                        onClick={subCategoryApi}
                      >
                        Save
                      </button>
                    </Tab.Pane>
                    {/* all shop */}
                    <Tab.Pane eventKey="third">
                      <Row>
                        {shopItem && shopItem.length === 0 ? (
                          <h1>No report</h1>
                        ) : (
                          shopItem.map((data) => (
                            <Col md={6}>
                              <div className="card mb-3">
                                <div className="row g-0">
                                  <div className="col-md-4">
                                    <img
                                      src={data.photo}
                                      className="img-fluid rounded-start"
                                      alt="..."
                                    />
                                  </div>
                                  <div className="col-md-8">
                                    <div className="card-body subcategory">
                                      <h1>{data.shop_name}</h1>
                                      <p className="card-text">
                                        মোবাইল: {data.ward}
                                      </p>
                                      <p className="card-text">
                                        মালিক: {data.shop_owner}
                                      </p>
                                      <p className="card-text">
                                        স্থান: {data.address}
                                      </p>
                                      <p className="card-text">
                                        বিস্তারিত: {data.service}
                                      </p>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => deleteShop(data.shop_id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          ))
                        )}
                      </Row>
                    </Tab.Pane>
                    {/* pending list */}
                    <Tab.Pane eventKey="fourth">
                      {pending.length === 0 ? (
                        <p>No data</p>
                      ) : (
                        pending.map((data) => (
                          <Col md={6}>
                            <div className="card mb-3">
                              <div className="row g-0">
                                <div className="col-md-4">
                                  <img
                                    src={data.photo}
                                    className="img-fluid rounded-start"
                                    alt="..."
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body subcategory">
                                    <h1>{data.shop_name}</h1>
                                    <p className="card-text">
                                      মোবাইল: {data.ward}
                                    </p>
                                    <p className="card-text">
                                      মালিক: {data.shop_owner}
                                    </p>
                                    <p className="card-text">
                                      স্থান: {data.address}
                                    </p>
                                    <p className="card-text">
                                      বিস্তারিত: {data.service}
                                    </p>
                                    <button
                                      className="btn btn-info"
                                      onClick={() => confirmShop(data)}
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        ))
                      )}
                    </Tab.Pane>
                    {/* report list */}
                    <Tab.Pane eventKey="fifth">
                      <h1>Report list</h1>
                      <Row>
                        {reportItem && reportItem.length === 0 ? (
                          <h1>No report</h1>
                        ) : (
                          reportItem.map((data) => (
                            <Col md={6}>
                              <div className="reportCard">
                                <h1>Name: {data.name}</h1>
                                <p>Report: {data.complain}</p>
                              </div>
                            </Col>
                          ))
                        )}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddService;
