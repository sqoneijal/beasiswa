import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = ({ setPageTypeButton }) => {
   const { filter, module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const datatable_url = `/beasiswa/dibatalkan/getdata?${h.serialize(filter)}`;
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
   });

   useLayoutEffect(() => {
      datatable.init();
      setPageTypeButton("");
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
                  <th>ipk</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
