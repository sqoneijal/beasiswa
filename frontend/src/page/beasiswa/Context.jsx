import React, { useLayoutEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Breadcrumb = React.lazy(() => import("./Breadcrumb"));

const Context = () => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [listContent, setListContent] = useState([]);

   const getData = () => {
      const formData = {
         start: 0,
         length: 100,
      };

      setIsLoading(true);
      const fetch = h.post(`/referensi/kategoribeasiswa/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setListContent(data.data);
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      getData();
      return () => {};
   }, []);

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
         wrapperClass="page-loader flex-column justify-content-center"
      />
   );

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <Breadcrumb />
         <section className="innerPage_course-area pt-120 pb-90">
            <Container>
               <Row>
                  <Each
                     of={listContent}
                     render={(row) => (
                        <Col xxl={3} lg={4} md={6}>
                           <div className="course-item mb-30">
                              <div className="course-content">
                                 <h5 className="course-content-title text-center mt-10">
                                    <Link to={`/beasiswa/read/${h.parse("nama", row).replaceAll(" ", "-").toLowerCase()}`}>
                                       {h.parse("nama", row)}
                                    </Link>
                                 </h5>
                              </div>
                              <div className="course-hover-content">
                                 <h5 className="course-hover-content-title">
                                    <Link to={`/beasiswa/read/${h.parse("nama", row).replaceAll(" ", "-").toLowerCase()}`}>
                                       {h.parse("nama", row)}
                                    </Link>
                                 </h5>
                                 <p className="course-hover-content-text">{h.parse("keterangan", row)}</p>
                                 <div className="course-hover-content-btn">
                                    <div className="course-hover-cart-btn">
                                       <Link
                                          to={`/beasiswa/read/${h.parse("nama", row).replaceAll(" ", "-").toLowerCase()}`}
                                          className="theme-btn course-btn">
                                          Selengkapnya
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </Col>
                     )}
                  />
               </Row>
            </Container>
         </section>
      </React.Suspense>
   );
};
export default Context;
