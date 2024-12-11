import decode from "decode-html";
import dompurify from "dompurify";
import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const InformasiBeasiswa = () => {
   const { module } = useSelector((e) => e.redux);
   const { daftarMasterBeasiswa, informasiTerbaru } = module;

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
                  <div className="tab-pane fade show active">
                     <Row>
                        <Each
                           of={informasiTerbaru}
                           render={(row) => (
                              <Col xl={4} lg={6} md={6}>
                                 <div className="h2_course-item mb-30">
                                    <div className="h2_course-item-img">
                                       <a href="course-details.html">
                                          <img src="https://themephi.net/template/eduan/eduan/assets/img/course/2/1.jpg" alt="" />
                                       </a>
                                    </div>
                                    <div className="h2_course-content">
                                       <h5 className="h2_course-content-title">
                                          <Link to={`/informasi/read/${h.parse("slug", row)}`} title={h.parse("judul", row)}>
                                             {h.parse("judul", row)}
                                          </Link>
                                       </h5>
                                       <p
                                          className="h2_course-content-text"
                                          dangerouslySetInnerHTML={{ __html: dompurify.sanitize(decode(h.parse("content", row))) }}
                                       />
                                    </div>
                                    <div className="h2_course-content-bottom">
                                       <div className="h2_course-bottom-btn">
                                          <Link to={`/informasi/read/${h.parse("slug", row)}`}>
                                             Selengkapnya
                                             <i className="fa-light fa-arrow-right" />
                                             {` `}
                                             <i className="fa-light fa-arrow-right" />
                                          </Link>
                                       </div>
                                    </div>
                                 </div>
                              </Col>
                           )}
                        />
                     </Row>
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
};
export default InformasiBeasiswa;
