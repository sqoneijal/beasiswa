import React, { useLayoutEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ModalPerbaiki = () => {
   const { module, init } = useSelector((e) => e.redux);
   const { openModalPerbaiki, detailContent } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   useLayoutEffect(() => {
      if (openModalPerbaiki && h.objLength(detailContent)) setInput({ catatan_perbaikan: h.parse("catatan_perbaikan", detailContent) });
      return () => {};
   }, [openModalPerbaiki, detailContent]);

   const clearProps = () => {
      setInput({});
      setErrors({});
      dispatch(setModule({ ...module, openModalPerbaiki: false }));
   };

   const submit = () => {
      const formData = { user_modified: init.preferred_username, id_pendaftar: h.parse("id", detailContent) };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/beasiswa/penerima/submitperbaiki`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setErrors(data.errors);
         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         setInput({});
         setErrors({});
         dispatch(
            setModule({
               ...module,
               openModalPerbaiki: false,
               detailContent: {},
               openDetail: false,
            })
         );
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <Modal show={openModalPerbaiki} onHide={clearProps} backdrop="static">
         <Modal.Header closeButton>
            <Modal.Title>Konfirmasi</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {h.form_textarea(
               "Catatan",
               "catatan_perbaikan",
               12,
               {
                  rows: 10,
                  onChange: (e) => setInput({ ...input, catatan_perbaikan: e.target.value }),
                  value: h.parse("catatan_perbaikan", input),
               },
               errors
            )}
         </Modal.Body>
         <Modal.Footer>
            {h.buttons("Simpan", isSubmit, {
               disabled: isSubmit,
               type: "submit",
               onClick: () => (isSubmit ? null : submit()),
            })}
         </Modal.Footer>
      </Modal>
   );
};
export default ModalPerbaiki;
