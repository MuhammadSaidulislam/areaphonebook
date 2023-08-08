import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container, Table } from "react-bootstrap";
import { pendingDel, pendingList, shopCreate, shopDelete } from "../../../api/auth";
import { API } from "../../../config";
const PendingList = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [msg, setMsg] = useState(0);
  const [pending, setPending] = useState([]);
  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    console.log('saa');
    pendingList().then((data) => {
      console.log('data',data.data);
      setPending(data.data);
    });
  }, [msg]);

  const confirmShop = (info) => {
    shopCreate(info).then((data) => {
      if (data.message) {
        pendingDel(info.shop_id).then((data) => {
          setMsg((prevMsg) => prevMsg + 1);
             console.log("save");
        });
      }
    });
  };


  return (
    <>
      <Sidebar isCollapsed={isCollapsed} />
      <button className="sideBtn" onClick={handleSidebarToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <section className={`main-body ${isCollapsed ? "" : "bodyCollapsed"}`}>
      <Container>
      <Row className="d-flex justify-content-center mt-3">
      <Col md={12}>
      <h1>Pending list</h1>
      </Col>
        <Col md={10}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Shop image</th>
                <th>Title</th>
                <th>Mobile</th>
                <th>Category</th>
                <th>sub-category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pending && pending.map((data, i) => <tr key={`categoryTable` + i}>
                <td>{i + 1}</td>
                <td><img src={`${API}/${data.shop_image}`} width={55} /></td>
                <td>{data.title}</td>
                <td>{data.mobile}</td>
                <td>{data.category}</td>
                <td>{data.sub_category}</td>
                <td>
               {/*  <Link className="btn btn-danger" to={`${data.category}/${data.sub_category}/${data.shop_id}`}>View</Link> */}
                <button className="btn btn-danger" onClick={() => confirmShop(data)}>Confirm</button>
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

export default PendingList