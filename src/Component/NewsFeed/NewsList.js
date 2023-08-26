import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Banner from './../../Banner/Banner';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router";
import { postNews, postNewsTags } from '../../api/auth';
import { Link } from "react-router-dom";
import { API } from "../../config";
import "./NewsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import NewsCard from '../NewsCard/NewsCard';
import Loader from '../Loader/Loader';
const NewsList = () => {
    const { id } = useParams();
    const [postList, setPostList] = useState([]);
    const [selectedTagsOption, setSelectedTagsOption] = useState("all");
    const [tagsState, setTagsState] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        postNews().then((data) => {
            setFilteredData(data);
        });
    }, []);
    return (
        <>
            <Sidebar />
            <Banner />
            <Container>
            {filteredData && filteredData.length > 0  ? <>
                <Row>
                    {filteredData && filteredData.length === 0 ? (
                        <>
                            <h1 className="text-center">No data</h1>
                        </>
                    ) : (
                        filteredData.map((value, i) => <Col md={4} key={`shop` + i}>
                        <NewsCard value={value} />    
                        </Col>)
                    )}
                </Row>
                </>:<><Loader/></>}
                
            </Container>
        </>
    )
}

export default NewsList