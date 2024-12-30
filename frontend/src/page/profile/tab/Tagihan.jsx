import React, { useLayoutEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import wnumb from "wnumb";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Tagihan = () => {
   const { init } = useSelector((e) => e.redux);

   const [state, setState] = useState({
      isLoading: true,
      data: [],
      isLoadingSyncron: false,
   });

   const getData = (nim) => {
      const formData = { nim };

      const fetch = h.post(`/mahasiswa/tagihan/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setState((prev) => ({ ...prev, isLoading: false, data }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoading: false }));
      });
   };

   useLayoutEffect(() => {
      getData(init.preferred_username);
      return () => {};
   }, [init]);

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

   const is_lunas = {
      1: "Lunas",
      0: "Belum Lunas",
   };

   const syncronTagihan = (nim) => {
      const formData = { nim };

      setState((prev) => ({ ...prev, isLoadingSyncron: true }));
      const fetch = h.post(`/mahasiswa/tagihan/syncrontagihan`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         getData(nim);
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingSyncron: false }));
      });
   };

   return state.isLoading ? (
      loader
   ) : (
      <Card>
         <Card.Body>
            <p className="text-danger">
               Jika ada perbedaan{` `}
               <a
                  className="theme-btn"
                  style={{ height: 30 }}
                  onClick={(e) => {
                     e.preventDefault();
                     if (!state.isLoadingSyncron) syncronTagihan(init.preferred_username);
                  }}>
                  {state.isLoadingSyncron ? `Loading...` : `klik disini`}
               </a>{" "}
               untuk melakukan syncron ulang dengan aplikasi sevima!
            </p>
            <Table responsive hover size="sm">
               <thead>
                  <tr>
                     <th>KODE</th>
                     <th>PERIODE</th>
                     <th>AKUN</th>
                     <th>NOMINAL</th>
                     <th>LUNAS</th>
                  </tr>
               </thead>
               <tbody>
                  <Each
                     of={state.data}
                     render={(row) => (
                        <tr>
                           <td>{h.parse("kode_transaksi", row)}</td>
                           <td>{h.periode(h.parse("id_periode", row))}</td>
                           <td>{h.parse("jenis_akun", row)}</td>
                           <td>{wnumb({ thousand: ".", prefix: "Rp " }).to(h.toInt(h.parse("nominal_tagihan", row)))}</td>
                           <td>{is_lunas[h.parse("is_lunas", row)]}</td>
                        </tr>
                     )}
                  />
               </tbody>
            </Table>
         </Card.Body>
      </Card>
   );
};
export default Tagihan;
