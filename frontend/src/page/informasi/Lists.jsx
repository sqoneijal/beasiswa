import lozad from "lozad";
import moment from "moment";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";
moment.locale("id");

const Lists = ({ daftarInformasi, totalData, currentPage, getData }) => {
   const paginationRender = useRef(null);

   // bool
   const [bottomOfPage, setBottomOfPage] = useState(false);

   useLayoutEffect(() => {
      if (bottomOfPage && totalData > daftarInformasi.length) {
         getData(currentPage * 9, true);
         setBottomOfPage(false);
      }
      return () => setBottomOfPage(false);
   }, [bottomOfPage]);

   useLayoutEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            if (entries[0].isIntersecting) {
               setBottomOfPage(true);
            }
         },
         {
            thresholds: 1,
         }
      );

      if (paginationRender.current) {
         observer.observe(paginationRender.current);
      }

      return () => {
         if (paginationRender.current) {
            observer.unobserve(paginationRender.current);
         }
      };
   }, [paginationRender]);

   const renderThumbnail = (src) => {
      return src ? `https://lh3.googleusercontent.com/d/${src}=w410?authuser=1/view` : "/assets/empty-image.webp";
   };

   useLayoutEffect(() => {
      h.arrLength(daftarInformasi) && lozad().observe();
      return () => {};
   }, [daftarInformasi]);

   return (
      <section className="innerPage_blog-area pt-120 pb-90">
         <Container>
            <Row>
               <Each
                  of={daftarInformasi}
                  render={(row) => (
                     <Col xl={4} lg={6} md={6}>
                        <div className="h2_blog-item mb-30">
                           <div className="h2_blog-img">
                              <Link to={`/informasi/read/${h.parse("slug", row)}`}>
                                 <img
                                    data-src={renderThumbnail(h.parse("thumbnail", row))}
                                    className="lozad"
                                    alt={h.parse("judul", row)}
                                    style={{ width: 410, height: 240 }}
                                 />
                              </Link>
                           </div>
                           <div className="h2_blog-content">
                              <div className="h2_blog-content-meta">
                                 <span>
                                    <i className="fa-thin fa-clock" />
                                    {moment(h.parse("uploaded", row)).format("DD MMMM YYYY")}
                                 </span>
                              </div>
                              <h5 className="h2_blog-content-title">
                                 <Link to={`/informasi/read/${h.parse("slug", row)}`}>
                                    {h.parse("judul", row)} - {row.id}
                                 </Link>
                              </h5>
                              <Link to={`/informasi/read/${h.parse("slug", row)}`} className="theme-btn blog-btn t-theme-btn">
                                 Selengkapnya
                              </Link>
                           </div>
                        </div>
                     </Col>
                  )}
               />
            </Row>
            <div ref={paginationRender} />
         </Container>
      </section>
   );
};
export default Lists;
