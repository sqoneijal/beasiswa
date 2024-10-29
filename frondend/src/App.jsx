import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { createRoot } from "react-dom/client";
import { Bars } from "react-loader-spinner";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import redux from "./redux";

import "./assets/css/01-bootstrap.css";
import "./assets/css/02-animate.css";
import "./assets/css/03-magnific-popup.css";
import "./assets/css/04-fontawesome-all.css";
import "./assets/css/05-nice-select.css";
import "./assets/css/06-meanmenu.css";
import "./assets/css/07-swiper-bundle.css";
import "./assets/css/08-main.css";

const Header = React.lazy(() => import("./Header"));
const Routing = React.lazy(() => import("./Routing"));
const Footer = React.lazy(() => import("./Footer"));

const App = () => {
   const loader = (
      <Bars
         visible={true}
         color="#4fa94d"
         radius="9"
         wrapperStyle={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
         }}
         wrapperclassName="page-loader flex-column bg-dark bg-opacity-25"
      />
   );

   return (
      <React.Suspense fallback={loader}>
         <Header />
         <main>
            <Routing />

            <section className="h2_course-area pt-110 pb-120">
               <div className="container">
                  <div className="row align-items-end">
                     <div className="col-xl-5 col-lg-6">
                        <div className="section-area-2">
                           <h2 className="section-title mb-50">
                              Browse Our <br /> Exclusive{" "}
                              <span>
                                 Courses <img src="https://themephi.net/template/eduan/eduan/assets/img/banner/2/line.png" alt="" />
                              </span>
                           </h2>
                        </div>
                     </div>
                     <div className="col-xl-7 col-lg-6">
                        <div className="h2_course-tab mb-40">
                           <ul className="nav nav-pills" id="pills-tab" role="tablist">
                              <li className="nav-item" role="presentation">
                                 <button
                                    className="nav-link active"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true">
                                    See All
                                    <span>New</span>
                                 </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                 <button
                                    className="nav-link"
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                    tabindex="-1">
                                    Web Design
                                 </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                 <button
                                    className="nav-link"
                                    id="pills-contact-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-contact"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false"
                                    tabindex="-1">
                                    Marketing
                                 </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                 <button
                                    className="nav-link"
                                    id="pills-four-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-four"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-four"
                                    aria-selected="false"
                                    tabindex="-1">
                                    Lifestyle
                                 </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                 <button
                                    className="nav-link"
                                    id="pills-five-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-five"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-five"
                                    aria-selected="false"
                                    tabindex="-1">
                                    Graphic Design
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction to Psychology Subject</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>23 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>45 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Complete Angular Developer in 2023</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>54 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>72 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">The Science of Well-being for Teens</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>67 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">AWS Machine Learning Engineer</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>57 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>98 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction User Experience Design</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>58 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>50 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Spoken English for Career Develop</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>35 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction to Psychology Subject</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>23 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>45 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Complete Angular Developer in 2023</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>54 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>72 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">The Science of Well-being for Teens</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>67 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">AWS Machine Learning Engineer</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>57 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>98 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction User Experience Design</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>58 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>50 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Spoken English for Career Develop</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>35 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction to Psychology Subject</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>23 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>45 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Complete Angular Developer in 2023</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>54 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>72 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">The Science of Well-being for Teens</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>67 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">AWS Machine Learning Engineer</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>57 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>98 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction User Experience Design</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>58 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>50 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Spoken English for Career Develop</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>35 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction to Psychology Subject</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>23 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>45 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Complete Angular Developer in 2023</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>54 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>72 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">The Science of Well-being for Teens</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>67 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">AWS Machine Learning Engineer</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>57 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>98 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction User Experience Design</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>58 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>50 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Spoken English for Career Develop</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>35 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction to Psychology Subject</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>23 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>45 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Complete Angular Developer in 2023</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>54 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>72 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">The Science of Well-being for Teens</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>67 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">AWS Machine Learning Engineer</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>57 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>98 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Introduction User Experience Design</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>58 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>50 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
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
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                                <li>
                                                   <i className="fa-solid fa-star"></i>
                                                </li>
                                             </ul>
                                             <span>(03 Reviews)</span>
                                          </div>
                                          <div className="h2_course-save">
                                             <a href="#">
                                                <i className="fa-thin fa-bookmark"></i>
                                             </a>
                                          </div>
                                       </div>
                                       <h5 className="h2_course-content-title">
                                          <a href="course-details.html">Spoken English for Career Develop</a>
                                       </h5>
                                       <div className="h2_course-content-info">
                                          <span>
                                             <i className="fa-thin fa-book-blank"></i>35 Lessons
                                          </span>
                                          <span>
                                             <i className="fa-thin fa-user-group"></i>24 Students
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
                                             More Details<i className="fa-light fa-arrow-right"></i>
                                             <i className="fa-light fa-arrow-right"></i>
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="h2_about-area pt-120 pb-70">
               <img src="https://themephi.net/template/eduan/eduan/assets/img/about/2/shape-5.png" alt="" className="h2_about-top-shape" />
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-xl-6 col-lg-6">
                        <div className="h2_about-img mb-50">
                           <div className="h2_about-inner-img">
                              <img src="https://themephi.net/template/eduan/eduan/assets/img/about/2/1.jpg" alt="" className="h2_inner-img" />
                              <img
                                 src="https://themephi.net/template/eduan/eduan/assets/img/about/2/shape-4.png"
                                 alt=""
                                 className="h2_inner-img-shape"
                              />
                           </div>
                           <div className="h2_about-inner-img2">
                              <img src="https://themephi.net/template/eduan/eduan/assets/img/about/2/2.jpg" alt="" />
                              <div className="h2_about-img-button">
                                 <a href="https://www.youtube.com/watch?v=dMlASgogxo4" className="popup-video">
                                    <i className="fa-solid fa-play"></i>
                                 </a>
                              </div>
                           </div>
                           <div className="h2_about-rating d-none d-sm-block">
                              <span>
                                 <i className="fa-solid fa-star"></i>4.5 (3.4k Reviews)
                              </span>
                              <h5>Congratulations</h5>
                           </div>
                           <div className="h2_about-img-shape d-none d-sm-block">
                              <img
                                 className="h2_about-shape-1"
                                 src="https://themephi.net/template/eduan/eduan/assets/img/about/2/shape-1.png"
                                 alt=""
                              />
                              <img
                                 className="h2_about-shape-2"
                                 src="https://themephi.net/template/eduan/eduan/assets/img/about/2/shape-2.png"
                                 alt=""
                              />
                              <img
                                 className="h2_about-shape-3"
                                 src="https://themephi.net/template/eduan/eduan/assets/img/about/2/shape-3.png"
                                 alt=""
                              />
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 col-md-10 mb-50">
                        <div className="section-area-2 mb-35">
                           <h2 className="section-title mb-20">
                              Education Instructors Play Crucial Role in Shaping The Lives of Their{" "}
                              <span>
                                 Students <img src="https://themephi.net/template/eduan/eduan/assets/img/banner/2/line.png" alt="" />
                              </span>
                           </h2>
                           <p className="section-text">
                              Maecenas Felis Tellus, dictum sed fermentum vel, various condiment dolour. Donec aliquot, denim ut auctor molestee, era
                              elite pharetra masa, at impediment eros qualm sed libero. Sed arco lorem, rut rum.
                           </p>
                        </div>
                        <div className="h2_about-button">
                           <a href="#" className="theme-btn theme-btn-medium">
                              More Details
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="h2_blog-area pb-90">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-xl-6 col-lg-8 col-md-10">
                        <div className="section-area-2 mb-50 text-center h2_blog-section-area">
                           <h2 className="section-title mb-30">
                              Our Latest
                              <span>
                                 Articles <img src="https://themephi.net/template/eduan/eduan/assets/img/banner/2/line.png" alt="" />
                              </span>
                           </h2>
                           <p className="section-text">
                              Through a combination of lectures, readings, discussions, students will gain a solid foundation in educational
                              psychology.
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="h2_blog-item mb-30">
                           <div className="h2_blog-img">
                              <a href="blog-details.html">
                                 <img src="https://themephi.net/template/eduan/eduan/assets/img/blog/2/blog-1.jpg" alt="" />
                              </a>
                           </div>
                           <div className="h2_blog-content">
                              <div className="h2_blog-content-meta">
                                 <span>
                                    <i className="fa-thin fa-user"></i>Admin
                                 </span>
                                 <span>
                                    <i className="fa-thin fa-clock"></i>June 23, 2023
                                 </span>
                              </div>
                              <h5 className="h2_blog-content-title">
                                 <a href="blog-details.html">Education Week News and Views on Education Policy and Practice.</a>
                              </h5>
                              <a href="#" className="theme-btn blog-btn t-theme-btn">
                                 Read More
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="h2_blog-item mb-30">
                           <div className="h2_blog-img">
                              <a href="blog-details.html">
                                 <img src="https://themephi.net/template/eduan/eduan/assets/img/blog/2/blog-2.jpg" alt="" />
                              </a>
                           </div>
                           <div className="h2_blog-content">
                              <div className="h2_blog-content-meta">
                                 <span>
                                    <i className="fa-thin fa-user"></i>Admin
                                 </span>
                                 <span>
                                    <i className="fa-thin fa-clock"></i>June 23, 2023
                                 </span>
                              </div>
                              <h5 className="h2_blog-content-title">
                                 <a href="blog-details.html">The Learning Network Teaching and Learning With The New York Times.</a>
                              </h5>
                              <a href="#" className="theme-btn blog-btn t-theme-btn">
                                 Read More
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-4 col-lg-6 col-md-6">
                        <div className="h2_blog-item mb-30">
                           <div className="h2_blog-img">
                              <a href="blog-details.html">
                                 <img src="https://themephi.net/template/eduan/eduan/assets/img/blog/2/blog-3.jpg" alt="" />
                              </a>
                           </div>
                           <div className="h2_blog-content">
                              <div className="h2_blog-content-meta">
                                 <span>
                                    <i className="fa-thin fa-user"></i>Admin
                                 </span>
                                 <span>
                                    <i className="fa-thin fa-clock"></i>June 23, 2023
                                 </span>
                              </div>
                              <h5 className="h2_blog-content-title">
                                 <a href="blog-details.html">Nothing is Impossible to Learn If you are Passionate About this Subject</a>
                              </h5>
                              <a href="#" className="theme-btn blog-btn t-theme-btn">
                                 Read More
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <div className="cta-area">
               <div className="container">
                  <div className="cta-wrapper">
                     <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6">
                           <div className="cta-content mb-30 mb-lg-0">
                              <span className="cta-subtitle">Download App</span>
                              <h2 className="cta-title">Are you Ready to Start your Online Course?</h2>
                           </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                           <div className="cta-button">
                              <a href="#" className="cta-btn">
                                 <i className="fa-brands fa-apple"></i>Apple Store
                              </a>
                              <a href="#" className="cta-btn">
                                 <i className="fa-brands fa-google-play"></i>Play Store
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
         <Footer />
      </React.Suspense>
   );
};

const store = configureStore({
   reducer: { redux },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
   <Provider store={store}>
      <Router>
         <App />
      </Router>
   </Provider>
);
