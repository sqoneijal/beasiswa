import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <section className="breadcrumb-area bg-default lozad" data-background-image="assets/breadcrumb-bg.jpg">
         <img src="assets/shape-1.png" alt="" className="breadcrumb-shape lozad" />
         <Container>
            <Row>
               <Col xs={12}>
                  <div className="breadcrumb-content">
                     <h2 className="breadcrumb-title">Profile</h2>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
};
export default Header;
