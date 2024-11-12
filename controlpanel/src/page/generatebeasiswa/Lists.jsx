import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = ({ setPageTypeButton }) => {
   const { module, filter } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const datatable_url = `/generatebeasiswa/getdata?${h.serialize(filter)}`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columnDefs: true,
      columns: [{ data: "kategori_beasiswa" }, { data: null }],
      createdRow: (row, data) => {
         const _edit = row.querySelector("#edit");
         if (_edit) {
            _edit.onclick = (e) => {
               e.preventDefault();
               setDetailContent(data);
               setPageType("update");
               setOpenForms(true);
            };
         }

         const _delete = row.querySelector("#delete");
         if (_delete) {
            _delete.onclick = (e) => {
               e.preventDefault();
               h.confirmDelete({
                  url: "/hapus",
                  id: data.id,
               }).then((res) => {
                  if (typeof res === "undefined") return;
                  const { data } = res;
                  h.notification(data.status, data.msg_response);
                  data.status && datatable.reload();
               });
            };
         }
      },
   });

   useLayoutEffect(() => {
      datatable.init();
      setPageTypeButton(
         h.buttons("Tambah Data", false, {
            onClick: () => dispatch(setModule({ ...module, pageType: "add" })),
         })
      );
      return () => {};
   }, []);

   return (
      <div className="card-datatable table-responsive">
         <Table className="datatables-permissions border-top" id="datatable">
            <thead>
               <tr>
                  <th>kategori</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
