import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container,Table } from "react-bootstrap";
import { allSubCategoryList, categoryAdd, categoryList, subCategoryAdd } from "../../../api/auth";
import { useForm } from "react-hook-form";
import { API } from "../../../config";

const CreateSubCategory = () => {
  const form = useRef(null);
  const { register, handleSubmit, setValue } = useForm();
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [successName, setSuccessName] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const [SubCategoryMsg, setSubCategoryMsg] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [msg, setMsg] = useState(0);

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // const [category, setCategory] = useState([]);
  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
    });
    allSubCategoryList().then((data) => {
      console.log('sub', data.data);
      setSubCategory(data.data)
    })
  }, [msg]);
  const selectCat = (category) => {
    setSelectCategory(category);
  };
  const handleSubCategory = (e) => {
    let subCategory = e.target.value;
    setSubCategoryValue(subCategory);
  };
  const subCategoryApi = () => {
    if (selectCategory.length > 0 && subCategoryValue.length > 0) {
      subCategoryAdd(selectCategory, subCategoryValue).then(
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
  // form submit
  let onSubmit = () => {
    const userRegister = new FormData(form.current);
    subCategoryAdd(userRegister).then((data) => {
      console.log('sub');
      setMsg((prevMsg) => prevMsg + 1);
    })
    // categoryAdd(userRegister).then((data) => {
    //   console.log("data", data);
    //   if (data.message === "Success") {
    //   } else {
    //     setSuccessName(true);
    //   }
    // });
  };
  return (
    <>
      <Sidebar isCollapsed={isCollapsed} />
      <button className="sideBtn" onClick={handleSidebarToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <section className={`main-body ${isCollapsed ? "" : "bodyCollapsed"}`}>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md={12}>
              <h1>Sub-category add here</h1>
            </Col>
            <Col md={6}>
              <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <label>Category select</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="category_name"
                >
                  <option defaultValue>Select category</option>
                  {category.map((item, i) => (
                    <option
                      onClick={() => selectCat(item.category_name)}
                      key={`category` + i}
                      value={item.category_name}
                    >
                      {item.category_name}
                    </option>
                  ))}
                </select>
                <label>Sub-category add</label>
                <input
                  type="text"
                  name="sub_category_name"
                  placeholder="sub-category add"
                  className="form-control"
                />
                {SubCategoryMsg ? (
                  <p>Sub category select successfully</p>
                ) : (
                  <></>
                )}

                <label>Sub-category image</label>
                <input
                  type="file"
                  name="sub_category_image"
                  className="form-control"
                  required
                />
                <button className="btn btn-info mt-2" type="submit">
                  Save
                </button>

                {successName ? (
                  <>
                    <p className="text-danger">
                      This name category already exist
                    </p>
                  </>
                ) : (
                  <></>
                )}

              </form>
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
                    <th>Sub-category name</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategory && subCategory.map((data, i) => <tr key={`categoryTable` + i}>
                    <td>{i + 1}</td>
                    <td><img src={`${API}/${data.sub_category_image}`} width={50} /></td>
                    <td>{data.category_name}</td>
                    <td>{data.sub_category_name}</td>
                  </tr>)}

                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CreateSubCategory;
