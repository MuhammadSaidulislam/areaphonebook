import React, { useState } from "react";
import Layout from "../Layout/Layout";
import "./Report.css";
import { Col, Container, Row } from "react-bootstrap";
import { reportApi } from "../../api/auth";
const Report = () => {
  const [reportName, setReportName] = useState("");
  const [reportComplain, setReportComplain] = useState("");
  const handleName = (e) => {
    setReportName(e.target.value);
  };
  const handleComplain = (e) => {
    setReportComplain(e.target.value);
  };
  const reportSubmit = () => {
    reportApi(reportName, reportComplain).then((data) => {
      console.log('report', data);
    })
  }
  return (
    <Layout>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={7}>
            <Row>
              <Col md={12}>
                <h1 className="reportHeading">Report</h1>
              </Col>
              <Col md={6}>
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={handleName}
                  placeholder="Enter your name"
                />
              </Col>
              <Col md={12} className="mt-3">
                <label>Enter your complain</label>
                <textarea onChange={handleComplain} name="complain" className="form-control"></textarea>
                <button className="btn btn-info mt-3" onClick={reportSubmit}>Submit</button>
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Report;
