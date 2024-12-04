import DOMPurify from "dompurify";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CatatanPerbaikan = () => {
   const { module } = useSelector((e) => e.redux);
   const { detailContent } = module;

   return (
      <Row>
         <Col dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detailContent.catatan_perbaikan) }} />
      </Row>
   );
};
export default CatatanPerbaikan;
