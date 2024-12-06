import React, { useLayoutEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setFilter, setModule } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Detail = React.lazy(() => import("./detail/Context"));

const Context = ({ setPageTypeButton }) => {
   const { module, filter } = useSelector((e) => e.redux);
   const { openDetail } = module;
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getPeriodeAktif = (data) => {
      const aktifPeriode = data.find((item) => item.is_aktif === "1");
      return aktifPeriode ? aktifPeriode.nama_singkat : null;
   };

   const initPage = () => {
      const fetch = h.get(`/beasiswa/lulusberkas/initpage`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, ...data }));
         dispatch(setFilter({ periode: getPeriodeAktif(data.daftarPeriode) }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      setPageTypeButton("");
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

   const props = { setPageTypeButton };

   return isLoading
      ? loader
      : h.objLength(filter) && (
           <React.Suspense fallback={loader}>
              <Card className="shadow-sm">{openDetail ? <Detail {...props} /> : <Lists {...props} />}</Card>
           </React.Suspense>
        );
};
export default Context;
