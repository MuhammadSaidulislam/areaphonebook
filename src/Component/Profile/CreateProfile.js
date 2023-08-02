import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Modal, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { API } from "../../config";
import {
    categoryList,
    filterList,
    pendingShopList,
    shopUpdate,
    subCategoryList,
    userInfo,
    userPost,
} from "../../api/auth";
const CreateProfile = () => {
    const navigate = useNavigate();
    const [shopCategory, setShopCategory] = useState("");
    const [shopSubCategory, setShopSubCategory] = useState("");
    const [shopTagsCategory, setShopTagsCategory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [subCategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [key, setKey] = useState('home');
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const savedUserProfile = localStorage.getItem("areaphonebook");
    const userProfile = JSON.parse(savedUserProfile);
    const form = useRef(null);
    const {
        handleSubmit,
    } = useForm();

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
            setShopTagsCategory(data[0].tags)
        });
    };
    // create profile info
    let onSubmit = () => {
        const uuid = uuidv4();
        const shopData = new FormData(form.current);
        shopData.append("shop_image", selectedFile);
        shopData.append("shop_id", uuid);
        shopData.append("post_id", "");
        shopData.append("mobile", userProfile.mobile);

        const jsonObject = {};
        for (const [key, value] of shopData.entries()) {
            jsonObject[key] = value;
        }

        console.log('create', shopData);


        pendingShopList(shopData).then((data) => {
            console.log("shop", data);
            if (data.message) {
                return navigate("/narayanganj");
            }
        });
    };
    return (
        <>
            <Modal show={show} size="lg" onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add your post</Modal.Title>
                </Modal.Header>
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
                                    <Tab eventKey="home" title="Home">
                                        <Row className="d-flex justify-content-center">
                                            <Col md={12}>
                                                <label>Category select</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    name="category"
                                                    onChange={(event) => selectCat(event.target.value)}
                                                >
                                                    <option defaultValue>Open this select menu</option>
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
                                            <Col md={12}>
                                                <label>Sub-category select</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    name="sub_category"
                                                    onChange={(e) => setShopTagCategory(e.target.value)}
                                                >
                                                    <option defaultValue>Open this select menu</option>
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
                                            <Col md={12}>
                                                <label>Filter tags</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                    name="tags"
                                                >
                                                    <option defaultValue>Open this select menu</option>

                                                    {shopTagsCategory &&
                                                        shopTagsCategory.map((item, i) =>
                                                            <option
                                                                key={`shopTagsCategory` + i}
                                                                value={item}
                                                            >
                                                                {item}
                                                            </option>
                                                        )}

                                                </select>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="profile" title="Profile">
                                        <Row className="d-flex justify-content-center">
                                            <Col md={12}>
                                                <label>Shop image</label> <br />
                                                <input
                                                    type="file"
                                                    name="shop_image"
                                                    placeholder="Enter your image"
                                                    required
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="form-control"
                                                    placeholder="Shop owner"
                                                    required
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <label>Number</label>
                                                <input
                                                    type="text"
                                                    name="number"
                                                    className="form-control"
                                                    placeholder="E-mail"
                                                    required
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <label>Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    className="form-control"
                                                    placeholder="Address"
                                                    required
                                                />
                                            </Col>
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
                                        </Row>
                                    </Tab>
                                    <Tab eventKey="contact" title="Contact">
                                        Tab content for Contact
                                    </Tab>
                                </Tabs>

                                <Col md={12} className="text-center mt-3">
                                    <button type="submit" className="btn btn-info">
                                        Save
                                    </button>
                                </Col>
                            </Row>
                        </form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateProfile