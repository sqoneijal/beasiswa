import axios from "axios";
import React, { useLayoutEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

let datatable;

const Lists = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   const renderRole = {
      1: "Admin",
      2: "Operator",
   };

   const getUserInfo = (username) => {
      axios.get(`https://keycloak.ar-raniry.ac.id/admin/realms/uinar/users`).then((res) => {
         console.log(res);
      });
   };

   const datatable_url = `/pengguna/getdata`;
   datatable = h.initDatatable({
      show_edit_button: true,
      show_delete_button: true,
      url: datatable_url,
      columns: [
         { data: "username" },
         {
            data: null,
            orderable: false,
            render: (data) => {
               return getUserInfo(data.username);
            },
         },
         { data: "username", orderable: false },
         {
            data: null,
            orderable: false,
            render: (data) => {
               return renderRole[h.parse("role", data)];
            },
         },
         { data: null },
      ],
      columnDefs: true,
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
         h.buttons("Tambah Pengguna", false, {
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
                  <th>NIP</th>
                  <th>USERNAME</th>
                  <th>NAMA</th>
                  <th>ROLE</th>
                  <th />
               </tr>
            </thead>
         </Table>
      </div>
   );
};
export default Lists;
