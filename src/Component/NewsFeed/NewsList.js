import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Banner from './../../Banner/Banner';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router";
import { postNews, postNewsTags } from '../../api/auth';
import { Link } from "react-router-dom";
import { API } from "../../config";


const NewsList = () => {
    const { id } = useParams();
    const [postList, setPostList] = useState([]);
    const [selectedTagsOption, setSelectedTagsOption] = useState("all");
    const [tagsState, setTagsState] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
        postNews(id).then((data) => {
            if (selectedTagsOption === "all") {
                setFilteredData(data);
              } else {
                const filtered = data.filter((item) => item.tags === selectedTagsOption);
                setFilteredData(filtered);
              }
        });
        postNewsTags(id).then((data) => {
            setTagsState(true);
        });
    }, [selectedTagsOption]);
    return (
        <>
            <Sidebar />
            <Banner tagsState={tagsState} selectedTagsOption={selectedTagsOption} setSelectedTagsOption={setSelectedTagsOption} />
            <Container>
                <Row>
                    {filteredData.length === 0 ? (
                        <>
                            <h1 className="text-center">No data</h1>
                        </>
                    ) : (
                        filteredData.map((value, i) => (
                            <Col md={4} key={`shop` + i}>
                                <div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-4 d-flex">
                                            <img
                                                src={`${API}/${value.shop_image}`}
                                                className="img-fluid rounded-start"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body subcategory">
                                                <Link to={`${value.shop_id}`} className="card-title">
                                                    {value.title}
                                                </Link>
                                                <p className="card-text">মোবাইল: {value.number}</p>
                                                <p className="card-text">মালিক: {value.title}</p>
                                                <p className="card-text">স্থান: {value.address}</p>
                                                <p className="card-text">বিস্তারিত: {value.service}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    )
}

export default NewsList