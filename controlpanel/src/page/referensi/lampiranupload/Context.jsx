import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Lists = React.lazy(() => import("./Lists"));
const Forms = React.lazy(() => import("./Forms"));

const Context = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const { pageType } = module;

   const props = { setPageTypeButton };

   return (
      <Row>
         <Col>
            <Card className="shadow-sm">
               <Card.Body>{pageType === "add" || pageType === "update" ? <Forms {...props} /> : <Lists {...props} />}</Card.Body>
            </Card>
         </Col>
      </Row>
   );
};
export default Context;
