import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import userdata from '../jsonData/SubCateghory.json';
import Sidebar from '../Sidebar/Sidebar';
import './SubCateghory.css'

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
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={value.photo} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body subcategory">
                                                    <a className="card-title">{value.name}</a>
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
