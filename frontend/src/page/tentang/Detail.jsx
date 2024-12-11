import decode from "decode-html";
import dompurify from "dompurify";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Detail = () => {
   const { module } = useSelector((e) => e.redux);
   const { detailContent } = module;

   return (
      <section className="blog_details-area pt-120 pb-80">
         <Container>
            <Row>
               <Col xl={12} lg={12}>
                  <div className="blog_details-wrap mb-60">
                     <div className="blog_details-content">
                        <div
                           className="blog_details-inner-text mr-80"
                           dangerouslySetInnerHTML={{ __html: dompurify.sanitize(decode(detailContent.content)) }}
                        />
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   );
};
export default Detail;
