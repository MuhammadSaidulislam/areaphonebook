import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container } from "react-bootstrap";
import { pendingDel, pendingList, shopCreate, shopDelete } from "../../../api/auth";
import { API } from "../../../config";
const PendingList = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pending, setPending] = useState([]);
  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    pendingList().then((data) => {
      setPending(data.data);
    });
  }, []);

  const confirmShop = (info) => {
    shopCreate(info).then((data) => {
      if (data.message) {
        console.log("save");
        pendingDel(info.shop_id).then((data) => {
          //   setNodata(true);
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
          <Row>
            {pending.length === 0 ? (
              <p>No data</p>
            ) : (
              pending.map((data, i) => (
                <Col md={6} key={`card` + i}>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
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
                            className="btn btn-info"
                            onClick={() => confirmShop(data)}
                          >
                            Confirm
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

export default PendingList