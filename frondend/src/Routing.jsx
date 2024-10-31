import React from "react";
import { Bars } from "react-loader-spinner";
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./page/home/Context"));
const Profile = React.lazy(() => import("./page/profile/Context"));

const Routing = () => {
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
      <Routes>
         <Route path="/" loader={loader} element={<Home />} />
         <Route path="profile" loader={loader} element={<Profile />} />
      </Routes>
   );
};
export default Routing;
