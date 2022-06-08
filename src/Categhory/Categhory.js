import React, { useState } from 'react';
import './Categhory.css';
import {SubCateghory} from '../SubCateghory/SubCateghory'
// import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row, Button, Collapse } from 'react-bootstrap';
import data from './Categhory.json';
import { useNavigate } from "react-router-dom";
export const Categhory = () => {
    //  const history = useHistory();
    const [dataId,setDataId]=useState()
    const navigate = useNavigate();
    const [open, setOpen] = useState();
    const dataDividede = data.valueList;
    // const numberlength = data.subCategory.subCategory();
    //  console.log(numberlength);
    const subCateghorySearch = (subCateghoryName, sub_id) => {
        // console.log(subCateghoryName);
        // console.log(sub_id);
        setDataId(sub_id)
        return navigate(`/${subCateghoryName}`)
        //  history.push(`/${subCateghoryName}`);
    }
    return (
        <>
            <Container>
                <Row>
                    {dataDividede.map(data => <Card key={data.id}>
                        <Card.Img variant="left" src={data.photo} width="25px" />
                        <Card.Body className="right">
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            {data.subCategory.slice(0, 3).map((nameList) =>
                                <>
                                    <p key={nameList.id}> {nameList.name}</p>
                                </>
                            )}
                            <Button
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                click
                            </Button>
                            <Collapse in={open}>
                                <div id="example-collapse-text">
                                    {data.subCategory.map((subData) =>
                                        <>
                                        <button className='btn btn-danger' onClick={() => subCateghorySearch(subData.link, subData.sub_id)}>{subData.name}</button>
                                        </>
                                    )}
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                    )}

                </Row>
            </Container>
        </>
    )
}
