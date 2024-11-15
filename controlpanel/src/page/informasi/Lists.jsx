import moment from "moment";
import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";
moment.locale("id");

let datatable;

const Lists = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const datatable_url = `/informasi/getdata`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columns: [
         { data: "judul" },
         { data: "jenis_beasiswa" },
         {
            data: null,
            render: (data) => {
               return moment(h.parse("uploaded", data)).format("DD MMMM YYYY");
            },
         },
         { data: null },
      ],
      columnDefs: true,
      createdRow: (row, data) => {
         const _view = row.querySelector("#view");
         if (_view) {
            _view.onclick = (e) => {
               e.preventDefault();
               window.open(`/informasi/read/${h.parse("slug", data)}`, "_blank");
            };
         }

         const _edit = row.querySelector("#edit");
         if (_edit) {
            _edit.onclick = (e) => {
               e.preventDefault();
               dispatch(setModule({ ...module, pageType: "update", detailContent: data }));
            };
         }

         const _delete = row.querySelector("#delete");
         if (_delete) {
            _delete.onclick = (e) => {
               e.preventDefault();
               h.confirmDelete({
                  url: "/informasi/hapus",
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
         h.buttons(`Tambah Informasi`, false, {
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
                  <th>judul</th>
                  <th>kategori</th>
                  <th>upload</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
