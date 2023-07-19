import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container, Table } from "react-bootstrap";
import { allShopList, shopDelete, shopDetails } from "../../../api/auth";
import { API } from "../../../config";
import { Link } from "react-router-dom";
const AllShop = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [shopItem, setShopItem] = useState([]);
    const [msg, setMsg] = useState(0);
    const handleSidebarToggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    useEffect(() => {
        allShopList().then((data) => {
            console.log(data.data);
            setShopItem(data.data);
        });
    }, [msg]);
    // delete shop
    const deleteShop = (shopId) => {
        shopDelete(shopId).then((data) => {
            console.log("delete");
            setMsg((prevMsg) => prevMsg + 1);
        });
    };
    // view shop
  
    return (
        <>
            <Sidebar isCollapsed={isCollapsed} />
            <button className="sideBtn" onClick={handleSidebarToggle}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <section className={`main-body ${isCollapsed ? "" : "bodyCollapsed"}`}>
                <h1>Shop list</h1>
                <Container>
                <Row className="d-flex justify-content-center mt-3">
                  <Col md={10}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Shop image</th>
                          <th>Shop name</th>
                          <th>Shop owner</th>
                          <th>Mobile</th>
                          <th>Category</th>
                          <th>sub-category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shopItem && shopItem.map((data, i) => <tr key={`categoryTable` + i}>
                          <td>{i + 1}</td>
                          <td><img src={`${API}/${data.shop_image}`} width={55} /></td>
                          <td>{data.shop_name}</td>
                          <td>{data.shop_owner}</td>
                          <td>{data.mobile}</td>
                          <td>{data.category}</td>
                          <td>{data.sub_category}</td>
                          <td>
                         {/*  <Link className="btn btn-danger" to={`${data.category}/${data.sub_category}/${data.shop_id}`}>View</Link> */}
                          <button className="btn btn-danger" onClick={() => deleteShop(data.shop_id)}>Delete</button>
                          </td>
                        </tr>)}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Container>
            </section>
        </>
    )
}

export default AllShop