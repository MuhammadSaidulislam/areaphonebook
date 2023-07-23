import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';
import { Col, Row, Container, Table, Modal } from 'react-bootstrap';
import { categoryAdd, categoryList, categorySingle, categoryUpdate } from '../../../api/auth';
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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
        setValue("serial_no", "", { shouldValidate: false });
        setSuccessName(false)
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
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categorySerial, setCategorySerial] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryFail, setCategoryFail] = useState(false);
  // single category
  const categorySelect = (id) => {
    setCategoryId(id)
    setShow(true)
    categorySingle(id).then((data) => {
      console.log('single', data.category_name);
      setCategoryName(data.category_name);
      setCategoryImage(data.category_image);
      setCategorySerial(data.serial_no)
    })
  }
  // update category
  let onSubmitUpdate = () => {
    const userRegister = new FormData(form.current);
    categoryUpdate(userRegister, categoryId).then((data) => {
      console.log('update', data);
      if (data.status === 500) {
        setCategoryFail(true)
      }
      else {
        setShow(false);
        setMsg((prevMsg) => prevMsg + 1);
      }
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
                <input {...register("category_name")} name="category_name" className='form-control mb-2' type='text' required />
                <label>Category serial</label>
                <input {...register("serial_no")} name="serial_no" className='form-control mb-2' type='number' required />
                <label>Category image</label>
                <input {...register("category_image")} type="file" name="category_image" className='form-control' required />
                {successName ? <><p className='text-danger'>This serial number already exist</p></> : <></>}
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
                    <td>{data.serial_no}</td>
                    <td><img src={`${API}/${data.category_image}`} width={50} /></td>
                    <td>{data.category_name}</td>
                    <td><button className='btn btn-info' onClick={() => categorySelect(data.serial_no)}>Edit</button> <button className='btn btn-danger' onClick={() => CategoryDelete(data.category_name)}>Delete</button></td>
                  </tr>)}

                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form ref={form} onSubmit={handleSubmit(onSubmitUpdate)}>
              <input className='form-control' name="category_name" type='text' value={categoryName !== null ? categoryName : ''} onChange={(e) => setCategoryName(e.target.value)} />
              <img src={`${API}/${categoryImage !== null ? categoryImage : ''}`} alt="image" width={55} />
              <input className='form-control mt-2' type="file" name="category_image" />
              <input className='form-control mt-2' name="serial_no" type='number' value={categorySerial !== null ? categorySerial : ''} onChange={(e) => setCategorySerial(e.target.value)} />
              {categoryFail && categoryFail === true ? <p>Please insert valid serial no</p> : ""}
              <button type="submit" className='btn btn-info mt-2'>
                Update
              </button>
            </form>

          </Modal.Body>
        </Modal>

      </section>

    </>
  )
}

export default CreateCategory