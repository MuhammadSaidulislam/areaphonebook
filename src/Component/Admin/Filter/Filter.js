import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container,Table } from "react-bootstrap";
import { allFilter, categoryAdd, categoryList, filterFormAdd, subCategoryAdd } from "../../../api/auth";
import { useForm } from "react-hook-form";
import { subCategoryList } from './../../../api/auth';

const Filter = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shopCategory, setShopCategory] = useState("");
  const [msg, setMsg] = useState(0);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const form = useRef(null);
  const { handleSubmit } = useForm();


  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // category wise sub-category
    categoryList().then((data) => {
      setCategory(data.data);
    });
    allFilter().then((data)=>{
      console.log(data.data);
      setFilterList(data.data)
    })
  }, [msg])

  const selectCat = (category) => {
    setShopCategory(category);
    subCategoryList(category).then((data) => {
      setSubCategory(data);
    });
  };

  let onSubmit = () => {
    const userRegister = new FormData(form.current);
    console.log('userRegister', userRegister);
    const jsonObject = {};
    for (const [key, value] of userRegister.entries()) {
      jsonObject[key] = value;
    }

    filterFormAdd(jsonObject).then((data) => {
      console.log('filter', data);
      setMsg((prevMsg) => prevMsg + 1);
    })
  }
  return (
    <>
      <Sidebar isCollapsed={isCollapsed} />
      <button className="sideBtn" onClick={handleSidebarToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <section className={`main-body ${isCollapsed ? "" : "bodyCollapsed"}`}>
        <Container>
          <Row className="d-flex justify-content-center ">
            <Col md={8}>
              <Row>
                <Col md={12}>
                  <h1>Filter option</h1>
                </Col>
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                  <Col md={12}>
                    <label>Category select</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="category_name"
                      onChange={(event) => selectCat(event.target.value)}
                    >
                      <option defaultValue>Open this select menu</option>
                      {category.map((item, i) => (
                        <option
                          key={`category_name` + i}
                          value={item.category_name}
                        >
                          {item.category_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={12}>
                    <label>Sub-category select</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="sub_category_name"
                    >
                      <option defaultValue>Open this select menu</option>
                      {subCategory &&
                        subCategory.map((item, i) => (
                          <option
                            key={`subcategory` + i}
                            value={item.sub_category_name}
                          >
                            {item.sub_category_name}
                          </option>
                        ))}
                    </select>
                  </Col>
                  <Col md={12}>
                    <label>Filter name</label>
                    <input className="form-control" name="tags" placeholder="filter name" />
                  </Col>
                  <Col md={12}>
                    <button type="submit" className="btn btn-info mt-2">Save</button>
                  </Col>
                </form>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container>
        <Row className="d-flex justify-content-center mt-3">
          <Col md={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Category image</th>
                  <th>Category name</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {filterList && filterList.map((data, i) => <tr key={`categoryTable` + i}>
                  <td>{i + 1}</td>
                  <td>{data.category_name}</td>
                  <td>{data.sub_category_name}</td>
                  <td>{data.tags}</td>
                </tr>)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      </section>
    </>
  )
}

export default Filter