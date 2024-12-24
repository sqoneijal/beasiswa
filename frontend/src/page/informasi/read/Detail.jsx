import decode from "decode-html";
import DOMPurify from "dompurify";
import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Breadcrumb = React.lazy(() => import("./Breadcrumb"));
const BeritaThumbnail = React.lazy(() => import("./BeritaThumbnail"));

const Detail = () => {
   const { module } = useSelector((e) => e.redux);
   const { detailBerita } = module;
   const { slug } = useParams();
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getData = (slug) => {
      const formData = { slug };

      setIsLoading(true);
      const fetch = h.post(`/informasi/read`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, detailBerita: data }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      if (slug) getData(slug);
      return () => {};
   }, [slug]);

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
         <section className="blog_details-area pt-120 pb-80">
            <Container>
               <BeritaThumbnail />
               <Row>
                  <Col xl={8} lg={8}>
                     <div className="blog_details-wrap mb-60">
                        <div className="blog_details-top mb-50">
                           <h3 className="blog_details-title">{h.parse("judul", detailBerita)}</h3>
                           <div className="blog_details-meta">
                              <div className="blog_details-author">
                                 <div className="blog_details-author-info">
                                    <span>Posted at</span>
                                    <h5>
                                       <Link to={`/beasiswa/kategori/${h.parse("jenis_beasiswa", detailBerita).replaceAll(" ", "-").toLowerCase()}`}>
                                          {h.parse("jenis_beasiswa", detailBerita)}
                                       </Link>
                                    </h5>
                                 </div>
                              </div>
                              <div className="blog_details-rating">
                                 <span>Uploaded</span> {moment(h.parse("uploaded", detailBerita)).format("DD MMMM YYYY")}
                              </div>
                           </div>
                        </div>
                        <div className="blog_details-content">
                           <div
                              className="blog_details-inner-text mr-80"
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decode(h.parse("content", detailBerita))) }}
                           />
                        </div>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      </React.Suspense>
   );
};
export default Detail;
