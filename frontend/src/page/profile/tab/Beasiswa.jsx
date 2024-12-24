import React, { useLayoutEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const InformasiPendaftaranBeasiswa = React.lazy(() => import("./InformasiPendaftaranBeasiswa"));

const Beasiswa = () => {
   const { init, module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getStatusPendaftaran = (nim, periode) => {
      const formData = { nim, periode };

      const fetch = h.post(`/mahasiswa/biodata/getstatuspendaftaran`, formData);
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
         setIsLoading(false);
      });
   };

   const getPeriodeAktif = () => {
      const fetch = h.get(`/periode/periodeaktif`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         getStatusPendaftaran(init.preferred_username, data.id);
      });
   };

   useLayoutEffect(() => {
      getPeriodeAktif();
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

   return isLoading ? (
      loader
   ) : (
      <React.Suspense fallback={loader}>
         <Card className="shadow-sm">
            {h.arrLength(module.pendaftar) ? (
               <InformasiPendaftaranBeasiswa />
            ) : (
               <Card.Body>
                  <p>Anda belum mendaftar beasiswa.</p>
                  <p>
                     Klik{" "}
                     <Link to={"/beasiswa"} className="text-info">
                        disini
                     </Link>{" "}
                     untuk melihat daftar beasiswa yang dibuka.
                  </p>
               </Card.Body>
            )}
         </Card>
      </React.Suspense>
   );
};
export default Beasiswa;
