import React from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Forms = React.lazy(() => import("./Forms"));
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
         <Card className="shadow-sm">
            {pageType === "add" || pageType === "update" ? (
               <Card.Body>
                  <Forms {...props} />
               </Card.Body>
            ) : (
               <Lists {...props} />
            )}
         </Card>
      </React.Suspense>
   );
};
export default Context;
