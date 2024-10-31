import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const InformasiBeasiswa = () => {
   const { module } = useSelector((e) => e.redux);
   const { daftarMasterBeasiswa } = module;

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <section className="h2_course-area pt-110 pb-120">
         <Container>
            <Row className="align-items-end">
               <Col xl={5} lg={6}>
                  <div className="section-area-2">
                     <h2 className="section-title mb-50">
                        Informasi{" "}
                        <span>
                           Beasiswa <img data-src="assets/line.png" alt="" className="lozad" />
                        </span>
                     </h2>
                  </div>
               </Col>
               <Col xl={7} lg={6}>
                  <div className="h2_course-tab mb-40">
                     <ul className="nav nav-pills" id="pills-tab">
                        <li className="nav-item" role="presentation">
                           <button className="nav-link active" type="button" role="tab">
                              Semuanya
                           </button>
                        </li>
                        <Each
                           of={daftarMasterBeasiswa}
                           render={(row) => (
                              <li className="nav-item" role="presentation">
                                 <button className="nav-link" type="button" role="tab">
                                    {h.parse("nama", row)}
                                 </button>
                              </li>
                           )}
                        />
                     </ul>
                  </div>
               </Col>
            </Row>
            <div className="h2_course-wrap">
               <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                     <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/1.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction to Psychology Subject</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       23 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       45 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-1.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Eric Wid get</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$140</del>$96.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/2.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Complete Angular Developer in 2023</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       54 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       72 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-2.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Hanson Deck</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$120</del>$70.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/3.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">The Science of Well-being for Teens</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       67 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-3.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Max Conversion</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$150</del>$99.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/4.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">AWS Machine Learning Engineer</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       57 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       98 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-4.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Ravi O'Leigh</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$159</del>$98.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/5.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction User Experience Design</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       58 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       50 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-5.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Valentino Morose</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$135</del>$69.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/6.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Spoken English for Career Develop</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       35 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-6.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Dylan Meringue</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$230</del>$173
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                     <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/1.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction to Psychology Subject</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       23 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       45 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-1.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Eric Wid get</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$140</del>$96.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/2.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Complete Angular Developer in 2023</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       54 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       72 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-2.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Hanson Deck</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$120</del>$70.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/3.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">The Science of Well-being for Teens</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       67 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-3.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Max Conversion</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$150</del>$99.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/4.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">AWS Machine Learning Engineer</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       57 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       98 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-4.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Ravi O'Leigh</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$159</del>$98.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/5.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction User Experience Design</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       58 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       50 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-5.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Valentino Morose</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$135</del>$69.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/6.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Spoken English for Career Develop</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       35 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-6.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Dylan Meringue</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$230</del>$173
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                     <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/1.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction to Psychology Subject</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       23 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       45 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-1.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Eric Wid get</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$140</del>$96.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/2.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Complete Angular Developer in 2023</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       54 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       72 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-2.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Hanson Deck</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$120</del>$70.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/3.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">The Science of Well-being for Teens</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       67 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-3.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Max Conversion</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$150</del>$99.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/4.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">AWS Machine Learning Engineer</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       57 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       98 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-4.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Ravi O'Leigh</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$159</del>$98.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/5.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction User Experience Design</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       58 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       50 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-5.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Valentino Morose</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$135</del>$69.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/6.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Spoken English for Career Develop</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       35 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-6.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Dylan Meringue</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$230</del>$173
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tab-pane fade" id="pills-four" role="tabpanel" aria-labelledby="pills-four-tab" tabindex="0">
                     <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/1.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction to Psychology Subject</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       23 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       45 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-1.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Eric Wid get</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$140</del>$96.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/2.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Complete Angular Developer in 2023</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       54 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       72 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-2.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Hanson Deck</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$120</del>$70.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/3.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">The Science of Well-being for Teens</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       67 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-3.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Max Conversion</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$150</del>$99.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/4.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">AWS Machine Learning Engineer</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       57 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       98 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-4.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Ravi O'Leigh</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$159</del>$98.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/5.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction User Experience Design</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       58 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       50 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-5.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Valentino Morose</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$135</del>$69.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/6.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Spoken English for Career Develop</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       35 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-6.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Dylan Meringue</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$230</del>$173
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tab-pane fade" id="pills-five" role="tabpanel" aria-labelledby="pills-five-tab" tabindex="0">
                     <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/1.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction to Psychology Subject</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       23 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       45 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-1.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Eric Wid get</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$140</del>$96.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/2.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Complete Angular Developer in 2023</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       54 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       72 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-2.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Hanson Deck</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$120</del>$70.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/3.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">The Science of Well-being for Teens</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       67 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-3.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Max Conversion</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$150</del>$99.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/4.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">AWS Machine Learning Engineer</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       57 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       98 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-4.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Ravi O'Leigh</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$159</del>$98.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/5.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Introduction User Experience Design</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       58 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       50 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-5.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Valentino Morose</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$135</del>$69.00
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                           <div className="h2_course-item mb-30">
                              <div className="h2_course-item-img">
                                 <a href="course-details.html">
                                    <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/6.jpg" alt="" />
                                 </a>
                              </div>
                              <div className="h2_course-content">
                                 <div className="h2_course-content-top">
                                    <div className="h2_course-rating">
                                       <ul>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                          <li>
                                             <i className="fa-solid fa-star" />
                                          </li>
                                       </ul>
                                       <span>(03 Reviews)</span>
                                    </div>
                                    <div className="h2_course-save">
                                       <a href="#">
                                          <i className="fa-thin fa-bookmark" />
                                       </a>
                                    </div>
                                 </div>
                                 <h5 className="h2_course-content-title">
                                    <a href="course-details.html">Spoken English for Career Develop</a>
                                 </h5>
                                 <div className="h2_course-content-info">
                                    <span>
                                       <i className="fa-thin fa-book-blank" />
                                       35 Lessons
                                    </span>
                                    <span>
                                       <i className="fa-thin fa-user-group" />
                                       24 Students
                                    </span>
                                 </div>
                                 <p className="h2_course-content-text">Through a combination of lectures, readings and discussions students.</p>
                                 <div className="h2_course-content-author">
                                    <div className="h2_course-author-img">
                                       <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/author-6.jpg" alt="" />
                                    </div>
                                    <div className="h2_course-author-info">
                                       <span>
                                          By <a href="#">Dylan Meringue</a>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              <div className="h2_course-content-bottom">
                                 <div className="h2_course-bottom-price">
                                    <span>
                                       <del>$230</del>$173
                                    </span>
                                 </div>
                                 <div className="h2_course-bottom-btn">
                                    <a href="course-details.html">
                                       More Details
                                       <i className="fa-light fa-arrow-right" />
                                       <i className="fa-light fa-arrow-right" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
};
export default InformasiBeasiswa;
