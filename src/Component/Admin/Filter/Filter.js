import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container, Table, Modal } from "react-bootstrap";
import { allFilter, categoryAdd, categoryList, deleteTags, filterFormAdd, subCategoryAdd } from "../../../api/auth";
import { useForm } from "react-hook-form";
import { subCategoryList, filterList } from './../../../api/auth';
import { v4 as uuidv4 } from "uuid";
const Filter = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shopCategory, setShopCategory] = useState("");
  const [msg, setMsg] = useState(0);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterLists, setFilterList] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const form = useRef(null);
  const { handleSubmit } = useForm();
  const [show, setShow] = useState(false);
  const uuid = uuidv4();
  const handleClose = () => setShow(false);


  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // category wise sub-category
    categoryList().then((data) => {
      setCategory(data.data);
    });
    allFilter().then((data) => {
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
    const jsonObject = {};
    for (const [key, value] of userRegister.entries()) {
      jsonObject[key] = value;
    }
    filterFormAdd(jsonObject).then((data) => {
      setMsg((prevMsg) => prevMsg + 1);
    })
  }

  // filterList
  const handleShow = (category_name, sub_category_name) => {
    setShow(true);
    filterList(category_name, sub_category_name).then((data) => {
      setFilterTags(data);
    })
  }
  // delete tags
  const deleteTag = (filter_id, tag) => {
    deleteTags(filter_id, tag).then((data) => {
      setShow(false);
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
                <input type="text" value={uuid} name="filter_id" hidden />
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterLists && filterLists.map((data, i) => <tr key={`categoryTable` + i}>
                    <td>{i + 1}</td>
                    <td>{data.category_name}</td>
                    <td>{data.sub_category_name}</td>
                    <td>{data.tags}</td>
                    <td><button className="btn btn-info" onClick={() => handleShow(data.category_name, data.sub_category_name)}>Delete</button></td>
                  </tr>)}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        {/* modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>tag name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {filterTags && filterTags.map((data, i) => <>
                  {data.tags && data.tags.map((value, i) =>
                    <tr key={`categoryTable` + i}>
                      <td>{data.filter_id}</td>
                      <td>{value}</td>
                      <td><button className="btn btn-info" onClick={() => deleteTag(data.filter_id, value)}>Delete</button></td>
                    </tr>
                  )}
                </>)}

              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
            <button variant="primary" onClick={handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  )
}

export default Filter