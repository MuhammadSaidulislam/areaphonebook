import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Modal, Tab, Tabs, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
    categoryList,
    filterList,
    pendingShopList,
    shopUpdate,
    subCategoryList,
    userInfo,
    userPost,
} from "../../api/auth";
const CreatePost = (props) => {
    const { postShow, setPostShow } = props;

    const navigate = useNavigate();
    const [shopCategory, setShopCategory] = useState("");
    const [shopTagsCategory, setShopTagsCategory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [subCategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [key, setKey] = useState("home");
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setPostShow(false);
    const savedUserProfile = localStorage.getItem("areaphonebook");
    const userProfile = JSON.parse(savedUserProfile);

    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    // time


    const form = useRef(null);
    const { handleSubmit } = useForm();

    useEffect(() => {
        // category wise sub-category
        categoryList().then((data) => {
            setCategory(data.data);
        });
        // user profile
        // userInfo(userProfile.mobile).then((data) => {
        //   if (data.message) {
        //     console.log("no shop");
        //     setCreateProfile(true);
        //   } else {
        //     setCreateProfile(false);
        //     setUserShop(data[0]);
        //   }
        // });


    }, []);
    // category
    const selectCat = (category) => {
        setShopCategory(category);
        subCategoryList(category).then((data) => {
            setSubCategory(data);
        });
    };
    // filter tags
    const setShopTagCategory = (subCategory) => {
        filterList(shopCategory, subCategory).then((data) => {
            if (data.error) {
                console.log('error');
            }
            else {
                setShopTagsCategory(data[0].tags)
            }
        });
    };


    // time


    // create profile info
    let onSubmit = () => {
        const uuid = uuidv4();
        const post = uuidv4();
        const shopData = new FormData(form.current);

        shopData.append('weeklyDays', "[]");

        shopData.append("shop_id", uuid);
        shopData.append("post_id", post);
        shopData.append("mobile", userProfile.mobile);

        pendingShopList(shopData).then((data) => {
            if (data.message) {
                return navigate("/narayanganj");
            }
        });
    };

    return (
        <>
            <Modal
                show={postShow}
                size="md"
                onHide={handleClose}
                animation={false}
                centered
            >
                {/*
             <Modal.Header closeButton>
                    <Modal.Title>Add your post</Modal.Title>
                </Modal.Header> */}

                <Modal.Body>
                    <Container>
                        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                            <Row className="d-flex justify-content-center">
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Category">
                                        <Row className="d-flex justify-content-center">
                                            <Col md={12}>
                                                <label>Category select</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    name="category"
                                                    onChange={(event) => selectCat(event.target.value)}
                                                >
                                                    <option defaultValue>Select your category</option>
                                                    {category.map((item, i) => (
                                                        <option
                                                            key={`category_name` + i}
                                                            value={item.category_name}
                                                        >
                                                            {item.category_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <label>Sub-category select</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    name="sub_category"
                                                    onChange={(e) => setShopTagCategory(e.target.value)}
                                                >
                                                    <option defaultValue>Select your sub-category</option>
                                                    {subCategory &&
                                                        subCategory.map((item, i) => (
                                                            <option
                                                                key={`subcategory` + i}
                                                                value={item.sub_category_name}
                                                            >
                                                                {item.sub_category_name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </Col>
                                            <Col md={12} className="mt-2">
                                                <label>Filter tags</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    name="tags"
                                                >
                                                    <option defaultValue>Select your filter</option>
                                                    {shopTagsCategory &&
                                                        shopTagsCategory.map((item, i) => (
                                                            <option key={`shopTagsCategory` + i} value={item}>
                                                                {item}
                                                            </option>
                                                        ))}
                                                </select>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="profile" title="Profile">
                                        <Row className="d-flex justify-content-center">
                                            <Col md={12}>
                                                <label>Shop image</label> <br />
                                                {file && file.length > 0 ? <img src={file} width="250px" height="250px" /> : ""}
                                                <input
                                                    name="shop_image"
                                                    type="file"
                                                    onChange={handleChange}
                                                    placeholder="Enter your image"
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="form-control"
                                                    placeholder="Title"
                                                    required
                                                />
                                            </Col>
                                            <input type="text" name="number" className="form-control" hidden />
                                            <input type="text" name="phone_show" value="active" hidden />
                                            <input type="text" name="address" hidden />
                                            <Col md={12}>
                                                <label>Details</label>
                                                <input
                                                    type="text"
                                                    name="service"
                                                    className="form-control"
                                                    placeholder="Details"
                                                    required
                                                />
                                            </Col>
                                            <Col md={12} className="text-center mt-3">
                                                <button type="submit" className="btn btn-info">
                                                    Save
                                                </button>
                                            </Col>
                                        </Row>
                                    </Tab>

                                </Tabs>


                            </Row>
                        </form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreatePost;
