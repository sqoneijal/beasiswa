import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Lists = React.lazy(() => import("./Lists"));

const Context = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const { pageType } = module;

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

   const props = { setPageTypeButton };

   return (
      <React.Suspense fallback={loader}>
         <Row>
            <Col>
               <Card className="shadow-sm">
                  <Card.Body>{pageType === "add" || pageType === "update" ? <Forms {...props} /> : <Lists {...props} />}</Card.Body>
               </Card>
            </Col>
         </Row>
      </React.Suspense>
   );
};
export default Context;
