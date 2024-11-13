import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));
const DetailModal = React.lazy(() => import("./DetailModal"));

const Context = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const { pageType } = module;

   const props = { setPageTypeButton };

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
         <DetailModal />
         <Row>
            <Col>
               <Card className="shadow-sm">
                  {pageType === "add" || pageType === "update" ? (
                     <Card.Body>
                        <Forms {...props} />
                     </Card.Body>
                  ) : (
                     <Lists {...props} />
                  )}
               </Card>
            </Col>
         </Row>
      </React.Suspense>
   );
};
export default Context;
