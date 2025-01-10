import React, { useLayoutEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setFilter, setModule } from "~/redux";

const Lists = React.lazy(() => import("./Lists"));
const Detail = React.lazy(() => import("./detail/Context"));
const ImportExcel = React.lazy(() => import("./importexcel/Context"));
const ModalConfirmDownload = React.lazy(() => import("./ModalConfirmDownload"));

const Context = ({ setPageTypeButton }) => {
   const { module, filter } = useSelector((e) => e.redux);
   const { openDetail, openFormImport } = module;
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getPeriodeAktif = (data) => {
      const aktifPeriode = data.find((item) => item.is_aktif === "1");
      return aktifPeriode ? aktifPeriode.nama_singkat : null;
   };

   const initPage = () => {
      const fetch = h.get(`/beasiswa/tahapwawancara/initpage`);
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

   const handleRenderContext = () => {
      if (openFormImport) {
         return <ImportExcel {...props} />;
      }

      return openDetail ? <Detail {...props} /> : <Lists {...props} />;
   };

   return isLoading
      ? loader
      : h.objLength(filter) && (
           <React.Suspense fallback={loader}>
              <ModalConfirmDownload />
              <Card className="shadow-sm">{handleRenderContext()}</Card>
           </React.Suspense>
        );
};
export default Context;
