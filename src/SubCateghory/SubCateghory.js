import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import userdata from '../jsonData/SubCateghory.json';
import Sidebar from '../Sidebar/Sidebar';

export const SubCateghory = () => {
    const { id } = useParams();
    // let data = window.localStorage.getItem("SubCategory");
    //  let setData = JSON.parse(data)

    const [filterdata, setFilterData] = useState([]);
    useEffect(() => {
        const newItem = userdata.subCateghory.filter(data => {
            return data.link === id;
        });
        setFilterData(newItem);
    }, [])
    return (
        <div>
            <Sidebar />
            <Banner />
            <Container>
                <Row>
                    {filterdata.map(data => <>
                        {
                            data.details.map(value =>
                                <Col md={6} key={value.id}>
                                    {/*
                             <div className="card">
                                    <div className="card-header" data-toggle="collapse" data-target="#1">
                                        <div className="overflow-hidden">
                                            <div className="card-content">
                                                <div className="cleartfix">
                                                    <div className="media align-items-stretch d-flex">
                                                        <div className="align-self-center">
                                                            <img className="manu-img" src={value.photo} alt={value.name} />
                                                        </div>
                                                        <div className="media-body">
                                                            <h3 className="manu-item"><Link to="/">{value.name}</Link></h3>
                                                            <Row>
                                                            <span className="col-6 topic tp1">{value.number}</span>
                                                            <span className="col-6 topic tp1">{value.wordNo}</span>
                                                            <span className="col-6 topic tp1">{value.location}</span>
                                                                <span className="col-6 topic tp4" data-bs-toggle="collapse" data-bs-target={`#${value.number}`}> <a href="#1" data-toggle="collapse">আরো দেখুন <i class="fa fa-chevron-down"></i></a> </span>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        
                            
                                </div>
                            */}
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={value.photo} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{value.name}</h5>
                                                    <p className="card-text">মোবাইল: {value.number}</p>
                                                    <p className="card-text">ওয়ার্ড নং: {value.wordNo}</p>
                                                    <p className="card-text">স্থান: {value.location}</p>
                                                    <p className="card-text">বিস্তারিত: {value.detail}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )
                        }
                    </>

                    )}
                </Row>
            </Container>
        </div>
    )
}
