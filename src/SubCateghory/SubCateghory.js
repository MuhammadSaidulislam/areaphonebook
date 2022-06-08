import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import userdata from './SubCateghory.json';

export const SubCateghory = () => {

    const { id } = useParams()
    const [filterdata, setFilterData] = useState([]);

    useEffect(() => {
        const newItem = userdata.userData.filter(data => {
            return data.link === id;
        });
        console.log('newItem', newItem);
        setFilterData(newItem);
    }, [])

    console.log('newData', filterdata);

    return (
        <div>
            <Container>
                <Row>
                    <Col md={4}>
                        {filterdata && filterdata.map(data => <div>
                            {
                                data.details.map(value =>
                                    <Card>
                                        <Card.Img variant="left" src={value.photo} width="25px" />
                                        <Card.Body className="right">
                                            <Card.Title>{value.name}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                            </div>

                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
