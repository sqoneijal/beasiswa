import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as h from "~/Helpers";

const Breadcrumb = () => {
   const { module } = useSelector((e) => e.redux);
   const { detailBerita } = module;

   return (
      <section className="breadcrumb-area bg-default" style={{ backgroundImage: "url(/assets/breadcrumb-bg.jpg)" }}>
         <img src="/assets/shape-1.png" alt="" className="breadcrumb-shape" />
         <Container>
            <Row>
               <Col xs={12}>
                  <div className="breadcrumb-content">
                     <h2 className="breadcrumb-title">Detail Informasi</h2>
                     <div className="breadcrumb-list">
                        <Link to={"/informasi"}>Informasi</Link>
                        <span>{h.parse("judul", detailBerita)}</span>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
};
export default Breadcrumb;
