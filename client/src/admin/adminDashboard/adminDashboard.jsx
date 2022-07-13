import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import AdminDashboardStyle from "./adminDashboard.module.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const Role = JSON.parse(localStorage.getItem("Admin"));
    if (!Role) {
      navigate("/adminsignin");
    }
  }, []);

  return (
    <Container
      fluid
      className={AdminDashboardStyle.container}
      style={{ minHeight: dimensions.height }}
    >
      <Nav
        style={{ minHeight: dimensions.height }}
        className="col-md-2 d-md-block bg-dark sidebar"
        activeKey="/admindashboard"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky">
          <Nav.Item>
            <Nav.Link href="/admindashboard">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </Container>
  );
};
export default AdminDashboard;
