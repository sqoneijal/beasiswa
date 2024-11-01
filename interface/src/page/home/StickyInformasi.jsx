import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const StickyInformasi = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <section className="h2_about-area pt-120 pb-70">
         <img data-src="assets/shape-5.png" alt="" className="h2_about-top-shape lozad" />
         <Container>
            <Row className="align-items-center">
               <Col xl={6} lg={6}>
                  <div className="h2_about-img mb-50">
                     <div className="h2_about-inner-img">
                        <img data-src="assets/1.jpg" alt="" className="h2_inner-img lozad" />
                        <img data-src="assets/shape-4.png" alt="" className="h2_inner-img-shape lozad" />
                     </div>
                     <div className="h2_about-inner-img2">
                        <img data-src="assets/2.jpg" alt="" className="lozad" />
                        <div className="h2_about-img-button">
                           <a href="https://www.youtube.com/watch?v=dMlASgogxo4" className="popup-video">
                              <i className="fa-solid fa-play" />
                           </a>
                        </div>
                     </div>
                     <div className="h2_about-img-shape d-none d-sm-block">
                        <img className="h2_about-shape-1 lozad" data-src="assets/shape-1.png" alt="" />
                        <img className="h2_about-shape-2 lozad" data-src="assets/shape-2.png" alt="" />
                        <img className="h2_about-shape-3 lozad" data-src="assets/shape-3.png" alt="" />
                     </div>
                  </div>
               </Col>
               <Col xl={6} lg={6} md={10}>
                  <div className="section-area-2 mb-35">
                     <h2 className="section-title mb-20">
                        Pengumuman{" "}
                        <span>
                           Beasiswa <img data-src="assets/line.png" alt="" className="lozad" />
                        </span>
                     </h2>
                     <p className="section-text">
                        Maecenas Felis Tellus, dictum sed fermentum vel, various condiment dolour. Donec aliquot, denim ut auctor molestee, era elite
                        pharetra masa, at impediment eros qualm sed libero. Sed arco lorem, rut rum.
                     </p>
                  </div>
                  <div className="h2_about-button">
                     <a href="#" className="theme-btn theme-btn-medium">
                        More Details
                     </a>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
};
export default StickyInformasi;
