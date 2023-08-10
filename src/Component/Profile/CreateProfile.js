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
const CreateProfile = (props) => {
    const{profileModal, setProfileModal}=props;
    const navigate = useNavigate();
    const [shopCategory, setShopCategory] = useState("");
    const [shopTagsCategory, setShopTagsCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [key, setKey] = useState('home');
   // const [show, setShow] = useState(true);
    const handleClose = () => setProfileModal(false);
 

    const savedUserProfile = localStorage.getItem("areaphonebook");
    const userProfile = JSON.parse(savedUserProfile);
    const form = useRef(null);
    const {
        handleSubmit,
    } = useForm();
    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    // time
    const weeklyDays = [
        { value: "saturday", label: "Saturday" },
        { value: "sunday", label: "Sunday" },
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
        { value: "friday", label: "Friday" },
    ]
    const timeOptions = [
        { value: "close", label: "Close" },
        { value: "01:00 AM", label: "01:00 AM" },
        { value: "02:00 AM", label: "02:00 AM" },
        { value: "03:00 AM", label: "03:00 AM" },
        { value: "04:00 AM", label: "04:00 AM" },
        { value: "05:00 AM", label: "05:00 AM" },
        { value: "06:00 AM", label: "06:00 AM" },
        { value: "07:00 AM", label: "07:00 AM" },
        { value: "08:00 AM", label: "08:00 AM" },
        { value: "09:00 AM", label: "09:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "01:00 PM", label: "01:00 PM" },
        { value: "02:00 PM", label: "02:00 PM" },
        { value: "03:00 PM", label: "03:00 PM" },
        { value: "04:00 PM", label: "04:00 PM" },
        { value: "05:00 PM", label: "05:00 PM" },
        { value: "06:00 PM", label: "06:00 PM" },
        { value: "07:00 PM", label: "07:00 PM" },
        { value: "08:00 PM", label: "08:00 PM" },
        { value: "09:00 PM", label: "09:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
        { value: "12:00 PM", label: "12:00 PM" },
    ];


    useEffect(() => {
        categoryList().then((data) => {
            setCategory(data.data);
        });
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
    const handleTimeChange = (day, timeType, value) => {
        const updatedSelectedTimes = [...selectedTimes];
        const dayIndex = updatedSelectedTimes.findIndex(item => item.day === day);
        if (dayIndex === -1) {
            updatedSelectedTimes.push({ day, [timeType]: value });
        } else {
            updatedSelectedTimes[dayIndex][timeType] = value;
        }
        setSelectedTimes(updatedSelectedTimes);
    };
    // create profile info
    let onSubmit = () => {
        const uuid = uuidv4();
        const shopData = new FormData(form.current);
        shopData.append('weeklyDays', JSON.stringify(selectedTimes));
      //  shopData.append("shop_image", selectedFile);
        shopData.append("shop_id", uuid);
        shopData.append("post_id", "");
        shopData.append("related_shop", "");
        shopData.append("mobile", userProfile.mobile);
        pendingShopList(shopData).then((data) => {
            if (data.message) {
                return navigate("/narayanganj");
            }
        });
    };
    



    return (
        <>
            <Modal show={profileModal} size="md" onHide={handleClose} animation={false} centered>
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
                                            <Col md={12}>
                                                <label>Number</label>
                                                <input
                                                    type="text"
                                                    name="number"
                                                    className="form-control"
                                                    placeholder="Number"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="phone_show"
                                                    className="form-control"
                                                    value="active"
                                                    hidden
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
                                    <Tab eventKey="contact" title="Time">
                                        {weeklyDays.map((option) => (
                                            <Row key={option.value} className="d-flex justify-content-left align-items-center timeStatus mb-2">
                                                <div className="col-4"><p className="dayText">{option.label}</p></div>
                                                <div className="col-4 d-flex align-items-center">
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        size="sm"
                                                        onChange={(e) => handleTimeChange(option.value, 'start_time', e.target.value)}
                                                    >
                                                        {timeOptions.map((timeOption) => (
                                                            <option key={timeOption.value} value={timeOption.value}>
                                                                {timeOption.label}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </div>
                                                <div className="col-4 d-flex align-items-center">
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        size="sm"
                                                        onChange={(e) => handleTimeChange(option.value, 'end_time', e.target.value)}
                                                    >
                                                        {timeOptions.map((timeOption) => (
                                                            <option key={timeOption.value} value={timeOption.value}>
                                                                {timeOption.label}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </div>
                                            </Row>
                                        ))}

                                        <Col md={12} className="text-center mt-3">
                                        <button type="submit" className="btn btn-info">
                                            Save
                                        </button>
                                    </Col>
                                    </Tab>
                                </Tabs>
                            </Row>
                        </form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateProfile