import React, { useState } from 'react';
import './Categhory.css';
import { Card, Col, Container, Row, Button, Collapse } from 'react-bootstrap';
import data from '../jsonData/Categhory.json';
import { useNavigate } from "react-router-dom";
import SideBar from '../Sidebar/Sidebar';

export const Categhory = () => {
    const [dataId, setDataId] = useState()
    const navigate = useNavigate();
    const [open, setOpen] = useState();
    const dataDividede = data.valueList;
    const subCateghorySearch = (subCateghoryName, sub_id) => {
        setDataId(sub_id)
        return navigate(`/${subCateghoryName}`)
    }

    const [isCollapse, setCollapse] = useState(false)

    const toggle = () => setCollapse(!isCollapse);
  
    return (
        <>

        <SideBar />
        
            <Container>
                <Row>
                    {dataDividede.map(data => <Col md={3} key={data.id}>
                        <Card>
                            <Card.Img variant="left" src={data.photo} width="100%" />
                            <Card.Body className="right">
                                <Card.Title>{data.name}</Card.Title>
                                {data.subCategory.slice(0, 3).map((nameList) =>
                                    <>
                                        <p key={nameList.id}> {nameList.name}</p>
                                    </>
                                )}
                                <Button
                                    onClick={() => setOpen(!open)}
                                    aria-controls=""
                                >
                                    click 
                                </Button>
                                <Collapse in={open}>
                                    <div >
                                        {data.subCategory.map((subData) =>
                                            <>
                                                <button key={subData.sub_id} className='btn btn-danger' onClick={() => subCateghorySearch(subData.link, subData.sub_id)}>{subData.name}</button>
                                            </>
                                        )}
                                    </div>
                                </Collapse>
                            </Card.Body>
                        </Card>
                    </Col>
                    )}

                </Row>
            </Container>
        </>
    )
}
