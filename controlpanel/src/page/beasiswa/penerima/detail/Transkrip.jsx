import React, { useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Transkrip = () => {
   const { module } = useSelector((e) => e.redux);
   const { transkrip, detailContent } = module;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      ipk: 0,
      isLoadingSyncron: false,
   });

   useLayoutEffect(() => {
      let total_sks = 0;
      let total_bobot = 0;

      transkrip.map((row) => {
         total_sks += parseFloat(row.sks_mata_kuliah);
         total_bobot += parseFloat(row.bobot_mata_kuliah);
      });

      setState({
         ipk: (total_bobot / total_sks).toFixed(2),
      });
      return () => {};
   }, [transkrip]);

   const handleSyncronTranskrip = (e) => {
      e.preventDefault();
      if (state.isLoadingSyncron) {
         return;
      }

      const formData = { nim: detailContent.nim };

      setState((prev) => ({ ...prev, isLoadingSyncron: true }));
      const fetch = h.post(`/beasiswa/penerima/syncrontranskrip`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, transkrip: data }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingSyncron: false }));
      });
   };

   return (
      <React.Fragment>
         <a href="#" onClick={handleSyncronTranskrip}>
            {state.isLoadingSyncron ? "Loading..." : "Klik untuk syncron transkrip dari aplikasi sevima"}
         </a>
         <Table responsive hover size="sm" className="mt-5">
            <thead>
               <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                  <th className="text-center">NO</th>
                  <th>KODE</th>
                  <th>MATAKULIAH</th>
                  <th className="text-center">SKS</th>
                  <th className="text-center">HURUF</th>
                  <th className="text-center">INDEKS</th>
               </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
               <Each
                  of={transkrip}
                  render={(item, i) => (
                     <tr>
                        <td className="text-center">{i + 1}</td>
                        <td>{item.kode_mata_kuliah}</td>
                        <td>{item.nama_mata_kuliah}</td>
                        <td className="text-center">{item.sks_mata_kuliah}</td>
                        <td className="text-center">{item.nilai_huruf}</td>
                        <td className="text-center">{item.nilai_angka}</td>
                     </tr>
                  )}
               />
            </tbody>
            <tfoot>
               <tr>
                  <th className="text-end" colSpan={5}>
                     IPK
                  </th>
                  <th className="text-center">{state.ipk}</th>
               </tr>
            </tfoot>
         </Table>
      </React.Fragment>
   );
};
export default Transkrip;
