import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';
import { Col, Row, Container, Table } from 'react-bootstrap';
import { categoryAdd, categoryList } from '../../../api/auth';
import { useForm } from 'react-hook-form';
import { API } from "../../../config";
import { deleteCategory } from './../../../api/auth';

const CreateCategory = () => {
  const form = useRef(null);
  const { handleSubmit, register, setValue } = useForm();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [msg, setMsg] = useState(0);
  const [successName, setSuccessName] = useState(false);
  const [category, setCategory] = useState([]);
  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
    });
  }, [msg])
  let onSubmit = () => {
    const userRegister = new FormData(form.current);
    categoryAdd(userRegister).then((data) => {
      if (data.message === "Success") {
        setMsg((prevMsg) => prevMsg + 1);
        setValue("category_name", "", { shouldValidate: false });
        setValue("category_image", "", { shouldValidate: false });
      }
      else {
        setSuccessName(true)
      }
    })
  }
  // delete category
  const CategoryDelete = (category_name) => {
    deleteCategory(category_name).then((data) => {
      setMsg((prevMsg) => prevMsg + 1);
    })
  }
  return (
    <>
      <Sidebar isCollapsed={isCollapsed} />
      <button className="sideBtn" onClick={handleSidebarToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <section className={`main-body ${isCollapsed ? '' : 'bodyCollapsed'}`}>
        <Container>
          <Row className='d-flex justify-content-center'>
            <Col md={12}>
              <h1>Category add here</h1>
            </Col>
            <Col md={6}>
              <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <label>Category name</label>
                <input      {...register("category_name")} name="category_name" className='form-control mb-2' type='text' required />
                <label>Category image</label>
                <input {...register("category_image")} type="file" name="category_image" className='form-control' required />
                {successName ? <><p className='text-danger'>This name category already exist</p></> : <></>}
                <button type="submit" className='mt-3 btn btn-info'>Add your category</button>
              </form>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className='d-flex justify-content-center mt-3'>
            <Col md={7}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category image</th>
                    <th>Category name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category && category.map((data, i) => <tr key={`categoryTable` + i}>
                    <td>{i + 1}</td>
                    <td><img src={`${API}/${data.category_image}`} width={50} /></td>
                    <td>{data.category_name}</td>
                    <td><button className='btn btn-danger' onClick={() => CategoryDelete(data.category_name)}>Delete</button></td>
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

export default CreateCategory