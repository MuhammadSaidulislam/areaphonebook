import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar";
import { Col, Row, Container } from "react-bootstrap";
import { reportList } from "../../../api/auth";

const ReportList = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [reportItem, setReportItem] = useState([]);
    const handleSidebarToggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    // report list
    useEffect(() => {
        reportList().then((data) => {
            setReportItem(data.data);
        });
    }, []);
    return (
        <>
            <Sidebar isCollapsed={isCollapsed} />
            <button className="sideBtn" onClick={handleSidebarToggle}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <section className={`main-body ${isCollapsed ? "" : "bodyCollapsed"}`}>
                <Container>
                    <Row>
                    <Col md={12}>
                    <div className="adminHeading">
                    <h1>Report list</h1>
                    </div>
                    </Col>
                        {reportItem && reportItem.length === 0 ? (
                            <h1>No report</h1>
                        ) : (
                            reportItem.map((data) => (
                                <Col md={6}>
                                    <div className="reportCard">
                                        <h1>Name: {data.name}</h1>
                                        <p>Report: {data.complain}</p>
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

export default ReportList