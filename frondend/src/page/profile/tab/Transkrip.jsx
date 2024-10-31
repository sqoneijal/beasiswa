import React, { useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Transkrip = () => {
   const { init } = useSelector((e) => e.redux);

   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [content, setContent] = useState([]);

   // string
   const [total_sks, setTotal_sks] = useState(0);
   const [total_bobot, setTotal_bobot] = useState(0);

   useLayoutEffect(() => {
      if (!isLoading) {
         let sks = 0;
         let bobot = 0;

         content.forEach((row) => {
            sks += h.toInt(row.sks_mata_kuliah);
            bobot += h.toInt(row.nilai_angka) * h.toInt(row.sks_mata_kuliah);
         });

         setTotal_sks(sks);
         setTotal_bobot(bobot);
      }

      return () => {};
   }, [isLoading, content]);

   const getData = (nim) => {
      const formData = { nim };

      setIsLoading(true);
      const fetch = h.post(`/mahasiswa/transkrip/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setContent(data);
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

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

   useLayoutEffect(() => {
      getData(init.preferred_username);
      return () => {};
   }, [init]);

   return isLoading ? (
      loader
   ) : (
      <Table size="sm" responsive>
         <thead>
            <tr>
               <th className="text-center">NO</th>
               <th className="text-center">KODE</th>
               <th>NAMA MATAKULIAH</th>
               <th className="text-center">SKS</th>
               <th className="text-center">NILAI HURUF</th>
               <th className="text-center">TOTAL BOBOT</th>
            </tr>
         </thead>
         <tbody>
            <Each
               of={content}
               render={(row, index) => (
                  <tr>
                     <td className="text-center">{index + 1}</td>
                     <td className="text-center">{h.parse("kode_mata_kuliah", row)}</td>
                     <td>{h.parse("nama_mata_kuliah", row)}</td>
                     <td className="text-center">{h.parse("sks_mata_kuliah", row)}</td>
                     <td className="text-center">{h.parse("nilai_huruf", row)}</td>
                     <td className="text-center">{h.toInt(h.parse("sks_mata_kuliah", row)) * h.toInt(h.parse("nilai_angka", row))}</td>
                  </tr>
               )}
            />
         </tbody>
         <tfoot>
            <tr>
               <th colSpan={5}>Total Satuan Kredit Semester (SKS)</th>
               <th className="text-center">{total_sks}</th>
            </tr>
            <tr>
               <th colSpan={5}>Total Bobot</th>
               <th className="text-center">{total_bobot}</th>
            </tr>
            <tr>
               <th colSpan={5}>Indeks Prestasi Kumulatif</th>
               <th className="text-center">{total_bobot > 0 ? (total_bobot / total_sks).toFixed(2) : 0}</th>
            </tr>
         </tfoot>
      </Table>
   );
};
export default Transkrip;
