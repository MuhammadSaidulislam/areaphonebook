import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import userdata from '../jsonData/SubCateghory.json';

export const SubCateghory = () => {
    const obj = {
        "photo": "./photo.png",
        "name": "মায়ের দোয়া রেফ্রিজারেশন এন্ড ওয়ার্কশপ",
        "number": "01994956071",
        "wordNo": "৪",
        "location": "দেলপাড়া বাজার সংলগ্ন",
        "detail": "এসি, ফ্রিজ, মাইক্রোওভেন, ওয়াশিং মেশিন সার্ভিসিং করা হয়।",
        "postLink": "http://fb.com/areaPhonebook",
        "videoLink": "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fyiralcrazy%2Fvideos%2F614052535735551%2F&width=500&show_text=false&height=280&appId"
    }
    const { id } = useParams()
    const [filterdata, setFilterData] = useState([]);
    let categhoryArray = userdata.subCateghory[1].details;
    categhoryArray.push(obj);
    console.log('array', categhoryArray);
    useEffect(() => {
        const newItem = userdata.subCateghory.filter(data => {
            console.log('id: ',id);
            return data.link === id;
        });
       setFilterData(newItem);
    }, [])
    // setFilterData(categhoryArray);
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
