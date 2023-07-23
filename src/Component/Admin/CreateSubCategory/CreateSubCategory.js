import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container,Table } from "react-bootstrap";
import { allSubCategoryList, categoryAdd, categoryList, deleteSubCategory, subCategoryAdd } from "../../../api/auth";
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
 
  // form submit
  let onSubmit = () => {
    const userRegister = new FormData(form.current);
    subCategoryAdd(userRegister).then((data) => {
      console.log('sub');
      setMsg((prevMsg) => prevMsg + 1);
      setValue("category_name", "", { shouldValidate: false });
      setValue("sub_category_image", "", { shouldValidate: false });
      setValue("sub_category_name", "", { shouldValidate: false });
      setSuccessName(false)
    });
  };
  // delete sub category
  // delete category
  const CategoryDelete = (subcategory_name) => {
    deleteSubCategory(subcategory_name).then((data) => {
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
                  required
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
                  {...register("sub_category_name")}
                  required
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
                  {...register("sub_category_image")}
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategory && subCategory.map((data, i) => <tr key={`categoryTable` + i}>
                    <td>{i + 1}</td>
                    <td><img src={`${API}/${data.sub_category_image}`} width={50} /></td>
                    <td>{data.category_name}</td>
                    <td>{data.sub_category_name}</td>
                    <td><button className='btn btn-danger' onClick={() => CategoryDelete(data.sub_category_name)}>Delete</button></td>
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
