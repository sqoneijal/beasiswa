import React, { useLayoutEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Lists = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [content, setContent] = useState([]);

   const getData = (start = 0, length = 10, page = 0, column_order = 0, dir = "asc") => {
      const formData = { start, length, page, column: column_order, dir };

      setIsLoading(true);
      const fetch = h.post(`/referensi/lampiranupload/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setContent(data.data);
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
         return `${text.substring(0, maxLength)}...`;
      }
      return text;
   };

   useLayoutEffect(() => {
      setPageTypeButton(
         h.buttons("Tambah Data", false, {
            onClick: () => dispatch(setModule({ ...module, pageType: "add" })),
         })
      );
      getData();
      return () => {};
   }, []);

   return (
      <div className="table-responsive text-nowrap">
         <table className="table">
            <thead>
               <tr>
                  <th>nama lampiran</th>
                  <th>keterangan</th>
                  <th className="text-end">aksi</th>
               </tr>
            </thead>
            <tbody className="table-border-bottom-0">
               {isLoading ? (
                  h.table_loading(2)
               ) : (
                  <Each
                     of={content}
                     render={(row) => (
                        <tr>
                           <td>{h.parse("nama", row)}</td>
                           <td>{truncateText(h.parse("keterangan", row), 100)}</td>
                           <td className="text-end">
                              <Dropdown>
                                 <Dropdown.Toggle className="btn p-0 dropdown-toggle hide-arrow" variant="default">
                                    <i className="ti ti-dots-vertical" />
                                 </Dropdown.Toggle>
                                 <Dropdown.Menu renderOnMount={true}>
                                    <a
                                       className="dropdown-item waves-effect"
                                       href="#"
                                       onClick={(e) => {
                                          e.preventDefault();
                                          dispatch(setModule({ ...module, pageType: "update", detailContent: row }));
                                       }}>
                                       <i className="ti ti-pencil me-1" /> Edit
                                    </a>
                                    <a
                                       className="dropdown-item waves-effect"
                                       href="#"
                                       onClick={(e) => {
                                          e.preventDefault();
                                          h.confirmDelete({
                                             id: h.parse("id", row),
                                             url: "/referensi/lampiranupload/hapus",
                                          }).then((res) => {
                                             const { data } = res;
                                             h.notification(true, data.msg_response);

                                             if (data.status) getData();
                                          });
                                       }}>
                                       <i className="ti ti-trash me-1" /> Hapus
                                    </a>
                                 </Dropdown.Menu>
                              </Dropdown>
                           </td>
                        </tr>
                     )}
                  />
               )}
            </tbody>
         </table>
      </div>
   );
};
export default Lists;
