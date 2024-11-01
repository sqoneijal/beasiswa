import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

const OpeningPage = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <section className="h2_banner-area">
         <div className="h2_single-banner">
            <Container>
               <Row className="align-items-center">
                  <Col xl={6} lg={6} md={12}>
                     <div className="h2_banner-content">
                        <div className="section-area-2 mb-45 ">
                           <h1 className="section-title">
                              UIN AR-RANIRY
                              <span>
                                 BEASISWA <img data-src="assets/line.png" alt="" className="lozad" />
                              </span>
                           </h1>
                           <p className="section-text">
                              Beasiswa di UIN Ar-Raniry Banda Aceh merupakan program bantuan pendidikan yang ditujukan untuk mendukung mahasiswa
                              berprestasi dan yang membutuhkan bantuan finansial dalam menyelesaikan studi. Beragam jenis beasiswa tersedia, termasuk
                              beasiswa pemerintah, swasta, dan program internal kampus, yang semuanya dirancang untuk meningkatkan akses pendidikan
                              dan pengembangan akademik di lingkungan kampus.
                           </p>
                        </div>
                     </div>
                  </Col>
                  <Col xl={6} lg={6} className="d-none d-lg-block">
                     <div className="h2_banner-right pl-80">
                        <div className="h2_banner-img">
                           <img data-src="assets/banner-bg.png" alt="" className="lozad" />
                        </div>
                        <div className="h2_banner-right-shape">
                           <img className="h2_banner-shape-1 lozad" data-src="assets/shape_1.png" alt="" />
                           <div className="inner-shpae-1">
                              <img className="h2_banner-shape-2 lozad" data-src="assets/shape_2.png" alt="" />
                           </div>
                        </div>
                        <div className="h2_banner-meta">
                           <div className="h2_banner-meta-info">
                              <span>Beasiswa</span>
                              <h5>KIP, BI, BAZNAS</h5>
                           </div>
                           <div className="h2_banner-meta-rating">
                              <span>Tunggu apalagi?</span>
                              <h5>Silahkan mendaftarkan diri</h5>
                           </div>
                        </div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </div>
      </section>
   );
};
export default OpeningPage;
