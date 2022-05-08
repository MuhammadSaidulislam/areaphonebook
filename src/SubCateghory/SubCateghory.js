import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import userdata from '../jsonData/SubCateghory.json';

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
            <Container>
                <Row>
                    {filterdata.map(data => <>
                        {
                            data.details.map(value =>
                                <Col md={4}>
                                    <Card>
                                        <Card.Img variant="left" src={value.photo} width="100%" />
                                        <Card.Body className="right">
                                            <Card.Title>{value.name}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
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
