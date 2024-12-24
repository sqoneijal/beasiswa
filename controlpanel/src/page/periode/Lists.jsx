import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Each } from "~/Each";
import * as h from "~/Helpers";
moment.locale("id");

const Lists = ({ state, setState }) => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   const getData = () => {
      const formData = {};

      setIsLoading(true);
      const fetch = h.post(`/periode/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setState((prevState) => ({ ...prevState, refreshList: false, content: data }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      getData();
      return () => {};
   }, []);

   const renderIsAktif = (id) => {
      return id == 1 ? <span className="badge rounded bg-label-success">Iya</span> : <span className="badge rounded bg-label-danger">Tidak</span>;
   };

   return (
      <Table responsive className="no-wrap">
         <thead>
            <tr>
               <th>tahun ajar</th>
               <th>nama periode</th>
               <th>tanggal awal</th>
               <th>tanggal akhir</th>
               <th className="text-center">aktif</th>
            </tr>
         </thead>
         <tbody className="table-border-bottom-0">
            {isLoading ? (
               h.table_loading(5)
            ) : (
               <Each
                  of={state.content}
                  render={(row) => (
                     <tr>
                        <td>{h.parse("tahun_ajar", row)}</td>
                        <td>{h.parse("nama_periode", row)}</td>
                        <td>{h.parse("tanggal_awal", row) && moment(h.parse("tanggal_awal", row)).format("DD MMMM YYYY")}</td>
                        <td>{h.parse("tanggal_akhir", row) && moment(h.parse("tanggal_akhir", row)).format("DD MMMM YYYY")}</td>
                        <td className="text-center">{renderIsAktif(h.parse("is_aktif", row))}</td>
                     </tr>
                  )}
               />
            )}
         </tbody>
      </Table>
   );
};
export default Lists;
