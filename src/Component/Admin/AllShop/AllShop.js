import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container } from "react-bootstrap";
import { API } from "../../../config";
import { allShopList, shopDelete } from "../../../api/auth";

const AllShop = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [shopItem, setShopItem] = useState([]);
    const handleSidebarToggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    useEffect(() => {
        allShopList().then((data) => {
            setShopItem(data.data);
        });
    }, []);
    // delete shop
    const deleteShop = (shopId) => {
        shopDelete(shopId).then((data) => {
            console.log("delete", data);
        });
    };
    return (
        <>
            <Sidebar isCollapsed={isCollapsed} />
            <button className="sideBtn" onClick={handleSidebarToggle}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <section className={`main-body ${isCollapsed ? "" : "bodyCollapsed"}`}>
                <h1>Shop list</h1>
                <Container>
                    <Row>
                        {shopItem && shopItem.length === 0 ? (
                            <h1>No shop</h1>
                        ) : (
                            shopItem.map((data) => (
                                <Col md={6}>
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4 d-flex">
                                                <img
                                                    src={`${API}/${data.shop_image}`}
                                                    className="img-fluid rounded-start"
                                                    alt="..."
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body subcategory">
                                                    <h1>{data.shop_name}</h1>
                                                    <p className="card-text">
                                                        মোবাইল: {data.ward}
                                                    </p>
                                                    <p className="card-text">
                                                        মালিক: {data.shop_owner}
                                                    </p>
                                                    <p className="card-text">
                                                        স্থান: {data.address}
                                                    </p>
                                                    <p className="card-text">
                                                        বিস্তারিত: {data.service}
                                                    </p>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => deleteShop(data.shop_id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        )}
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default AllShop