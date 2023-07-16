import React, { useState,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';
import { Col,Row, Container } from 'react-bootstrap';
import { categoryAdd } from '../../../api/auth';
import { useForm } from 'react-hook-form';


const CreateCategory = () => {
    const form = useRef(null);
    const {  handleSubmit } = useForm();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleSidebarToggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    const [successName, setSuccessName] = useState(false);
  
  let onSubmit = () => {
    const userRegister = new FormData(form.current);
    categoryAdd(userRegister).then((data) => {
      console.log('data',data);
      if(data.message === "Success"){
        
      }
      else{
        setSuccessName(true)
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
                        <input name="category_name" className='form-control mb-2' type='text' required />
                        <label>Category image</label>
                        <input type="file"  name="category_image" className='form-control' required />
                       {successName ? <><p className='text-danger'>This name category already exist</p></>:<></>}
                        <button type="submit" className='mt-3 btn btn-info'>Add your category</button>
                      </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default CreateCategory