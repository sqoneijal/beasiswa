import React, { useLayoutEffect } from "react";
import { Col } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Switch, { Case } from "react-switch-case";
import { setModule } from "~/redux";

const Biodata = React.lazy(() => import("./biodata/Context"));
const Khs = React.lazy(() => import("./Khs"));
const Transkrip = React.lazy(() => import("./Transkrip"));

const Context = () => {
   const { module } = useSelector((e) => e.redux);
   const { tabActive } = module;
   const dispath = useDispatch();

   useLayoutEffect(() => {
      dispath(setModule({ ...module, tabActive: "biodata" }));
      return () => {};
   }, []);

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
         <Col xl={8} lg={8}>
            <div className="course_details-wrap mb-55">
               <Switch condition={tabActive}>
                  <Case value="biodata">
                     <Biodata />
                  </Case>
                  <Case value="khs">
                     <Khs />
                  </Case>
                  <Case value="transkrip">
                     <Transkrip />
                  </Case>
                  <Case value="ekonomi">
                     <span>ekonomi</span>
                  </Case>
                  <Case value="prestasi">
                     <span>prestasi</span>
                  </Case>
               </Switch>
            </div>
         </Col>
      </React.Suspense>
   );
};
export default Context;
