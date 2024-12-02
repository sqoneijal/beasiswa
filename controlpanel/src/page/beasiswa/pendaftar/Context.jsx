import React from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Lists = React.lazy(() => import("./Lists"));
const Detail = React.lazy(() => import("./detail/Context"));

const Context = () => {
   const { module } = useSelector((e) => e.redux);
   const { openDetail } = module;

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
         <Card className="shadow-sm">{openDetail ? <Detail /> : <Lists />}</Card>
      </React.Suspense>
   );
};
export default Context;
