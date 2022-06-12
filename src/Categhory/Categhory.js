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
    const dataDividede = data.categhory;
    const subCateghorySearch = (subCateghoryName, sub_id) => {
        setDataId(sub_id)
        return navigate(`/${subCateghoryName}`)
    }


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
                                <button className="btn btn-info" data-bs-toggle="collapse" data-bs-target={`#${data.collapseName}`}>Collapsible</button>
                                <div id={data.collapseName} class="collapse">
                                    <div >
                                        {data.subCategory.map((subData) =>
                                            <>
                                                <button key={subData.sub_id} className='btn btn-danger' onClick={() => subCateghorySearch(subData.link, subData.sub_id)}>{subData.name}</button>
                                            </>
                                        )}
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>
                    )}

                </Row>
            </Container>
        </>
    )
}
