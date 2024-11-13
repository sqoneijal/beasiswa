import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
         return `${text.substring(0, maxLength)}...`;
      }
      return text;
   };

   const datatable_url = `/referensi/kategoribeasiswa/getdata`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columns: [
         { data: "nama" },
         {
            data: null,
            orderable: false,
            render: (data) => {
               return truncateText(h.parse("keterangan", data), 100);
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
               dispatch(setModule({ ...module, openDetail: true, detailContent: data }));
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
                  id: h.parse("id", data),
                  url: "/referensi/kategoribeasiswa/hapus",
               }).then((res) => {
                  const { data } = res;
                  h.notification(true, data.msg_response);

                  if (data.status) datatable.reload();
               });
            };
         }
      },
   });

   useLayoutEffect(() => {
      setPageTypeButton(
         h.buttons("Tambah Data", false, {
            onClick: () => dispatch(setModule({ pageType: "add" })),
         })
      );
      datatable.init();
      return () => {};
   }, []);

   return (
      <div className="card-datatable table-responsive">
         <Table className="datatables-permissions border-top" id="datatable">
            <thead>
               <tr>
                  <th>nama kategori</th>
                  <th>keterangan</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
