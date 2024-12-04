import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setFilter } from "~/redux";

let datatable;

const Lists = () => {
   const { filter } = useSelector((e) => e.redux);

   const dt_base_url = "/beasiswa/lulusberkas/getdata";
   const datatable_url = `/${dt_base_url}?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: false,
      show_delete_button: false,
      url: datatable_url,
      columns: [
         { targets: 1, data: "nim" },
         { targets: 2, data: "nama" },
         { targets: 3, data: "jenis_beasiswa" },
         {
            targets: 4,
            data: null,
            render: (data) => {
               return moment(h.parse("uploaded", data)).format("DD MMMM YYYY");
            },
         },
         { targets: 4, data: null, visible: true },
      ],
      columnDefs: true,
      createdRow: (row, data) => {},
      initComplete: () => {
         const container = document.querySelector("div.custom_filter");

         const select = document.createElement("select");
         select.className = "form-select";
         select.innerHTML = '<option value="">Periode</option>';

         const sortedData = [...daftarPeriode].sort((a, b) => {
            return b.nama_periode.localeCompare(a.nama_periode);
         });

         sortedData.forEach((row) => {
            const option = document.createElement("option");
            option.value = row.nama_singkat;
            option.textContent = row.nama_periode;
            option.selected = row.nama_singkat === filter.periode;
            select.appendChild(option);
         });

         select.onchange = (e) => {
            const value = e.target.value;
            h.handleFilterDatatable(base_url_datatable, { ...filter, periode: value });
            dispatch(setFilter({ ...filter, periode: value }));
         };

         container.appendChild(select);
      },
   });

   useLayoutEffect(() => {
      datatable.init();
      return () => {};
   }, []);

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
