import React from "react";
import { Container, Row } from "react-bootstrap";
const Footer = () => {
  return (
    <>
      <div
        style={{
          color: "white",
          backgroundColor: "#212529",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderBottom: "1px solid black",
        }}
      >
        <Container>
          <Row>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>My Logo</h5>
                <p>All rights reserved JavaScript Centric 2022</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Contact Us</h5>
                <p>Drop us a line</p>
                <p>hi@javascriptcentric.com</p>
                <p>+91-88-171-47753</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Subscribe here to recieve notification for new posts.</h5>
                <form>
                  <input placeholder="Enter Your Email Id" />
                  <button>Subscribe</button>
                </form>
              </div>
            </div>
          </Row>
        </Container>
      </div>
      <div
        style={{
          color: "white",
          backgroundColor: "#212529",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <Container>
          <Row>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <h5>Privacy Policy</h5>
              <h5>Terms of Service</h5>
              <h5>Cookie Policy</h5>
              <h5>Other</h5>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Footer;
