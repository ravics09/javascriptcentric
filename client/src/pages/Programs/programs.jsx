import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ProgramsStyle from "./programs.module.css";

const Programs = () => {
  useEffect(() => {}, []);

  return (
    <Fragment>
      <Navbar showSearchBar={false} />
      <Container className={ProgramsStyle.container}>
        <Row>
          <Col md={9} xl={9} xs={12}>
            <div className={ProgramsStyle.body}>
              <div className={ProgramsStyle.title}>
                <span>100+ JavaScript Programs</span>
              </div>
              <div className={ProgramsStyle.renderQuestion}>
                <h4>1.Verify a prime number?</h4>
                <p>
                  <strong>Question:</strong> How would you verify a prime
                  number?
                </p>
                <p>
                  <strong>Answer:</strong> a prime number is only divisible by
                  itself and 1. So, i will run a while loop and increase by 1.
                  (look at the code example. If you dont get it. this is not
                  your cake. do learn javaScript basics and come back.)
                </p>
                <pre
                  style={{
                    padding: 10,
                    backgroundColor: "#181A1F",
                    color: "white",
                  }}
                >
                  {`function isPrime(n){
  var divisor = 2;

  while (n > divisor){
    if(n % divisor == 0){
     return false; 
    }
    else
      divisor++;
  }
  return true;
}

> isPrime(137);
  = true
> isPrime(237);
  = false`}
                </pre>
              </div>
              <div className={ProgramsStyle.renderQuestion}>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
                  architecto vero, omnis harum, illo quo ex voluptas et quae
                  incidunt tenetur ipsam dolorem, ullam similique voluptatibus
                  vel rerum non reprehenderit.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
};
export default Programs;
