import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExploreBeasiswa = () => {
   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <section className="h2_category-area pb-100">
         <Container>
            <Row>
               <Col xs={12}>
                  <div className="section-area-2 small-section-area-2 text-center">
                     <h2 className="section-title mb-50">
                        Explore{" "}
                        <span>
                           <Link to="/beasiswa">Beasiswa</Link> <img data-src="assets/line.png" alt="" className="lozad" />
                        </span>
                     </h2>
                  </div>
               </Col>
            </Row>
            <div className="row">
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/1.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">Digital Marketing</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/2.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">Graphic Design</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/3.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">Writing &amp; Reading</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/4.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">IT &amp; Software</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/5.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">Mobile Application</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/6.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">Art &amp; Humanities</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/7.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">Web Design</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4 col-sm-6">
                  <div className="h2_category-item mb-30">
                     <div className="h2_category-img">
                        <img src="https://themephi.net/template/eduan/eduan/assets/img/category/2/8.jpg" alt="" />
                     </div>
                     <div className="h2_category-content">
                        <h5>
                           <a href="course.html">UX/UI Design</a>
                        </h5>
                        <p>26 Items</p>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
};
export default ExploreBeasiswa;
