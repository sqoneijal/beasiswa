import React, { useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ModalConfirmDownload = React.lazy(() => import("./ModalConfirmDownload"));

let datatable;

const Lists = ({ setPageTypeButton }) => {
   const { filter, module } = useSelector((e) => e.redux);
   const { daftarPeriode } = module;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      grepStatusDownload: false,
   });

   useLayoutEffect(() => {
      return () => {};
   }, [state]);

   const base_url_datatable = "beasiswa/penerima/getdata";
   const datatable_url = `/${base_url_datatable}?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: false,
      show_delete_button: false,
      url: datatable_url,
      columns: [
         { targets: 1, data: "nim" },
         { targets: 2, data: "nama" },
         { targets: 3, data: "jenis_beasiswa" },
         { targets: 5, data: "ipk", orderable: false },
         { targets: 6, data: null, visible: true },
      ],
      columnDefs: true,
      createdRow: (row, data) => {
         const _view = row.querySelector("#view");
         if (_view) {
            _view.onclick = (e) => {
               e.preventDefault();
               dispatch(setModule({ ...module, openDetail: true, detailContent: data }));
            };
         }
      },
      initComplete: () => {
         const container = document.querySelector("div.custom_filter");
         const dt_action = document.querySelector("div.dt-action-buttons");

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

         const divGroup = document.createElement("div");
         divGroup.className = "btn-group";

         const btnDownloadExcel = document.createElement("button");
         btnDownloadExcel.type = "submit";
         btnDownloadExcel.id = "terima";
         btnDownloadExcel.name = "terima";
         btnDownloadExcel.className = "fw-bold border-0 waves-effect waves-light btn btn-primary";
         btnDownloadExcel.innerHTML = `<span class="indicator-label">Download Excel</span>`;

         btnDownloadExcel.onclick = (e) => {
            e.preventDefault();
            dispatch(setModule({ ...module, openModalDownload: true }));
         };

         const btnImportExcel = document.createElement("button");
         btnImportExcel.type = "submit";
         btnImportExcel.id = "import_excel";
         btnImportExcel.name = "import_excel";
         btnImportExcel.className = "fw-bold border-0 waves-effect waves-light btn btn-success";
         btnImportExcel.innerHTML = `<span class="indicator-label">Import Excel</span>`;

         btnImportExcel.onclick = (e) => {
            e.preventDefault();
            dispatch(setModule({ ...module, openFormImport: true }));
         };

         divGroup.appendChild(btnDownloadExcel);
         divGroup.appendChild(btnImportExcel);

         container.appendChild(select);
         dt_action.appendChild(divGroup);
      },
   });

   useLayoutEffect(() => {
      setPageTypeButton("");
      datatable.init();
      return () => {};
   }, []);

   return (
      <div className="card-datatable table-responsive">
         <ModalConfirmDownload />
         <Table className="datatables-permissions border-top" id="datatable">
            <thead>
               <tr>
                  <th>nim</th>
                  <th>nama</th>
                  <th>jenis beasiswa</th>
                  <th>ipk</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
