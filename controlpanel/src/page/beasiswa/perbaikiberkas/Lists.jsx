import React from "react";
import { Table } from "react-bootstrap";

const Lists = () => {
   return (
      <div className="card-datatable table-responsive">
         <Table className="datatables-permissions border-top" id="datatable">
            <thead>
               <tr>
                  <th>nim</th>
                  <th>nama</th>
                  <th>jenis beasiswa</th>
                  <th>tanggal daftar</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
