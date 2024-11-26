import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {
   return (
      <section className="breadcrumb-area bg-default" style={{ backgroundImage: "url(/assets/breadcrumb-bg.jpg)" }}>
         <img src="/assets/shape-1.png" alt="" className="breadcrumb-shape" />
         <Container>
            <Row>
               <Col xs={12}>
                  <div className="breadcrumb-content">
                     <h2 className="breadcrumb-title">Pendaftaran Beasiswa</h2>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
};
export default Header;
