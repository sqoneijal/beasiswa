import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";

const Lists = React.lazy(() => import("./Lists"));

const Context = () => {
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

   return (
      <React.Suspense fallback={loader}>
         <Row>
            <Col>
               <Card className="shadow-sm">
                  <Card.Body>
                     <Lists />
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </React.Suspense>
   );
};
export default Context;
