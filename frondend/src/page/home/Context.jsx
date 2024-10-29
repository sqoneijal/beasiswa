import React from "react";
import { Bars } from "react-loader-spinner";

const OpeningPage = React.lazy(() => import("./OpeningPage"));
const Counter = React.lazy(() => import("./Counter"));
const ExploreBeasiswa = React.lazy(() => import("./ExploreBeasiswa"));

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
         <OpeningPage />
         <Counter />
         <ExploreBeasiswa />
      </React.Suspense>
   );
};
export default Context;
