import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import wnumb from "wnumb";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Tagihan = () => {
   const { module } = useSelector((e) => e.redux);
   const { tagihan } = module;

   const is_lunas = {
      1: "Lunas",
      0: "Belum Lunas",
   };

   return (
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
   );
};

export default Tagihan;
