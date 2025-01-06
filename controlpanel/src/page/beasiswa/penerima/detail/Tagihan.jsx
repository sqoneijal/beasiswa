import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import wnumb from "wnumb";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Tagihan = () => {
   const { module } = useSelector((e) => e.redux);
   const { tagihan, detailContent } = module;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      isLoadingSyncron: false,
   });

   const is_lunas = {
      1: "Lunas",
      0: "Belum Lunas",
   };

   const handleSyncronTranskrip = (e) => {
      e.preventDefault();

      if (state.isLoadingSyncron) return;

      const formData = { nim: detailContent.nim };

      setState((prev) => ({ ...prev, isLoadingSyncron: true }));
      const fetch = h.post(`/beasiswa/penerima/syncrontagihan`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, tagihan: data }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingSyncron: false }));
      });
   };

   return (
      <React.Fragment>
         <a href="#" onClick={handleSyncronTranskrip}>
            {state.isLoadingSyncron ? "Loading..." : "Klik untuk syncron tagihan dari aplikasi sevima"}
         </a>
         <Table responsive hover size="sm" className="mt-5">
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
                  of={tagihan}
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
      </React.Fragment>
   );
};

export default Tagihan;
