import React, { useLayoutEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const SliderJenisBeasiswa = React.lazy(() => import("./SliderJenisBeasiswa"));

const Context = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const [state, setState] = useState({
      isLoading: true,
   });

   const initPage = () => {
      const fetch = h.get(`/dashboard/initpage`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, ...data }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoading: false }));
      });
   };

   useLayoutEffect(() => {
      initPage();
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

   return state.isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <Row className="g-6">
            <SliderJenisBeasiswa />
         </Row>
      </React.Suspense>
   );
};
export default Context;
