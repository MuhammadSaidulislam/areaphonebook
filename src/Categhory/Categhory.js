import React, { useEffect, useState } from 'react';
import './Categhory.css';
import { Card, Col, Container, Row, Button, Collapse } from 'react-bootstrap';
import data from '../jsonData/Categhory.json';
import { Link, useNavigate } from "react-router-dom";
import SideBar from '../Sidebar/Sidebar';
import Banner from '../Banner/Banner';

export const Categhory = () => {
    //  window.localStorage.setItem("Category", JSON.stringify(data));

  //  let data = window.localStorage.getItem("Category");
  //  let setData = JSON.parse(data)

    
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
            <Banner />
            <Container>

                <Row>


                    {dataDividede.map(data => <Col md={6} lg={4} key={data.id}>
                        <div className="card">
                            <div className="card-header" data-toggle="collapse" data-target="#1">
                                <div className="overflow-hidden">
                                    <div className="card-content">
                                        <div className="cleartfix">
                                            <div className="media align-items-stretch d-flex">
                                                <div className="align-self-center">
                                                    <img className="manu-img" src={data.photo} alt={data.name} />
                                                </div>
                                                <div className="media-body">
                                                    <h3 className="manu-item"><Link to="/">{data.name}</Link></h3>
                                                    <Row>
                                                        {data.subCategory.slice(0, 3).map((nameList) =>
                                                            <>
                                                                <span key={nameList.id} className="col-6 topic tp1">{nameList.name}</span>
                                                            </>
                                                        )}
                                                        <span className="col-6 topic tp4" data-bs-toggle="collapse" data-bs-target={`#${data.collapseName}`}> <a href="#1" data-toggle="collapse">আরো দেখুন <i className="fa fa-chevron-down"></i></a> </span>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id={data.collapseName} className="collapse">
                                <Container>
                                    <Row>
                                        {data.subCategory.map((subData) =>
                                            <>
                                                <Col xs={6}><span className="topic"> <button key={subData.sub_id} className='lol' onClick={() => subCateghorySearch(subData.link, subData.sub_id)}>{subData.name}</button></span></Col>
                                            </>
                                        )}
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </Col>
                    )}

                </Row>
            </Container>
        </>
    )
}
